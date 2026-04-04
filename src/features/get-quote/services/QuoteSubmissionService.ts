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
  public constructor(private readonly endpoint: string) {}

  public async submit(payload: QuoteSubmissionPayload) {
    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.details ? JSON.stringify(data.details) : data?.error || "Quote submission failed",
      );
    }

    return data;
  }
}

export const quoteSubmissionService = new QuoteSubmissionService("http://127.0.0.1:8000/api/quote");
