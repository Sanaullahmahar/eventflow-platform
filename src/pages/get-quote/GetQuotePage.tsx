import { type ReactNode, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, ChevronDown, Search, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { primaryActionClass, TOTAL_STEPS } from "@/features/get-quote/config/quoteFlow";
import {
  type LiveQuoteRequestPayload,
  type LiveQuotePlan,
  type QuoteFieldOption,
  type QuoteSubmissionPayload,
  quoteSubmissionService,
} from "@/features/get-quote/services/QuoteSubmissionService";
import { emailRegex, getPhoneError, nameCityRegex, zipRegex } from "@/features/get-quote/utils/quoteValidation";
import { AppRoutes } from "@/shared/routing/AppRoutes";

type AlcoholType = "sold" | "served" | "byob" | "none" | "";
type EventTimingType = "quick" | "custom" | "";
type BoolOrNull = boolean | null;

const DEFAULT_EVENT_TYPES: QuoteFieldOption[] = [
  { label: "Wedding", value: "Wedding" },
  { label: "Birthday", value: "Birthday" },
  { label: "Vendor at Event", value: "Vendor" },
  { label: "Corporate Event", value: "Corporate" },
  { label: "Concert / Festival", value: "Concert" },
  { label: "Other Event", value: "Other" },
];

const DEFAULT_STATES: QuoteFieldOption[] = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois",
  "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
  "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
].map((state) => ({ label: state, value: state }));

const slideVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

const normalize = (value: string) => value.replace(/\s+/g, " ").trim();

const formatEventDates = (startDate: string, endDate: string) =>
  !startDate ? "" : !endDate || startDate === endDate ? startDate : `${startDate} - ${endDate}`;

const GetQuotePage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [bootstrapError, setBootstrapError] = useState("");
  const [eventTypes, setEventTypes] = useState<QuoteFieldOption[]>(DEFAULT_EVENT_TYPES);
  const [states, setStates] = useState<QuoteFieldOption[]>(DEFAULT_STATES);
  const [selectedType, setSelectedType] = useState("");
  const [customType, setCustomType] = useState("");
  const [eventTimingType, setEventTimingType] = useState<EventTimingType>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [eventState, setEventState] = useState("");
  const [isPrivateResidence, setIsPrivateResidence] = useState<BoolOrNull>(null);
  const [alcoholType, setAlcoholType] = useState<AlcoholType>("");
  const [profitFromAlcohol, setProfitFromAlcohol] = useState<BoolOrNull>(null);
  const [ticketedEvent, setTicketedEvent] = useState<BoolOrNull>(null);
  const [guestCount, setGuestCount] = useState("");
  const [hasActivities, setHasActivities] = useState<BoolOrNull>(null);
  const [customActivities, setCustomActivities] = useState("");
  const [waiverOfSubrogation, setWaiverOfSubrogation] = useState(false);
  const [primaryNonContributory, setPrimaryNonContributory] = useState(false);
  const [hiredNonOwnedAuto, setHiredNonOwnedAuto] = useState(false);
  const [additionalInsuredAmount, setAdditionalInsuredAmount] = useState("0");
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [quoteHtml, setQuoteHtml] = useState("");
  const [livePlans, setLivePlans] = useState<LiveQuotePlan[]>([]);
  const [isLoadingPlans, setIsLoadingPlans] = useState(false);
  const [plansError, setPlansError] = useState("");
  const [lastQuoteSignature, setLastQuoteSignature] = useState("");
  const [insuredFirstName, setInsuredFirstName] = useState("");
  const [insuredLastName, setInsuredLastName] = useState("");
  const [insuredAddress, setInsuredAddress] = useState("");
  const [insuredCity, setInsuredCity] = useState("");
  const [insuredState, setInsuredState] = useState("");
  const [insuredZip, setInsuredZip] = useState("");
  const [insuredTouched, setInsuredTouched] = useState<Record<string, boolean>>({});
  const [venueName, setVenueName] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [venueCity, setVenueCity] = useState("");
  const [venueState, setVenueState] = useState("");
  const [venueZip, setVenueZip] = useState("");
  const [venueContactName, setVenueContactName] = useState("");
  const [venueContactPhone, setVenueContactPhone] = useState("");
  const [venueContactEmail, setVenueContactEmail] = useState("");
  const [venueTouched, setVenueTouched] = useState<Record<string, boolean>>({});
  const [quoteUserFirstName, setQuoteUserFirstName] = useState("");
  const [quoteUserLastName, setQuoteUserLastName] = useState("");
  const [quoteUserEmail, setQuoteUserEmail] = useState("");
  const [quoteUserPhoneNumber, setQuoteUserPhoneNumber] = useState("");
  const [quoteTouched, setQuoteTouched] = useState<Record<string, boolean>>({});

  const activityItems = useMemo(
    () => customActivities.split(",").map((item) => item.trim()).filter(Boolean),
    [customActivities],
  );
  const safeEventTypes = Array.isArray(eventTypes) ? eventTypes : DEFAULT_EVENT_TYPES;
  const safeStates = Array.isArray(states) ? states : DEFAULT_STATES;
  const safeLivePlans = Array.isArray(livePlans) ? livePlans : [];
  const stateLabels = useMemo(() => safeStates.map((state) => state.label), [safeStates]);

  useEffect(() => {
    const load = async () => {
      setIsBootstrapping(true);
      setBootstrapError("");
      try {
        const data = await quoteSubmissionService.loadFormMeta();
        setEventTypes(data.eventTypes?.length ? data.eventTypes : DEFAULT_EVENT_TYPES);
        setStates(data.states?.length ? data.states : DEFAULT_STATES);
      } catch (error) {
        setEventTypes(DEFAULT_EVENT_TYPES);
        setStates(DEFAULT_STATES);
        setBootstrapError(error instanceof Error ? error.message : "Unable to load quote form");
      } finally {
        setIsBootstrapping(false);
      }
    };
    void load();
  }, []);

  const getFieldError = (field: string) => {
    switch (field) {
      case "insuredFirstName":
        if (!insuredFirstName.trim()) return "The first name field is required.";
        return nameCityRegex.test(insuredFirstName.trim()) ? "" : "Only letters, apostrophes, dashes and dots are allowed.";
      case "insuredLastName":
        if (!insuredLastName.trim()) return "The last name field is required.";
        return nameCityRegex.test(insuredLastName.trim()) ? "" : "Only letters, apostrophes, dashes and dots are allowed.";
      case "insuredAddress":
        return insuredAddress.trim() ? "" : "Street address is required.";
      case "insuredCity":
        if (!insuredCity.trim()) return "City is required.";
        return nameCityRegex.test(insuredCity.trim()) ? "" : "Only letters, apostrophes, dashes and dots are allowed.";
      case "insuredState":
        return insuredState.trim() ? "" : "State is required.";
      case "insuredZip":
        if (!insuredZip.trim()) return "Zip code is required.";
        return zipRegex.test(insuredZip.trim()) ? "" : "Zip code must be at least 5 digits.";
      case "venueName":
        return venueName.trim() ? "" : "Venue name is required.";
      case "venueAddress":
        return venueAddress.trim() ? "" : "Street address is required.";
      case "venueCity":
        return venueCity.trim() ? "" : "Venue city is required.";
      case "venueState":
        return venueState.trim() ? "" : "State is required.";
      case "venueZip":
        if (!venueZip.trim()) return "Zip code is required.";
        return zipRegex.test(venueZip.trim()) ? "" : "Zip code must be exactly 5 digits.";
      case "venueContactEmail":
        if (!venueContactEmail.trim()) return "";
        return emailRegex.test(venueContactEmail.trim()) ? "" : "Enter a valid email address.";
      case "venueContactPhone":
        return getPhoneError(venueContactPhone, false);
      case "quoteUserFirstName":
        return quoteUserFirstName.trim() ? "" : "First name is required.";
      case "quoteUserLastName":
        return quoteUserLastName.trim() ? "" : "Last name is required.";
      case "quoteUserEmail":
        if (!quoteUserEmail.trim()) return "Email is required.";
        return emailRegex.test(quoteUserEmail.trim()) ? "" : "Email must include a valid domain.";
      case "quoteUserPhoneNumber":
        return getPhoneError(quoteUserPhoneNumber, true);
      default:
        return "";
    }
  };

  const showInsuredError = (field: string) => (insuredTouched[field] ? getFieldError(field) : "");
  const showVenueError = (field: string) => (venueTouched[field] ? getFieldError(field) : "");
  const showQuoteError = (field: string) => (quoteTouched[field] ? getFieldError(field) : "");

  const buildLiveQuotePayload = (): LiveQuoteRequestPayload => ({
    eventType: selectedType || customType.trim(),
    eventDates: formatEventDates(startDate, endDate),
    event_state: eventState,
    number_of_persons: guestCount,
    host_liquor: alcoholType === "served" ? 1 : 0,
    liquor: alcoholType === "none" ? 0 : alcoholType ? 1 : 0,
    privateResidence: isPrivateResidence ? 1 : 0,
    noha: hiredNonOwnedAuto ? 1 : 0,
    w_o_s: waiverOfSubrogation ? 1 : 0,
    p_a_n_c_b: primaryNonContributory ? 1 : 0,
    e_a_i: Number(additionalInsuredAmount || 0) > 0 ? 1 : 0,
    additional_insureds: additionalInsuredAmount || "0",
    is_sold_profitable: alcoholType === "sold" && profitFromAlcohol ? 1 : 0,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Karachi",
  });

  const quoteSignature = JSON.stringify(buildLiveQuotePayload());

  const fetchLiveQuote = async (force = false) => {
    if (!force && quoteSignature === lastQuoteSignature && (livePlans.length || quoteHtml)) return;
    setIsLoadingPlans(true);
    setPlansError("");
    setSelectedPlan("");
    try {
      const response = await quoteSubmissionService.getLiveQuote(buildLiveQuotePayload());
      setQuoteHtml(response.data);
      setLivePlans(response.plans);
      setLastQuoteSignature(quoteSignature);
    } catch (error) {
      setPlansError(error instanceof Error ? error.message : "Unable to load live quote");
      setQuoteHtml("");
      setLivePlans([]);
    } finally {
      setIsLoadingPlans(false);
    }
  };

  useEffect(() => {
    if (step === 9) void fetchLiveQuote();
  }, [step, quoteSignature]);

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedType !== "" || customType.trim().length >= 3;
      case 2:
        return eventTimingType !== "" && startDate !== "" && endDate !== "" && new Date(startDate) <= new Date(endDate);
      case 3:
        return eventState !== "" && isPrivateResidence !== null;
      case 4:
        return alcoholType === "sold" ? profitFromAlcohol !== null : alcoholType === "served" ? ticketedEvent !== null : alcoholType !== "";
      case 5:
        return guestCount !== "" && Number(guestCount) > 0;
      case 6:
        return hasActivities === null ? false : hasActivities ? customActivities.trim().length >= 3 : true;
      case 7:
        return additionalInsuredAmount !== "" && Number(additionalInsuredAmount) >= 0;
      case 8:
        return eventDescription.trim().length >= 5;
      case 9:
        return !isLoadingPlans && selectedPlan !== "";
      case 10:
        return ["insuredFirstName", "insuredLastName", "insuredAddress", "insuredCity", "insuredState", "insuredZip"].every((field) => !getFieldError(field));
      case 11:
        return ["venueName", "venueAddress", "venueCity", "venueState", "venueZip", "venueContactEmail", "venueContactPhone"].every((field) => !getFieldError(field));
      case 12:
        return ["quoteUserFirstName", "quoteUserLastName", "quoteUserEmail", "quoteUserPhoneNumber"].every((field) => !getFieldError(field));
      default:
        return false;
    }
  };

  const submitQuote = async () => {
    const payload: QuoteSubmissionPayload = {
      event_type: selectedType || "Other",
      event_type_other: selectedType ? null : customType.trim(),
      event_timing_type: eventTimingType,
      event_date: startDate,
      event_end_date: endDate || startDate,
      event_state: eventState,
      is_private_residence: Boolean(isPrivateResidence),
      alcohol_type: alcoholType,
      profit_from_alcohol: alcoholType === "sold" ? profitFromAlcohol : null,
      ticketed_event: alcoholType === "served" ? ticketedEvent : null,
      guest_count: Number(guestCount),
      has_activities: Boolean(hasActivities),
      activities: activityItems,
      venue_requires_additional_insured:
        waiverOfSubrogation || primaryNonContributory || hiredNonOwnedAuto || Number(additionalInsuredAmount || 0) > 0,
      waiver_of_subrogation: waiverOfSubrogation,
      primary_non_contributory: primaryNonContributory,
      hired_non_owned_auto: hiredNonOwnedAuto,
      additional_insured_amount: Number(additionalInsuredAmount || 0),
      event_name: eventName.trim() || null,
      event_description: eventDescription.trim(),
      selected_plan: selectedPlan,
      insured_first_name: insuredFirstName.trim(),
      insured_last_name: insuredLastName.trim(),
      insured_address: insuredAddress.trim(),
      insured_city: insuredCity.trim(),
      insured_state: insuredState.trim(),
      insured_zip: insuredZip.trim(),
      venue_name: venueName.trim(),
      venue_address: venueAddress.trim(),
      venue_city: venueCity.trim(),
      venue_state: venueState.trim(),
      venue_zip: venueZip.trim(),
      venue_contact_name: venueContactName.trim() || null,
      venue_contact_phone: venueContactPhone.trim() || null,
      venue_contact_email: venueContactEmail.trim() || null,
      quote_user_first_name: quoteUserFirstName.trim(),
      quote_user_last_name: quoteUserLastName.trim(),
      quote_user_email: quoteUserEmail.trim(),
      quote_user_phone_number: quoteUserPhoneNumber.trim(),
    };
    setIsSubmitting(true);
    try {
      await quoteSubmissionService.submit(payload);
      window.alert("Quote submitted successfully.");
      navigate(AppRoutes.HOME);
    } catch (error) {
      window.alert(`Quote submission failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickPick = (mode: EventTimingType, offset = 0) => {
    setEventTimingType(mode);
    if (mode === "custom") return;
    const date = new Date();
    date.setDate(date.getDate() + offset);
    const value = date.toISOString().split("T")[0];
    setStartDate(value);
    setEndDate(value);
  };

  const nextStep = () => canProceed() && step < TOTAL_STEPS && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  if (isBootstrapping) return <CenteredState title="Loading quote form" message="Fetching live event types and states from the provider." />;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <StepHeader title="Hi, let's get your quote!" subtitle="What type of event do you need covered?" />
            {bootstrapError && (
              <div className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                Live form metadata could not be loaded from the provider, so fallback event types and states are being used.
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {safeEventTypes.slice(0, 6).map((type) => (
                <ChoiceButton
                  key={type.value}
                  active={selectedType === type.value}
                  onClick={() => {
                    setSelectedType(type.value);
                    setCustomType("");
                  }}
                  label={type.label}
                />
              ))}
            </div>
            <FieldShell icon={<Search className="h-4 w-4" />}>
              <input value={customType} onChange={(e) => { setCustomType(e.target.value); setSelectedType(""); }} placeholder="Type your event here if you do not see it above" className={inputClass} />
            </FieldShell>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <StepHeader title="When is your event?" subtitle="Choose the date for your event" />
            <div className="flex flex-wrap justify-center gap-3">
              <ChoiceButton active={eventTimingType === "quick" && startDate === new Date().toISOString().split("T")[0]} onClick={() => quickPick("quick", 0)} label="Today" />
              <ChoiceButton active={eventTimingType === "quick" && startDate !== "" && startDate !== new Date().toISOString().split("T")[0]} onClick={() => quickPick("quick", 1)} label="Tomorrow" />
              <ChoiceButton active={eventTimingType === "custom"} onClick={() => quickPick("custom")} label="Custom" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FieldShell icon={<Calendar className="h-4 w-4" />}><input type="date" value={startDate} onChange={(e) => { setStartDate(e.target.value); if (!endDate || endDate < e.target.value) setEndDate(e.target.value); }} className={inputClass} /></FieldShell>
              <FieldShell icon={<Calendar className="h-4 w-4" />}><input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} min={startDate} className={inputClass} /></FieldShell>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <StepHeader title="What state is the event in?" subtitle="Choose the state for your event" />
            <SelectField value={eventState} onChange={(value) => { setEventState(value); setIsPrivateResidence(value ? false : null); }} options={safeStates.map((state) => ({ label: state.label, value: state.value }))} placeholder="Select State" />
            {eventState && <BinarySelection title="Is the event held at a private residence?" value={isPrivateResidence} onSelect={setIsPrivateResidence} />}
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <StepHeader title="Alcohol at the event will be" subtitle="Choose how alcohol will be handled" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["sold", "Sold"],
                ["served", "Served"],
                ["byob", "B.Y.O.B"],
                ["none", "No Alcohol"],
              ].map(([value, label]) => <ChoiceButton key={value} active={alcoholType === value} onClick={() => { setAlcoholType(value as AlcoholType); setProfitFromAlcohol(null); setTicketedEvent(null); }} label={label} />)}
            </div>
            {alcoholType === "sold" && <BinarySelection title="Did you make profit from alcohol sales?" value={profitFromAlcohol} onSelect={setProfitFromAlcohol} />}
            {alcoholType === "served" && <BinarySelection title="Is the event ticketed?" value={ticketedEvent} onSelect={setTicketedEvent} />}
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <StepHeader title="How many guests will be attending?" subtitle="Add the highest number you expect at the event" />
            <input type="number" min="1" value={guestCount} onChange={(e) => setGuestCount(e.target.value)} placeholder="Guests" className={wideInputClass} />
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <StepHeader title="Will your event include any special activities?" subtitle="Examples: pyrotechnics, inflatables, rides, water activities" />
            <BinarySelection title="Do any higher-risk activities apply?" value={hasActivities} onSelect={setHasActivities} />
            {hasActivities && <textarea value={customActivities} onChange={(e) => setCustomActivities(e.target.value)} rows={4} placeholder="Describe the activities. Separate multiple items with commas." className={wideInputClass} />}
          </div>
        );
      case 7:
        return (
          <div className="space-y-6">
            <StepHeader title="Does your venue require any of these?" subtitle="Only select the items your venue specifically requires" />
            <BinarySelection title="Waiver of Subrogation" value={waiverOfSubrogation} onSelect={setWaiverOfSubrogation} />
            <BinarySelection title="Primary/Non-contributory Basis" value={primaryNonContributory} onSelect={setPrimaryNonContributory} />
            <BinarySelection title="Hired/Non-owned Auto" value={hiredNonOwnedAuto} onSelect={setHiredNonOwnedAuto} />
            <input type="number" min="0" value={additionalInsuredAmount} onChange={(e) => setAdditionalInsuredAmount(e.target.value)} placeholder="Additional insured count" className={wideInputClass} />
          </div>
        );
      case 8:
        return (
          <div className="space-y-6">
            <StepHeader title="Provide event details" subtitle="We will use these details to request live plans" />
            <input value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="Event Name (optional)" className={wideInputClass} />
            <textarea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} rows={5} placeholder="Describe your event" className={wideInputClass} />
          </div>
        );
      case 9:
        return (
          <div className="space-y-6">
            <StepHeader title="Select your live quote plan" subtitle="These options are loaded in real time from the provider" />
            {isLoadingPlans && <CenteredPanel title="Generating quote" message="We are requesting plans for your event right now." compact />}
            {!isLoadingPlans && plansError && <CenteredPanel title="We could not load plans" message={plansError} actionLabel="Retry quote request" onAction={() => void fetchLiveQuote(true)} compact />}
            {!isLoadingPlans && !plansError && (
              <>
                <div className="grid gap-4 lg:grid-cols-3">
                  {safeLivePlans.map((plan) => (
                    <button key={plan.id} onClick={() => setSelectedPlan(plan.id)} className={`rounded-3xl border bg-white p-5 text-left shadow-sm transition ${selectedPlan === plan.id ? "border-primary ring-2 ring-primary" : "border-border hover:border-primary/40"}`}>
                      {plan.recommended && <div className="mb-3 rounded-full bg-primary px-3 py-1 text-center text-xs font-semibold uppercase text-primary-foreground">Recommended</div>}
                      <div className="text-lg font-semibold text-foreground">{plan.title}</div>
                      <div className="mt-2 text-4xl font-bold text-primary">{plan.price}</div>
                      <div className="mt-2 text-sm text-muted-foreground">Carrier: <span className="text-foreground">{plan.carrier}</span></div>
                      <div className="text-sm text-muted-foreground">Premium: <span className="text-foreground">{plan.premium}</span></div>
                      <div className="text-sm text-muted-foreground">Broker Fee: <span className="text-foreground">{plan.brokerFee}</span></div>
                      <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                        {(Array.isArray(plan.stats) ? plan.stats : []).map((stat, index) => <div key={`${plan.id}-${index}`} className="flex justify-between gap-3"><span>{stat.label}</span><span className="text-foreground">{stat.value}</span></div>)}
                      </div>
                    </button>
                  ))}
                </div>
                {!safeLivePlans.length && (
                  <CenteredPanel
                    title="No structured plans were returned"
                    message="Website B responded, but no plan options were present in the payload for this event."
                    compact
                  />
                )}
              </>
            )}
          </div>
        );
      case 10:
        return (
          <div className="space-y-4">
            <StepHeader title="What is the name and address of the insured?" subtitle="" />
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField value={insuredFirstName} onChange={setInsuredFirstName} onBlur={() => setInsuredTouched((s) => ({ ...s, insuredFirstName: true }))} placeholder="First Name" error={showInsuredError("insuredFirstName")} />
              <InputField value={insuredLastName} onChange={setInsuredLastName} onBlur={() => setInsuredTouched((s) => ({ ...s, insuredLastName: true }))} placeholder="Last Name" error={showInsuredError("insuredLastName")} />
              <InputField value={insuredAddress} onChange={setInsuredAddress} onBlur={() => setInsuredTouched((s) => ({ ...s, insuredAddress: true }))} placeholder="Street Address" error={showInsuredError("insuredAddress")} />
              <InputField value={insuredCity} onChange={setInsuredCity} onBlur={() => setInsuredTouched((s) => ({ ...s, insuredCity: true }))} placeholder="City" error={showInsuredError("insuredCity")} />
              <SelectField value={insuredState} onChange={setInsuredState} onBlur={() => setInsuredTouched((s) => ({ ...s, insuredState: true }))} options={stateLabels.map((label) => ({ label, value: label }))} placeholder="Select State" error={showInsuredError("insuredState")} />
              <InputField value={insuredZip} onChange={(value) => setInsuredZip(value.replace(/\D/g, "").slice(0, 5))} onBlur={() => setInsuredTouched((s) => ({ ...s, insuredZip: true }))} placeholder="Zip" error={showInsuredError("insuredZip")} />
            </div>
          </div>
        );
      case 11:
        return (
          <div className="space-y-4">
            <StepHeader title="What is the event name and venue details?" subtitle="" />
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField value={eventName} onChange={setEventName} placeholder="Event Name" />
              <InputField value={venueName} onChange={setVenueName} onBlur={() => setVenueTouched((s) => ({ ...s, venueName: true }))} placeholder="Venue Name" error={showVenueError("venueName")} />
              <InputField value={venueAddress} onChange={setVenueAddress} onBlur={() => setVenueTouched((s) => ({ ...s, venueAddress: true }))} placeholder="Street Address" error={showVenueError("venueAddress")} />
              <InputField value={venueCity} onChange={setVenueCity} onBlur={() => setVenueTouched((s) => ({ ...s, venueCity: true }))} placeholder="Venue City" error={showVenueError("venueCity")} />
              <SelectField value={venueState} onChange={setVenueState} onBlur={() => setVenueTouched((s) => ({ ...s, venueState: true }))} options={stateLabels.map((label) => ({ label, value: label }))} placeholder="Select State" error={showVenueError("venueState")} />
              <InputField value={venueZip} onChange={(value) => setVenueZip(value.replace(/\D/g, "").slice(0, 5))} onBlur={() => setVenueTouched((s) => ({ ...s, venueZip: true }))} placeholder="Zip" error={showVenueError("venueZip")} />
              <InputField value={venueContactName} onChange={setVenueContactName} placeholder="Venue Contact Name (optional)" />
              <InputField value={venueContactPhone} onChange={setVenueContactPhone} onBlur={() => setVenueTouched((s) => ({ ...s, venueContactPhone: true }))} placeholder="Venue Phone (optional)" error={showVenueError("venueContactPhone")} />
              <div className="sm:col-span-2"><InputField value={venueContactEmail} onChange={setVenueContactEmail} onBlur={() => setVenueTouched((s) => ({ ...s, venueContactEmail: true }))} placeholder="Venue Contact Email (optional)" error={showVenueError("venueContactEmail")} /></div>
            </div>
          </div>
        );
      case 12:
        return (
          <div className="space-y-4">
            <StepHeader title="What is your best contact information?" subtitle="" />
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField value={quoteUserFirstName} onChange={setQuoteUserFirstName} onBlur={() => setQuoteTouched((s) => ({ ...s, quoteUserFirstName: true }))} placeholder="First Name" error={showQuoteError("quoteUserFirstName")} />
              <InputField value={quoteUserLastName} onChange={setQuoteUserLastName} onBlur={() => setQuoteTouched((s) => ({ ...s, quoteUserLastName: true }))} placeholder="Last Name" error={showQuoteError("quoteUserLastName")} />
              <InputField value={quoteUserEmail} onChange={setQuoteUserEmail} onBlur={() => setQuoteTouched((s) => ({ ...s, quoteUserEmail: true }))} placeholder="Email" error={showQuoteError("quoteUserEmail")} />
              <InputField value={quoteUserPhoneNumber} onChange={setQuoteUserPhoneNumber} onBlur={() => setQuoteTouched((s) => ({ ...s, quoteUserPhoneNumber: true }))} placeholder="Phone Number" error={showQuoteError("quoteUserPhoneNumber")} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <nav className="flex items-center justify-between border-b border-border bg-background/80 px-6 py-4 backdrop-blur-lg sm:px-12">
        <button onClick={() => navigate(AppRoutes.HOME)} className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Shield className="h-7 w-7 text-accent" />
          <span className="text-lg font-bold tracking-tight text-foreground">OneDayEvent</span>
        </button>
      </nav>
      <div className="h-1.5 w-full bg-muted">
        <motion.div animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }} transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }} className="h-full bg-accent" />
      </div>
      <main className="flex flex-1 items-start justify-center px-4 py-8 sm:px-6 sm:py-16">
        <div className="w-full max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div key={step} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="relative">
              {step > 1 && <button onClick={prevStep} aria-label="Go back" className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm transition-all hover:border-accent hover:text-accent"><ArrowLeft className="h-4 w-4" /></button>}
              {renderStep()}
              <div className="mx-auto mt-10 max-w-2xl">
                <motion.button whileHover={canProceed() ? { scale: 1.02 } : {}} whileTap={canProceed() ? { scale: 0.98 } : {}} disabled={!canProceed() || isSubmitting} onClick={async () => { if (step === TOTAL_STEPS) await submitQuote(); else nextStep(); }} className={`${primaryActionClass} ${!canProceed() || isSubmitting ? "cursor-not-allowed bg-muted text-muted-foreground" : "bg-primary text-primary-foreground shadow-button hover:bg-accent"}`}>
                  <span>{step === TOTAL_STEPS ? (isSubmitting ? "Finishing..." : "Finish") : "Next"}</span>
                  {step !== TOTAL_STEPS && <ArrowRight className="ml-2 h-4 w-4" />}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

const StepHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <header className="mb-8 text-center">
    <h2 className="text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl">
      {title}
      {subtitle && <><br /><span className="text-muted-foreground">{subtitle}</span></>}
    </h2>
  </header>
);

const inputClass = "w-full rounded-2xl border border-border bg-white/95 px-5 py-4 text-base text-foreground shadow-sm outline-none transition-all focus:border-accent focus:shadow-focus";
const wideInputClass = `${inputClass} min-h-[58px]`;

const FieldShell = ({ icon, children }: { icon: ReactNode; children: ReactNode }) => (
  <div className="relative">
    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</div>
    <div className="[&_input]:pl-11">{children}</div>
  </div>
);

const ChoiceButton = ({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) => (
  <button onClick={onClick} className={`rounded-2xl border px-6 py-4 text-center text-lg font-semibold transition ${active ? "border-accent bg-accent/10 text-foreground shadow-card-active" : "border-accent/70 bg-white/80 text-foreground hover:bg-accent/5"}`}>{label}</button>
);

const BinarySelection = ({ title, value, onSelect }: { title: string; value: boolean | null; onSelect: (value: boolean) => void }) => (
  <div className="space-y-3">
    <p className="text-center text-xl font-semibold text-foreground">{title}</p>
    <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
      {[true, false].map((option) => <ChoiceButton key={String(option)} active={value === option} onClick={() => onSelect(option)} label={option ? "Yes" : "No"} />)}
    </div>
  </div>
);

const SelectField = ({
  value,
  onChange,
  options,
  placeholder,
  error,
  onBlur,
}: {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  placeholder: string;
  error?: string;
  onBlur?: () => void;
}) => (
  <div className="relative">
    <select value={value} onChange={(e) => onChange(e.target.value)} onBlur={onBlur} className={`${inputClass} appearance-none pr-12 ${error ? "border-red-500" : ""}`}>
      <option value="">{placeholder}</option>
      {(Array.isArray(options) ? options : []).map((option) => <option key={`${option.value}-${option.label}`} value={option.value}>{option.label}</option>)}
    </select>
    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground" />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

const InputField = ({
  value,
  onChange,
  placeholder,
  error,
  onBlur,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  onBlur?: () => void;
}) => (
  <div>
    <input value={value} onChange={(e) => onChange(e.target.value)} onBlur={onBlur} placeholder={placeholder} className={`${inputClass} ${error ? "border-red-500" : ""}`} />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

const CenteredPanel = ({ title, message, actionLabel, onAction, compact }: { title: string; message: string; actionLabel?: string; onAction?: () => void; compact?: boolean }) => (
  <div className={`mx-auto rounded-3xl border border-border bg-card p-8 text-center shadow-lg ${compact ? "max-w-2xl" : "max-w-lg"}`}>
    <h3 className="text-2xl font-semibold text-foreground">{title}</h3>
    <p className="mt-3 text-muted-foreground">{message}</p>
    {actionLabel && onAction && <button onClick={onAction} className="mt-6 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">{actionLabel}</button>}
  </div>
);

const CenteredState = ({ title, message, actionLabel, onAction }: { title: string; message: string; actionLabel?: string; onAction?: () => void }) => (
  <div className="flex min-h-screen items-center justify-center bg-background px-6">
    <CenteredPanel title={title} message={message} actionLabel={actionLabel} onAction={onAction} />
  </div>
);

export default GetQuotePage;
