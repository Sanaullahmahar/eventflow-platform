import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const DEFAULT_EVENT_TYPES = [
  { label: 'Wedding', value: 'Wedding' },
  { label: 'Birthday', value: 'Birthday' },
  { label: 'Vendor at Event', value: 'Vendor' },
  { label: 'Corporate Event', value: 'Corporate' },
  { label: 'Concert / Festival', value: 'Concert' },
  { label: 'Other Event', value: 'Other' }
];

const DEFAULT_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois',
  'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
  'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming'
].map((state) => ({ label: state, value: state }));

const UPSTREAM_BASE_URL = 'https://onedayevent.com';
const UPSTREAM_HEADERS = {
  Accept: 'application/json, text/html, */*',
  'X-Requested-With': 'XMLHttpRequest',
  Referer: `${UPSTREAM_BASE_URL}/portal/get_quote`,
  Origin: UPSTREAM_BASE_URL,
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36'
};

let upstreamSessionCookie = '';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'events_db'
};

const extractSessionCookie = (response) => {
  const rawCookieHeader =
    typeof response.headers.getSetCookie === 'function'
      ? response.headers.getSetCookie().join('; ')
      : response.headers.get('set-cookie') || '';
  const match = rawCookieHeader.match(/ode_session=([^;]+)/i);

  if (match) {
    upstreamSessionCookie = `ode_session=${match[1]}`;
  }
};

const fetchUpstream = async (pathname, options = {}) => {
  const headers = {
    ...UPSTREAM_HEADERS,
    ...(options.headers || {})
  };

  if (upstreamSessionCookie) {
    headers.Cookie = upstreamSessionCookie;
  }

  const response = await fetch(`${UPSTREAM_BASE_URL}${pathname}`, {
    method: options.method || 'POST',
    ...options,
    headers
  });

  extractSessionCookie(response);
  return response;
};

const ensureUpstreamSession = async () => {
  const response = await fetch(`${UPSTREAM_BASE_URL}/portal/users/login`, {
    method: 'GET',
    headers: UPSTREAM_HEADERS
  });

  extractSessionCookie(response);
};

const fetchUpstreamWithSessionRetry = async (pathname, options = {}) => {
  let response = await fetchUpstream(pathname, options);

  if (response.ok) {
    return response;
  }

  if (!upstreamSessionCookie) {
    await ensureUpstreamSession();
    response = await fetchUpstream(pathname, options);
  }

  return response;
};

const extractOptionsFromHtml = (html) => {
  const optionRegex = /<option[^>]*value=["']?([^"'>]*)["']?[^>]*>(.*?)<\/option>/gis;
  const matches = [];

  for (const match of html.matchAll(optionRegex)) {
    const value = String(match[1] || '').trim();
    const label = String(match[2] || '').replace(/<[^>]+>/g, '').trim();

    if (!label || /select/i.test(label)) {
      continue;
    }

    matches.push({
      label,
      value: value || label
    });
  }

  return matches;
};

const normalizeOption = (entry) => {
  if (!entry) {
    return null;
  }

  if (typeof entry === 'string') {
    return { label: entry.trim(), value: entry.trim() };
  }

  if (typeof entry === 'object') {
    const rawValue = entry.value ?? entry.id ?? entry.key ?? entry.name ?? entry.title ?? entry.label;
    const rawLabel = entry.label ?? entry.name ?? entry.title ?? entry.text ?? entry.value ?? entry.id;

    if (rawValue == null || rawLabel == null) {
      return null;
    }

    return {
      label: String(rawLabel).trim(),
      value: String(rawValue).trim()
    };
  }

  return null;
};

const findArrayInObject = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (!value || typeof value !== 'object') {
    return null;
  }

  for (const nestedValue of Object.values(value)) {
    const result = findArrayInObject(nestedValue);
    if (result) {
      return result;
    }
  }

  return null;
};

const parseUpstreamOptions = (text) => {
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) {
      return parsed.map(normalizeOption).filter(Boolean);
    }

    if (Array.isArray(parsed.event_types)) {
      return parsed.event_types
        .map((entry) => ({
          label: String(entry.event_type || '').trim(),
          value: String(entry.uid || entry.event_type || '').trim()
        }))
        .filter((entry) => entry.label && entry.value);
    }

    if (Array.isArray(parsed.countries)) {
      return parsed.countries
        .map((entry) => ({
          label: String(entry.name || '').trim(),
          value: String(entry.name || entry.abbreviation || '').trim()
        }))
        .filter((entry) => entry.label && entry.value);
    }

    const arrayValue = findArrayInObject(parsed);
    if (arrayValue) {
      return arrayValue.map(normalizeOption).filter(Boolean);
    }
  } catch (error) {
    // Fallback to HTML parsing below.
  }

  return extractOptionsFromHtml(text);
};

const getResponseDebugText = async (response) => {
  try {
    const text = await response.text();
    return text.slice(0, 500);
  } catch {
    return '';
  }
};

const buildQuoteQuery = (formData) =>
  new URLSearchParams({
    eventType: String(formData.eventType || ''),
    allASIpolicies: '0',
    eventDates: String(formData.eventDates || ''),
    privateResidence: String(formData.privateResidence || 0),
    event_state: String(formData.event_state || ''),
    number_of_persons: String(formData.number_of_persons || ''),
    host_liquor: String(formData.host_liquor || 0),
    liquor: String(formData.liquor || 0),
    noha: String(formData.noha || 0),
    w_o_s: String(formData.w_o_s || 0),
    p_a_n_c_b: String(formData.p_a_n_c_b || 0),
    e_a_i: String(formData.e_a_i || 0),
    additional_insureds: String(formData.additional_insureds || ''),
    is_sold_profitable: String(formData.is_sold_profitable || 0),
    ASIpolicies: '0',
    timezone: String(formData.timezone || 'Asia/Karachi')
  });

const parseQuotePlans = (text) => {
  try {
    const parsed = JSON.parse(text);
    const optionOrder = ['firstOption', 'secondOption', 'thirdOption', 'fourthOption'];

    return optionOrder
      .map((key, index) => {
        const option = parsed[key];
        if (!option) {
          return null;
        }

        const stats = Object.values(option.limits || {})
          .filter((limit) => limit && typeof limit === 'object' && limit.gl_limit && limit.gl_limit_type)
          .map((limit) => ({
            label: String(limit.gl_limit_type).trim(),
            value: String(limit.gl_limit).trim()
          }));

        return {
          id: String(option.id || `${key}-${index + 1}`),
          title: `${option.min_limit || '?'} Million / ${option.max_limit || '?'} Million`,
          price: `$${option.total ?? option.premium ?? 0}`,
          premium: `$${option.premium ?? 0}`,
          brokerFee: `$${option.broker_fee ?? 0}`,
          carrier: String(option.carrier || ''),
          recommended: Boolean(option.recommended),
          stats
        };
      })
      .filter(Boolean);
  } catch {
    return [];
  }
};

app.get('/api/get-quote/meta', async (_req, res) => {
  try {
    const [eventTypesResponse, statesResponse] = await Promise.all([
      fetchUpstreamWithSessionRetry('/portal/events/get_event_types_ajax', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: ''
      }),
      fetchUpstreamWithSessionRetry('/portal/get_quote/get_states_ajax', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: ''
      })
    ]);

    if (!eventTypesResponse.ok || !statesResponse.ok) {
      const [eventTypeDebug, stateDebug] = await Promise.all([
        getResponseDebugText(eventTypesResponse),
        getResponseDebugText(statesResponse)
      ]);

      console.error('Metadata upstream non-OK response', {
        eventTypesStatus: eventTypesResponse.status,
        statesStatus: statesResponse.status,
        eventTypeDebug,
        stateDebug
      });

      return res.status(200).json({
        eventTypes: DEFAULT_EVENT_TYPES,
        states: DEFAULT_STATES,
        warning: 'Using fallback metadata because upstream metadata could not be loaded.'
      });
    }

    const [eventTypesText, statesText] = await Promise.all([
      eventTypesResponse.text(),
      statesResponse.text()
    ]);

    const eventTypes = parseUpstreamOptions(eventTypesText);
    const states = parseUpstreamOptions(statesText);

    res.status(200).json({
      eventTypes: eventTypes.length ? eventTypes : DEFAULT_EVENT_TYPES,
      states: states.length ? states : DEFAULT_STATES,
      warning:
        eventTypes.length && states.length
          ? undefined
          : 'Using fallback values for empty upstream metadata.'
    });
  } catch (error) {
    console.error('Upstream metadata error:', error);
    res.status(200).json({
      eventTypes: DEFAULT_EVENT_TYPES,
      states: DEFAULT_STATES,
      warning: error instanceof Error ? error.message : 'Unknown metadata error'
    });
  }
});

app.post('/api/get-quote', async (req, res) => {
  try {
    const params = buildQuoteQuery(req.body);
    const response = await fetchUpstreamWithSessionRetry(
      `/portal/events/get_quote_ajax?${params.toString()}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: ''
      }
    );

    const html = await response.text();
    const plans = parseQuotePlans(html);

    if (!response.ok) {
      console.error('Live quote non-OK response', {
        status: response.status,
        bodySnippet: html.slice(0, 500)
      });

      return res.status(502).json({
        success: false,
        error: `Live quote request failed with status ${response.status}`,
        data: html,
        plans: []
      });
    }

    res.status(200).json({
      success: true,
      data: html,
      plans
    });
  } catch (error) {
    console.error('Upstream quote error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown quote error',
      plans: []
    });
  }
});

app.post('/api/quote', async (req, res) => {
  let connection;
  try {
    const d = req.body;
    connection = await mysql.createConnection(dbConfig);

    const sql = `INSERT INTO insurance_quotes SET 
      event_type = ?, event_type_other = ?, event_timing_type = ?, event_date = ?,
      event_end_date = ?, event_state = ?, is_private_residence = ?, alcohol_type = ?,
      profit_from_alcohol = ?, ticketed_event = ?, guest_count = ?, has_activities = ?,
      activities = ?, venue_requires_additional_insured = ?, waiver_of_subrogation = ?,
      primary_non_contributory = ?, hired_non_owned_auto = ?, additional_insured_amount = ?,
      event_name = ?, event_description = ?, selected_plan = ?, insured_first_name = ?,
      insured_last_name = ?, insured_address = ?, insured_city = ?, insured_state = ?,
      insured_zip = ?, venue_name = ?, venue_address = ?, venue_city = ?, venue_state = ?,
      venue_zip = ?, venue_contact_name = ?, venue_contact_phone = ?, venue_contact_email = ?,
      quote_user_first_name = ?, quote_user_last_name = ?, quote_user_email = ?, quote_user_phone_number = ?`;

    const values = [
      d.event_type, d.event_type_other, d.event_timing_type, d.event_date, d.event_end_date,
      d.event_state, d.is_private_residence, d.alcohol_type, d.profit_from_alcohol,
      d.ticketed_event, d.guest_count, d.has_activities, JSON.stringify(d.activities),
      d.venue_requires_additional_insured, d.waiver_of_subrogation, d.primary_non_contributory,
      d.hired_non_owned_auto, d.additional_insured_amount, d.event_name, d.event_description,
      d.selected_plan, d.insured_first_name, d.insured_last_name, d.insured_address,
      d.insured_city, d.insured_state, d.insured_zip, d.venue_name, d.venue_address,
      d.venue_city, d.venue_state, d.venue_zip, d.venue_contact_name, d.venue_contact_phone,
      d.venue_contact_email, d.quote_user_first_name, d.quote_user_last_name,
      d.quote_user_email, d.quote_user_phone_number
    ];

    const [result] = await connection.execute(sql, values);
    res.status(200).json({ success: true, message: 'Quote saved!', id: result.insertId });
  } catch (err) {
    console.error('Database Error:', err);
    res.status(500).json({ success: false, error: err.message });
  } finally {
    if (connection) await connection.end();
  }
});

app.listen(8000, () => console.log('Backend running on http://localhost:8000'));
