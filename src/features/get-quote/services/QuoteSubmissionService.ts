export interface QuoteFieldOption {
  label: string;
  value: string;
}

export interface QuoteFormMetaResponse {
  eventTypes: QuoteFieldOption[];
  states: QuoteFieldOption[];
  warning?: string;
}

export interface LiveQuotePlan {
  id: string;
  title: string;
  price: string;
  premium: string;
  brokerFee: string;
  carrier: string;
  recommended?: boolean;
  stats: Array<{ label: string; value: string }>;
}

export interface LiveQuoteRequestPayload {
  eventType: string;
  eventDates: string;
  event_state: string;
  number_of_persons: string;
  host_liquor: number;
  liquor: number;
  privateResidence: number;
  noha: number;
  w_o_s: number;
  p_a_n_c_b: number;
  e_a_i: number;
  additional_insureds: string;
  is_sold_profitable: number;
  timezone: string;
}

export interface LiveQuoteResponse {
  success: boolean;
  data: string;
  plans: LiveQuotePlan[];
  error?: string;
}

export interface QuoteSubmissionPayload {
  event_type: string;
  event_type_other: string | null;
  event_timing_type: string;
  event_date: string;
  event_end_date: string;
  event_state: string;
  is_private_residence: boolean;
  alcohol_type: string;
  profit_from_alcohol: boolean | null;
  ticketed_event: boolean | null;
  guest_count: number;
  has_activities: boolean;
  activities: string[];
  venue_requires_additional_insured: boolean;
  waiver_of_subrogation: boolean;
  primary_non_contributory: boolean;
  hired_non_owned_auto: boolean;
  additional_insured_amount: number;
  event_name: string | null;
  event_description: string;
  selected_plan: string;
  insured_first_name: string;
  insured_last_name: string;
  insured_address: string;
  insured_city: string;
  insured_state: string;
  insured_zip: string;
  venue_name: string;
  venue_address: string;
  venue_city: string;
  venue_state: string;
  venue_zip: string;
  venue_contact_name: string | null;
  venue_contact_phone: string | null;
  venue_contact_email: string | null;
  quote_user_first_name: string;
  quote_user_last_name: string;
  quote_user_email: string;
  quote_user_phone_number: string;
}

export class QuoteSubmissionService {
  public constructor(
    private readonly submitEndpoint: string,
    private readonly metaEndpoint: string,
    private readonly liveQuoteEndpoint: string,
  ) {}

  private async parseResponse<T>(response: Response): Promise<T | null> {
    const text = await response.text();

    if (!text.trim()) {
      return null;
    }

    try {
      return JSON.parse(text) as T;
    } catch {
      throw new Error(
        `The server returned a non-JSON response for ${response.url || "this request"}.`,
      );
    }
  }

  public async loadFormMeta() {
    const response = await fetch(this.metaEndpoint);
    const data = await this.parseResponse<QuoteFormMetaResponse & { error?: string }>(response);

    if (!response.ok) {
      throw new Error(data?.error || `Unable to load quote form data (${response.status})`);
    }

    if (!data) {
      throw new Error("The quote form API returned an empty response. Make sure the backend server is running.");
    }

    return data;
  }

  public async getLiveQuote(payload: LiveQuoteRequestPayload) {
    const response = await fetch(this.liveQuoteEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await this.parseResponse<LiveQuoteResponse & { error?: string }>(response);

    if (!response.ok) {
      throw new Error(data?.error || `Unable to load live quote (${response.status})`);
    }

    if (!data) {
      throw new Error("The live quote API returned an empty response.");
    }

    return {
      ...data,
      plans: Array.isArray(data.plans)
        ? data.plans.map((plan) => ({
            id: String(plan?.id ?? ""),
            title: String(plan?.title ?? "Website B Plan"),
            price: String(plan?.price ?? ""),
            premium: String(plan?.premium ?? ""),
            brokerFee: String(plan?.brokerFee ?? ""),
            carrier: String(plan?.carrier ?? ""),
            recommended: Boolean(plan?.recommended),
            stats: Array.isArray(plan?.stats) ? plan.stats : [],
          }))
        : [],
    };
  }

  public async submit(payload: QuoteSubmissionPayload) {
    const response = await fetch(this.submitEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await this.parseResponse<
      { success?: boolean; error?: string; details?: unknown; id?: number; message?: string }
    >(response);

    if (!response.ok) {
      throw new Error(
        data?.details ? JSON.stringify(data.details) : data?.error || "Quote submission failed",
      );
    }

    if (!data) {
      throw new Error("The quote submission API returned an empty response.");
    }

    return data;
  }
}

export const quoteSubmissionService = new QuoteSubmissionService(
  "/api/quote",
  "/api/get-quote/meta",
  "/api/get-quote",
);
