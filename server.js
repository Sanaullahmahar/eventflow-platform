import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'events_db'
};

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