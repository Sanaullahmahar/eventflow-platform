import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ArrowRight, ArrowLeft, Cake, Diamond, Briefcase, PartyPopper, Music, Tent, Calendar, Search, MapPinned, ChevronDown, Wine, CircleAlert, MailOpen, Sparkles, MonitorSmartphone, MapPinCheckInside, ClipboardCheck, ReceiptText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const US_STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
const EVENT_TYPES = [
  { id: 'Wedding', label: 'Wedding', icon: Diamond },
  { id: 'Birthday', label: 'Birthday', icon: Cake },
  { id: 'Vendor', label: 'Vendor at Event', icon: Briefcase },
  { id: 'Corporate', label: 'Corporate Event', icon: PartyPopper },
  { id: 'Concert', label: 'Concert / Festival', icon: Music },
  { id: 'Other', label: 'Other Event', icon: Tent },
];
const PLAN_OPTIONS = [
  { id: 'basic', limit: '1 Million / 2 Million', accent: 'bg-[#36a3dd] text-white', outline: 'border-[#36a3dd] text-[#36a3dd]', price: '697', stats: [{ label: 'Per Occurence:', value: '$1 million' }, { label: 'Aggregate:', value: '$2 million' }, { label: 'Property Damage:', value: '$300,000' }, { label: 'Medical:', value: '$5,000' }, { label: 'Deductible:', value: '$0' }] },
  { id: 'standard', limit: '1 Million / 5 Million', accent: 'bg-primary text-primary-foreground', outline: 'border-primary text-primary-foreground bg-primary', price: '186', recommended: true, stats: [{ label: 'Per Occurence:', value: '$1 million' }, { label: 'Aggregate:', value: '$5 million' }, { label: 'Property Damage:', value: '$1 million' }, { label: 'Medical:', value: '$5,000' }, { label: 'Deductible:', value: '$0' }] },
  { id: 'premium', limit: '2 Million / 5 Million', accent: 'bg-[#08a045] text-white', outline: 'border-[#08a045] text-[#08a045]', price: '273', stats: [{ label: 'Per Occurence:', value: '$2 million' }, { label: 'Aggregate:', value: '$5 million' }, { label: 'Property Damage:', value: '$1 million' }, { label: 'Medical:', value: '$5,000' }, { label: 'Deductible:', value: '$0' }] },
  { id: 'enterprise', limit: '5 Million / 5 Million', accent: 'bg-[#433d83] text-white', outline: 'border-[#433d83] text-[#433d83]', price: '1244', stats: [{ label: 'Per Occurence:', value: '$5 million' }, { label: 'Aggregate:', value: '$5 million' }, { label: 'Property Damage:', value: '$1 million' }, { label: 'Medical:', value: '$5,000' }, { label: 'Deductible:', value: '$0' }] },
];
const TOTAL_STEPS = 12;
const inputClass = 'w-full py-4 px-4 bg-card rounded-xl shadow-card focus:shadow-focus transition-all outline-none text-foreground placeholder:text-muted-foreground';
const selectClass = `${inputClass} appearance-none`;
const errorInputClass = 'border border-red-500 focus:shadow-none';
const primaryActionClass = 'mx-auto flex min-w-[180px] items-center justify-center rounded-full px-10 py-4 text-base font-semibold transition-all duration-300';
const zipRegex = /^\d{5}$/;
const nameCityRegex = /^[A-Za-z.' -]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RULES: Record<string, { digits: number; example: string }> = {
  '1': { digits: 10, example: '+11234567890' },
  '44': { digits: 10, example: '+441234567890' },
  '61': { digits: 9, example: '+61123456789' },
  '91': { digits: 10, example: '+911234567890' },
  '92': { digits: 10, example: '+921234567890' },
  '966': { digits: 9, example: '+966123456789' },
  '971': { digits: 9, example: '+971123456789' },
};

const GetQuote = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedType, setSelectedType] = useState(''); const [customType, setCustomType] = useState('');
  const [eventTimingType, setEventTimingType] = useState<'quick' | 'custom' | ''>(''); const [startDate, setStartDate] = useState(''); const [endDate, setEndDate] = useState('');
  const [eventState, setEventState] = useState(''); const [isPrivateResidence, setIsPrivateResidence] = useState<boolean | null>(null);
  const [alcoholType, setAlcoholType] = useState<'sold' | 'served' | 'byob' | 'none' | ''>(''); const [profitFromAlcohol, setProfitFromAlcohol] = useState<boolean | null>(null); const [ticketedEvent, setTicketedEvent] = useState<boolean | null>(null);
  const [guestCount, setGuestCount] = useState(''); const [hasActivities, setHasActivities] = useState<boolean | null>(null); const [customActivities, setCustomActivities] = useState('');
  const [waiverOfSubrogation, setWaiverOfSubrogation] = useState(false); const [primaryNonContributory, setPrimaryNonContributory] = useState(false); const [hiredNonOwnedAuto, setHiredNonOwnedAuto] = useState(false); const [additionalInsuredAmount, setAdditionalInsuredAmount] = useState('0');
  const [eventName, setEventName] = useState(''); const [eventDescription, setEventDescription] = useState(''); const [selectedPlan, setSelectedPlan] = useState('');
  const [insuredFirstName, setInsuredFirstName] = useState(''); const [insuredLastName, setInsuredLastName] = useState(''); const [insuredAddress, setInsuredAddress] = useState(''); const [insuredCity, setInsuredCity] = useState(''); const [insuredState, setInsuredState] = useState(''); const [insuredZip, setInsuredZip] = useState('');
  const [insuredTouched, setInsuredTouched] = useState<Record<string, boolean>>({});
  const [venueName, setVenueName] = useState(''); const [venueAddress, setVenueAddress] = useState(''); const [venueCity, setVenueCity] = useState(''); const [venueState, setVenueState] = useState(''); const [venueZip, setVenueZip] = useState(''); const [venueContactName, setVenueContactName] = useState(''); const [venueContactPhone, setVenueContactPhone] = useState(''); const [venueContactEmail, setVenueContactEmail] = useState('');
  const [venueTouched, setVenueTouched] = useState<Record<string, boolean>>({});
  const [quoteUserFirstName, setQuoteUserFirstName] = useState(''); const [quoteUserLastName, setQuoteUserLastName] = useState(''); const [quoteUserEmail, setQuoteUserEmail] = useState(''); const [quoteUserPhoneNumber, setQuoteUserPhoneNumber] = useState('');
  const [quoteTouched, setQuoteTouched] = useState<Record<string, boolean>>({});

  const getPhoneError = (value: string, required = false) => {
    const normalized = value.replace(/[\s()-]/g, '');

    if (!normalized) return required ? 'Phone number is required.' : '';
    if (!normalized.startsWith('+') || !/^\+\d+$/.test(normalized)) {
      return 'Use phone number with country code, for example +921234567890.';
    }

    const digits = normalized.slice(1);
    const matchedCode = Object.keys(PHONE_RULES)
      .sort((a, b) => b.length - a.length)
      .find((code) => digits.startsWith(code));

    if (!matchedCode) {
      return `Unsupported country code. Use one of: ${Object.keys(PHONE_RULES).map((code) => `+${code}`).join(', ')}.`;
    }

    const nationalNumber = digits.slice(matchedCode.length);
    const rule = PHONE_RULES[matchedCode];

    if (nationalNumber.length !== rule.digits) {
      return `For +${matchedCode}, number must have exactly ${rule.digits} digits after country code. Example: ${rule.example}`;
    }

    return '';
  };

  const getFieldError = (field: string) => {
    switch (field) {
      case 'insuredFirstName':
        if (!insuredFirstName.trim()) return 'The first name field is required.';
        return nameCityRegex.test(insuredFirstName.trim()) ? '' : 'The values may only contain letters, apostrophes, dashes and dot.';
      case 'insuredLastName':
        if (!insuredLastName.trim()) return 'The last name field is required.';
        return nameCityRegex.test(insuredLastName.trim()) ? '' : 'The values may only contain letters, apostrophes, dashes and dot.';
      case 'insuredAddress': return insuredAddress.trim() ? '' : 'Street address is required.';
      case 'insuredCity':
        if (!insuredCity.trim()) return 'City is required.';
        return nameCityRegex.test(insuredCity.trim()) ? '' : 'The values may only contain letters, apostrophes, dashes and dot.';
      case 'insuredState': return insuredState.trim() ? '' : 'State is required.';
      case 'insuredZip':
        if (!insuredZip.trim()) return 'Zip code is required.';
        return zipRegex.test(insuredZip.trim()) ? '' : 'Zip code must be at least 5 digits.';
      case 'venueName': return venueName.trim() ? '' : 'Venue name is required.';
      case 'venueAddress': return venueAddress.trim() ? '' : 'Street address is required.';
      case 'venueCity': return venueCity.trim() ? '' : 'Venue city is required.';
      case 'venueState': return venueState.trim() ? '' : 'State is required.';
      case 'venueZip':
        if (!venueZip.trim()) return 'Zip code is required.';
        return zipRegex.test(venueZip.trim()) ? '' : 'Zip code must be exactly 5 digits.';
      case 'venueContactEmail':
        if (!venueContactEmail.trim()) return '';
        return emailRegex.test(venueContactEmail.trim()) ? '' : 'Enter a valid email address.';
      case 'venueContactPhone':
        return getPhoneError(venueContactPhone, false);
      case 'quoteUserFirstName': return quoteUserFirstName.trim() ? '' : 'First name is required.';
      case 'quoteUserLastName': return quoteUserLastName.trim() ? '' : 'Last name is required.';
      case 'quoteUserEmail':
        if (!quoteUserEmail.trim()) return 'Email is required.';
        return emailRegex.test(quoteUserEmail.trim()) ? '' : 'Email must include @ and a valid domain.';
      case 'quoteUserPhoneNumber':
        return getPhoneError(quoteUserPhoneNumber, true);
      default: return '';
    }
  };

  const canProceed = () => {
    const venueRequirementsSelected = waiverOfSubrogation || primaryNonContributory || hiredNonOwnedAuto || Number(additionalInsuredAmount || 0) > 0;
    switch (step) {
      case 1: return selectedType !== '' || customType.trim().length >= 3;
      case 2: return eventTimingType === 'quick' ? startDate !== '' : eventTimingType === 'custom' ? startDate !== '' && endDate !== '' && new Date(startDate) <= new Date(endDate) : false;
      case 3: return eventState !== '' && isPrivateResidence !== null;
      case 4: return alcoholType === 'sold' ? profitFromAlcohol !== null : alcoholType === 'served' ? ticketedEvent !== null : alcoholType !== '';
      case 5: return guestCount !== '' && Number(guestCount) > 0;
      case 6: return hasActivities === null ? false : hasActivities ? customActivities.trim().length >= 3 : true;
      case 7: return additionalInsuredAmount !== '' && Number(additionalInsuredAmount) >= 0 ? true : !venueRequirementsSelected;
      case 8: return eventDescription.trim().length >= 5;
      case 9: return selectedPlan !== '';
      case 10: return ['insuredFirstName', 'insuredLastName', 'insuredAddress', 'insuredCity', 'insuredState', 'insuredZip'].every((field) => !getFieldError(field));
      case 11: return ['venueName', 'venueAddress', 'venueCity', 'venueState', 'venueZip', 'venueContactEmail', 'venueContactPhone'].every((field) => !getFieldError(field));
      case 12: return ['quoteUserFirstName', 'quoteUserLastName', 'quoteUserEmail', 'quoteUserPhoneNumber'].every((field) => !getFieldError(field));
      default: return false;
    }
  };

  const nextStep = () => { if (canProceed() && step < TOTAL_STEPS) setStep(step + 1); };
  const prevStep = () => { if (step > 1) setStep(step - 1); };
  const markInsuredTouched = (field: string) => setInsuredTouched((current) => ({ ...current, [field]: true }));
  const showInsuredError = (field: string) => insuredTouched[field] ? getFieldError(field) : '';
  const markVenueTouched = (field: string) => setVenueTouched((current) => ({ ...current, [field]: true }));
  const showVenueError = (field: string) => venueTouched[field] ? getFieldError(field) : '';
  const markQuoteTouched = (field: string) => setQuoteTouched((current) => ({ ...current, [field]: true }));
  const showQuoteError = (field: string) => quoteTouched[field] ? getFieldError(field) : '';
  const activityItems = !hasActivities ? [] : customActivities.split(',').map((item) => item.trim()).filter(Boolean);
  const slideVariants = { enter: { opacity: 0, x: 40 }, center: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -40 } };
  const submitQuote = async () => {
    const venueRequirementsSelected = waiverOfSubrogation || primaryNonContributory || hiredNonOwnedAuto || Number(additionalInsuredAmount || 0) > 0;
    const payload = {
      event_type: selectedType || 'Other',
      event_type_other: selectedType ? null : customType.trim(),
      event_timing_type: eventTimingType,
      event_date: startDate,
      event_end_date: endDate || startDate,
      event_state: eventState,
      is_private_residence: Boolean(isPrivateResidence),
      alcohol_type: alcoholType,
      profit_from_alcohol: alcoholType === 'sold' ? profitFromAlcohol : null,
      ticketed_event: alcoholType === 'served' ? ticketedEvent : null,
      guest_count: Number(guestCount),
      has_activities: Boolean(hasActivities),
      activities: activityItems,
      venue_requires_additional_insured: venueRequirementsSelected,
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
      const response = await fetch('http://127.0.0.1:8000/api/quote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.details ? JSON.stringify(data.details) : data?.error || 'Quote submission failed');
      alert('Quote submitted successfully.');
      navigate('/');
    } catch (error) {
      alert(`Quote submission failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickPick = (label: string, type: 'quick' | 'custom') => {
    const today = new Date();
    if (label === 'Today') {
      const value = today.toISOString().split('T')[0];
      setStartDate(value);
      setEndDate(value);
    } else if (label === 'Tomorrow') {
      const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1); const value = tomorrow.toISOString().split('T')[0]; setStartDate(value); setEndDate(value);
    } else {
      setStartDate(''); setEndDate('');
    }
    setEventTimingType(type);
    if (type === 'quick') {
      setTimeout(() => setStep((currentStep) => Math.min(currentStep + 1, TOTAL_STEPS)), 200);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="w-full px-6 sm:px-12 py-4 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-lg">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity"><Shield className="w-7 h-7 text-accent" /><span className="text-lg font-bold text-foreground tracking-tight">OneDayEvent</span></button>
      </nav>
      <div className="w-full h-1.5 bg-muted"><motion.div animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }} transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }} className="h-full bg-accent" style={{ boxShadow: '0 0 8px hsla(221, 83%, 53%, 0.4)' }} /></div>
      <main className="flex-1 flex items-start justify-center px-4 sm:px-6 py-8 sm:py-16">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div key={step} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="relative">
              {step > 1 && (
                <button
                  onClick={prevStep}
                  aria-label="Go back"
                  className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/90 text-xl font-semibold text-foreground shadow-sm transition-all hover:border-accent hover:text-accent"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
              )}
              {step === 1 && <div><StepHeader title="Hi, let's get your quote!" subtitle="What type of event do you need covered?" /><div className="mb-10 flex justify-center gap-4 sm:gap-10"><div className="flex h-20 w-20 rotate-[-12deg] items-center justify-center rounded-[2rem] bg-[#ffe6ec] text-[#ff6b6b] shadow-[0_18px_35px_rgba(255,107,107,0.15)] sm:h-24 sm:w-24"><PartyPopper className="h-10 w-10 sm:h-12 sm:w-12" /></div><div className="mt-2 flex h-20 w-20 items-center justify-center rounded-full bg-[#fff1d9] text-[#ff9f43] shadow-[0_18px_35px_rgba(255,159,67,0.18)] sm:h-24 sm:w-24"><Diamond className="h-10 w-10 sm:h-12 sm:w-12" /></div><div className="flex h-20 w-20 rotate-[10deg] items-center justify-center rounded-[1.75rem] bg-[#e8e8ff] text-[#5f59d6] shadow-[0_18px_35px_rgba(95,89,214,0.18)] sm:h-24 sm:w-24"><Music className="h-10 w-10 sm:h-12 sm:w-12" /></div></div><div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-3">{EVENT_TYPES.slice(0, 3).map((type) => { const isSelected = selectedType === type.id; return <motion.button key={type.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setSelectedType(type.id); setCustomType(''); setTimeout(() => setStep(2), 200); }} className={`rounded-2xl border px-6 py-5 text-center text-lg font-semibold transition-all duration-200 ${isSelected ? 'border-accent bg-accent/10 text-foreground shadow-card-active' : 'border-accent/70 bg-white/80 text-foreground hover:bg-accent/5 hover:shadow-card'}`}>{type.label}</motion.button>; })}</div><div className="relative mb-5"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" /><input type="text" placeholder="Type your event in here" value={customType} onChange={(e) => { setCustomType(e.target.value); setSelectedType(''); }} className="w-full rounded-2xl border border-border bg-white/90 py-5 pl-11 pr-4 text-lg text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground focus:border-accent focus:shadow-focus" /></div><p className="mb-12 text-center text-sm font-semibold text-foreground">Please type in your event if you do not see it in the dropdown</p></div>}
              {step === 2 && <div><StepHeader title="When is your event?" subtitle="Choose the date for your event" /><div className="mb-10 flex justify-center gap-4 sm:gap-10"><div className="flex h-20 w-20 rotate-[-10deg] items-center justify-center rounded-[1.75rem] bg-[#ffe6ec] text-[#ff6b6b] shadow-[0_18px_35px_rgba(255,107,107,0.15)] sm:h-24 sm:w-24"><PartyPopper className="h-10 w-10 sm:h-12 sm:w-12" /></div><div className="mt-2 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-[#79d1f4] via-[#7d7de8] to-[#6a4dd8] text-white shadow-[0_22px_40px_rgba(106,77,216,0.24)] sm:h-28 sm:w-28"><Calendar className="h-12 w-12 sm:h-14 sm:w-14" /></div><div className="flex h-20 w-20 rotate-[10deg] items-center justify-center rounded-[1.75rem] bg-[#e8f0ff] text-[#4a7de8] shadow-[0_18px_35px_rgba(74,125,232,0.15)] sm:h-24 sm:w-24"><Music className="h-10 w-10 sm:h-12 sm:w-12" /></div></div><div className="mx-auto max-w-xl"><div className="flex flex-col items-center justify-center gap-4 sm:flex-row">{[{ label: 'Today', type: 'quick' as const }, { label: 'Tomorrow', type: 'quick' as const }, { label: 'Other', type: 'custom' as const }].map(({ label, type }) => { const isSelected = eventTimingType === type && ((label === 'Today' && startDate === new Date().toISOString().split('T')[0]) || (label === 'Tomorrow' && startDate !== '' && startDate !== new Date().toISOString().split('T')[0]) || (label === 'Other' && type === 'custom')); return <button key={label} onClick={() => quickPick(label, type)} className={`min-w-[140px] rounded-2xl border px-8 py-4 text-lg font-semibold transition-all duration-200 ${label === 'Today' && isSelected ? 'border-primary bg-primary text-primary-foreground shadow-button' : isSelected ? 'border-accent bg-accent/10 text-foreground shadow-card-active' : 'border-accent/70 bg-white/90 text-foreground hover:bg-accent/5 hover:shadow-card'}`}>{label}</button>; })}</div>{eventTimingType === 'custom' && <div className="mx-auto mt-8 max-w-md"><label className="mb-3 block text-center text-sm font-semibold text-foreground">Select your event date</label><div className="relative"><Calendar className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" /><input type="date" value={startDate} onChange={(e) => { setStartDate(e.target.value); setEndDate(e.target.value); }} min={new Date().toISOString().split('T')[0]} className="w-full rounded-2xl border border-border bg-white/90 py-4 pl-12 pr-4 text-base text-foreground shadow-sm outline-none transition-all focus:border-accent focus:shadow-focus" /></div></div>}</div></div>}
              {step === 3 && <div><StepHeader title="What state is the event in?" subtitle="Choose the state for your event" /><div className="mb-10 flex justify-center"><div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-gradient-to-br from-[#ffd08a] via-[#ffb85c] to-[#ff9f43] text-white shadow-[0_22px_40px_rgba(255,159,67,0.24)]"><MapPinned className="h-14 w-14" /></div></div><div className="mx-auto max-w-xl space-y-8"><div className="relative"><select value={eventState} onChange={(e) => { const selectedValue = e.target.value; setEventState(selectedValue); setIsPrivateResidence(selectedValue ? false : null); }} className="w-full appearance-none rounded-2xl border border-[#7ec2ff] bg-white/95 py-5 pl-6 pr-14 text-lg font-semibold text-foreground shadow-[0_12px_25px_rgba(126,194,255,0.2)] outline-none transition-all focus:border-accent focus:shadow-focus"><option value="">Select State</option>{US_STATES.map((state) => <option key={state} value={state}>{state}</option>)}</select><ChevronDown className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground" /></div>{eventState && <div><p className="mb-5 text-center text-2xl font-semibold text-foreground">Is the event held at a private residence?</p><div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">{[true, false].map((value) => <button key={String(value)} onClick={() => setIsPrivateResidence(value)} className={`flex-1 rounded-2xl border px-8 py-4 text-lg font-semibold transition-all duration-200 ${isPrivateResidence === value ? value ? 'border-accent bg-accent/10 text-foreground shadow-card-active' : 'border-primary bg-primary text-primary-foreground shadow-button' : 'border-accent/70 bg-white/90 text-foreground hover:bg-accent/5 hover:shadow-card'}`}>{value ? 'Yes' : 'No'}</button>)}</div></div>}</div></div>}
              {step === 4 && <div><StepHeader title="Alcohol at the event will be" subtitle="Choose how alcohol will be handled" /><div className="mb-10 flex justify-center"><div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-gradient-to-br from-[#ffe0d6] via-[#ffb6a3] to-[#ff7b73] text-[#b3283d] shadow-[0_22px_40px_rgba(255,123,115,0.24)]"><Wine className="h-14 w-14" /></div></div><div className="mx-auto max-w-3xl space-y-8"><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{[{ val: 'sold', label: 'Sold' }, { val: 'served', label: 'Served' }, { val: 'byob', label: 'B.Y.O.B' }, { val: 'none', label: 'No Alcohol' }].map(({ val, label }) => <button key={val} onClick={() => { setAlcoholType(val as 'sold' | 'served' | 'byob' | 'none'); setProfitFromAlcohol(null); setTicketedEvent(null); }} className={`flex items-center overflow-hidden rounded-2xl border text-left transition-all duration-200 ${alcoholType === val ? 'border-primary bg-primary text-primary-foreground shadow-button' : 'border-accent/70 bg-white/90 text-foreground hover:bg-accent/5 hover:shadow-card'}`}><span className={`flex h-full min-h-[62px] w-12 items-center justify-center border-r ${alcoholType === val ? 'border-white/20 bg-black/5' : 'border-accent/30 bg-white'}`}><CircleAlert className="h-5 w-5" /></span><span className="flex-1 px-5 py-4 text-lg font-semibold">{label}</span></button>)}</div>{alcoholType === 'sold' && <div className="mx-auto max-w-md space-y-4 text-center"><div className="flex flex-col gap-4 sm:flex-row">{[true, false].map((value) => <button key={String(value)} onClick={() => setProfitFromAlcohol(value)} className={`flex-1 rounded-2xl border px-8 py-4 text-lg font-semibold transition-all duration-200 ${profitFromAlcohol === value ? value ? 'border-accent bg-accent/10 text-foreground shadow-card-active' : 'border-primary bg-primary text-primary-foreground shadow-button' : 'border-accent/70 bg-white/90 text-foreground hover:bg-accent/5 hover:shadow-card'}`}>{value ? 'Yes' : 'No'}</button>)}</div><p className="text-xl font-semibold text-foreground">Did you make profit from alcohol sales?</p><p className="text-sm font-medium text-foreground">If you think there might be liquor, click "served" just to be safe!</p></div>}{alcoholType === 'served' && <div className="mx-auto max-w-md space-y-4 text-center"><div className="flex flex-col gap-4 sm:flex-row">{[true, false].map((value) => <button key={String(value)} onClick={() => setTicketedEvent(value)} className={`flex-1 rounded-2xl border px-8 py-4 text-lg font-semibold transition-all duration-200 ${ticketedEvent === value ? value ? 'border-accent bg-accent/10 text-foreground shadow-card-active' : 'border-primary bg-primary text-primary-foreground shadow-button' : 'border-accent/70 bg-white/90 text-foreground hover:bg-accent/5 hover:shadow-card'}`}>{value ? 'Yes' : 'No'}</button>)}</div><p className="text-xl font-semibold text-foreground">Is the event ticketed?</p><p className="text-sm font-medium text-foreground">If you think there might be liquor, click "served" just to be safe!</p></div>}{(alcoholType === 'byob' || alcoholType === 'none') && <div className="mx-auto max-w-md text-center"><p className="text-sm font-medium text-foreground">If you think there might be liquor, click "served" just to be safe!</p></div>}</div></div>}
              {step === 5 && <div><StepHeader title="How many guests will be attending?" subtitle="Add the highest number you expect at the event" /><div className="mb-10 flex justify-center"><div className="flex h-28 w-28 rotate-[-12deg] items-center justify-center rounded-[2rem] bg-gradient-to-br from-[#ffe7d6] via-[#ffc98f] to-[#ff9f43] text-[#d64646] shadow-[0_22px_40px_rgba(255,159,67,0.24)]"><MailOpen className="h-14 w-14" /></div></div><div className="mx-auto max-w-xl"><input type="number" min="1" placeholder="Guests" value={guestCount} onChange={(e) => setGuestCount(e.target.value)} className="w-full rounded-2xl border border-[#7ec2ff] bg-white/95 px-6 py-5 text-lg font-medium text-foreground shadow-[0_12px_25px_rgba(126,194,255,0.2)] outline-none transition-all placeholder:text-foreground/70 focus:border-accent focus:shadow-focus" /><p className="mx-auto mt-5 max-w-lg text-center text-base font-medium leading-8 text-foreground">Put the greatest number of attendees you think will attend if you are unsure so there are no holdups if a claim arises</p></div></div>}
              {step === 6 && <div><StepHeader title="Will your event include" subtitle="any special activities?" /><div className="mb-10 flex justify-center"><div className="relative flex h-32 w-64 items-center justify-center"><div className="absolute left-10 top-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#8c73ef] text-white shadow-[0_18px_35px_rgba(140,115,239,0.24)]"><Sparkles className="h-10 w-10" /></div><div className="absolute left-24 top-1 flex h-24 w-24 items-center justify-center rounded-full bg-[#ffbf5f] text-white shadow-[0_18px_35px_rgba(255,191,95,0.24)]"><PartyPopper className="h-10 w-10" /></div><div className="absolute left-40 top-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#ff7aa8] text-white shadow-[0_18px_35px_rgba(255,122,168,0.24)]"><Tent className="h-10 w-10" /></div></div></div><div className="mx-auto max-w-2xl"><p className="mb-10 text-center text-xl font-medium leading-10 text-foreground">Stunts, Pyrotechnics, Aircrafts, Animals, Camping/Overnight Stays, Car Races, Precision Driving, Mechanical Devices, Rap/Hip-Hop, Rock/Metal, Rides, Water Activities, Bounce Houses or Inflatables</p><div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">{[true, false].map((value) => <button key={String(value)} onClick={() => { setHasActivities(value); if (!value) setTimeout(() => setStep(7), 200); }} className={`flex-1 rounded-2xl border px-8 py-4 text-lg font-semibold transition-all duration-200 ${hasActivities === value ? value ? 'border-accent bg-accent/10 text-foreground shadow-card-active' : 'border-primary bg-primary text-primary-foreground shadow-button' : 'border-accent/70 bg-white/90 text-foreground hover:bg-accent/5 hover:shadow-card'}`}>{value ? 'Yes' : 'No'}</button>)}</div>{hasActivities && <div className="mx-auto mt-8 max-w-xl"><textarea value={customActivities} onChange={(e) => setCustomActivities(e.target.value)} rows={4} placeholder="Describe the activities. Separate multiple items with commas." className="w-full resize-none rounded-2xl border border-[#7ec2ff] bg-white/95 px-6 py-5 text-base text-foreground shadow-[0_12px_25px_rgba(126,194,255,0.2)] outline-none transition-all placeholder:text-muted-foreground focus:border-accent focus:shadow-focus" /></div>}</div></div>}
              {step === 7 && <div><StepHeader title="Does your venue require any of these?" subtitle="Only select the items your venue specifically requires" /><div className="mx-auto max-w-2xl space-y-8">{[{ label: 'Waiver of Subrogation', value: waiverOfSubrogation, setter: setWaiverOfSubrogation }, { label: 'Primary/Non-contributory Basis', value: primaryNonContributory, setter: setPrimaryNonContributory }, { label: 'Hired/Non-owned Auto', value: hiredNonOwnedAuto, setter: setHiredNonOwnedAuto }].map(({ label, value, setter }, index) => <div key={label} className="space-y-4"><p className="text-2xl font-semibold text-foreground">{label} <CircleAlert className="inline-block h-5 w-5 align-middle" /></p><div className="flex flex-col gap-4 sm:flex-row">{[true, false].map((option) => <button key={String(option)} onClick={() => setter(option)} className={`flex-1 rounded-2xl border px-8 py-4 text-lg font-semibold transition-all duration-200 ${value === option ? option ? 'border-accent bg-accent/10 text-foreground shadow-card-active' : 'border-primary bg-primary text-primary-foreground shadow-button' : 'border-accent/70 bg-white/90 text-foreground hover:bg-accent/5 hover:shadow-card'}`}>{option ? 'Yes' : 'No'}</button>)}</div>{index === 2 && hiredNonOwnedAuto && <p className="text-base font-medium leading-7 text-foreground">Hired/Non-owned Auto Warning: Non-Owned/Hired Auto is subject to approval and will affect your quote & premium. If this is required, select Yes</p>}</div>)}<div className="space-y-4"><p className="text-2xl font-semibold text-foreground">Additional Insured <CircleAlert className="inline-block h-5 w-5 align-middle" /></p><input type="number" min="0" value={additionalInsuredAmount} onChange={(e) => setAdditionalInsuredAmount(e.target.value)} className="w-full rounded-2xl border border-border bg-white/95 px-6 py-5 text-lg font-medium text-foreground shadow-sm outline-none transition-all placeholder:text-foreground/70 focus:border-accent focus:shadow-focus" /></div><p className="mx-auto max-w-xl text-center text-base font-medium leading-8 text-foreground">Only select these if you or your venue requires them, usually they are not needed.</p></div></div>}
              {step === 8 && <div><StepHeader title="Provide event details" subtitle="" /><div className="mb-10 flex justify-center"><div className="relative flex h-40 w-full max-w-md items-center justify-center"><div className="absolute left-2 top-10 flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-[#ffe7ea] text-[#ef4444] shadow-[0_18px_35px_rgba(239,68,68,0.16)]"><ClipboardCheck className="h-10 w-10" /></div><div className="relative z-10 flex h-28 w-24 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-[#cfe6ff] via-[#7fb7ff] to-[#4b83ea] text-white shadow-[0_20px_40px_rgba(75,131,234,0.25)]"><MonitorSmartphone className="h-12 w-12" /></div><div className="absolute right-4 top-12 flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-[#efe7ff] text-[#7c3aed] shadow-[0_18px_35px_rgba(124,58,237,0.16)]"><MapPinCheckInside className="h-10 w-10" /></div></div></div><div className="space-y-4 max-w-xl mx-auto"><input type="text" placeholder="Event Name (optional)" value={eventName} onChange={(e) => setEventName(e.target.value)} className="w-full rounded-2xl border border-border bg-white/95 px-6 py-5 text-lg font-medium text-foreground shadow-sm outline-none transition-all placeholder:text-foreground focus:border-accent focus:shadow-focus" /><textarea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} rows={5} placeholder="Enter details here" className="w-full resize-none rounded-2xl border border-[#7ec2ff] bg-white/95 px-6 py-5 text-lg text-foreground shadow-[0_12px_25px_rgba(126,194,255,0.2)] outline-none transition-all placeholder:text-foreground focus:border-accent focus:shadow-focus" /></div></div>}
              {step === 9 && <div><StepHeader title="Select your limits of coverage:" subtitle="" /><div className="mx-auto mb-10 hidden max-w-5xl grid-cols-9 gap-2 sm:grid">{Array.from({ length: 9 }).map((_, index) => <div key={index} className="h-2 rounded-full bg-primary" />)}</div><div className="mx-auto grid max-w-[1260px] grid-cols-1 gap-3 rounded-[2rem] lg:grid-cols-4">{PLAN_OPTIONS.map((plan) => <button key={plan.id} onClick={() => setSelectedPlan(plan.id)} className={`relative flex h-full min-w-0 flex-col overflow-hidden rounded-[2rem] bg-white text-left shadow-[0_12px_35px_rgba(15,23,42,0.12)] transition-all duration-200 ${selectedPlan === plan.id ? 'scale-[1.01]' : 'hover:bg-slate-50/40'} ${plan.recommended ? 'z-10 lg:-my-8 lg:shadow-[0_18px_40px_rgba(15,23,42,0.16)]' : ''}`}>{plan.recommended && <div className="bg-primary px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide text-primary-foreground">Recommended</div>}<div className="flex flex-1 flex-col p-4"><div className={`mb-4 rounded-xl px-2 py-4 text-center text-[0.95rem] font-semibold whitespace-nowrap ${plan.accent}`}>{plan.limit}</div>{plan.recommended && <div className="mb-3 text-center text-lg font-medium text-primary">BEST PLAN</div>}<div className="space-y-0 text-[13px] text-foreground">{plan.stats.map((item) => <div key={item.label} className="flex min-w-0 items-center justify-between gap-2 border-b border-border/80 py-2"><span className="min-w-0 whitespace-nowrap">{item.label}</span><span className="shrink-0 whitespace-nowrap">{item.value}</span></div>)}</div><div className={`mt-5 rounded-xl px-4 py-4 text-center ${plan.accent}`}><div className="text-lg uppercase tracking-wide">Price</div><div className="text-5xl font-semibold leading-none">{plan.price}</div></div><div className={`mt-5 rounded-full border px-6 py-3 text-center text-base font-medium transition-all ${plan.recommended ? 'border-primary bg-primary text-primary-foreground' : plan.outline}`}>Buy Now</div></div></button>)}</div></div>}
              {step === 10 && <div><StepHeader title="What is the name & address of the insured?" subtitle="" /><div className="mx-auto max-w-2xl"><div className="grid gap-5 sm:grid-cols-2"><div><input value={insuredFirstName} onChange={(e) => setInsuredFirstName(e.target.value)} onBlur={() => markInsuredTouched('insuredFirstName')} placeholder="First Name" className={`w-full rounded-2xl border px-5 py-4 text-base text-foreground shadow-sm outline-none transition-all ${showInsuredError('insuredFirstName') ? 'border-red-500' : 'border-border bg-white/95 focus:border-accent focus:shadow-focus'}`} />{showInsuredError('insuredFirstName') && <p className="mt-1 text-sm text-red-500">{showInsuredError('insuredFirstName')}</p>}</div><div><input value={insuredLastName} onChange={(e) => setInsuredLastName(e.target.value)} onBlur={() => markInsuredTouched('insuredLastName')} placeholder="Last Name" className={`w-full rounded-2xl border px-5 py-4 text-base text-foreground shadow-sm outline-none transition-all ${showInsuredError('insuredLastName') ? 'border-red-500' : 'border-border bg-white/95 focus:border-accent focus:shadow-focus'}`} />{showInsuredError('insuredLastName') && <p className="mt-1 text-sm text-red-500">{showInsuredError('insuredLastName')}</p>}</div><div><input value={insuredAddress} onChange={(e) => setInsuredAddress(e.target.value)} onBlur={() => markInsuredTouched('insuredAddress')} placeholder="Street Address" className={`w-full rounded-2xl border px-5 py-4 text-base text-foreground shadow-sm outline-none transition-all ${showInsuredError('insuredAddress') ? 'border-red-500' : 'border-border bg-white/95 focus:border-accent focus:shadow-focus'}`} />{showInsuredError('insuredAddress') && <p className="mt-1 text-sm text-red-500">{showInsuredError('insuredAddress')}</p>}</div><div><input value={insuredCity} onChange={(e) => setInsuredCity(e.target.value)} onBlur={() => markInsuredTouched('insuredCity')} placeholder="City" className={`w-full rounded-2xl border px-5 py-4 text-base text-foreground shadow-sm outline-none transition-all ${showInsuredError('insuredCity') ? 'border-red-500' : 'border-border bg-white/95 focus:border-accent focus:shadow-focus'}`} />{showInsuredError('insuredCity') && <p className="mt-1 text-sm text-red-500">{showInsuredError('insuredCity')}</p>}</div><div><select value={insuredState} onChange={(e) => setInsuredState(e.target.value)} onBlur={() => markInsuredTouched('insuredState')} className={`w-full appearance-none rounded-2xl border bg-white/95 px-5 py-4 text-base text-foreground shadow-sm outline-none transition-all ${showInsuredError('insuredState') ? 'border-red-500' : 'border-border focus:border-accent focus:shadow-focus'}`}><option value="">Select State</option>{US_STATES.map((state) => <option key={state} value={state}>{state}</option>)}</select>{showInsuredError('insuredState') && <p className="mt-1 text-sm text-red-500">{showInsuredError('insuredState')}</p>}</div><div><input value={insuredZip} onChange={(e) => setInsuredZip(e.target.value.replace(/\D/g, '').slice(0, 5))} onBlur={() => markInsuredTouched('insuredZip')} placeholder="Zip" maxLength={5} className={`w-full rounded-2xl border px-5 py-4 text-base text-foreground shadow-sm outline-none transition-all ${showInsuredError('insuredZip') ? 'border-red-500' : 'border-border bg-white/95 focus:border-accent focus:shadow-focus'}`} />{showInsuredError('insuredZip') && <p className="mt-1 text-sm text-red-500">{showInsuredError('insuredZip')}</p>}</div></div><p className="mx-auto mt-4 max-w-xl text-center text-base font-medium leading-8 text-foreground">This is the person or organization that needs to be insured, usually the host of the event.</p></div></div>}
              {step === 11 && <div><StepHeader title="What is the event name & venue details?" subtitle="" /><div className="mx-auto max-w-2xl"><div className="grid gap-4 sm:grid-cols-2"><div><input value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="Event Name" className="w-full rounded-2xl border border-border bg-white/95 px-5 py-4 text-base text-foreground shadow-sm outline-none transition-all placeholder:text-foreground focus:border-accent focus:shadow-focus" /></div><div><input value={venueName} onChange={(e) => setVenueName(e.target.value)} onBlur={() => markVenueTouched('venueName')} placeholder="Venue Name" className={`w-full rounded-2xl border px-5 py-4 text-base text-foreground shadow-sm outline-none transition-all ${showVenueError('venueName') ? 'border-red-500' : 'border-border bg-white/95 focus:border-accent focus:shadow-focus'}`} />{showVenueError('venueName') && <p className="mt-1 text-sm text-red-500">{showVenueError('venueName')}</p>}</div><div><input value={venueAddress} onChange={(e) => setVenueAddress(e.target.value)} onBlur={() => markVenueTouched('venueAddress')} placeholder="Street Address" className={`w-full rounded-2xl border px-5 py-4 text-base text-foreground shadow-sm outline-none transition-all ${showVenueError('venueAddress') ? 'border-red-500' : 'border-border bg-white/95 focus:border-accent focus:shadow-focus'}`} />{showVenueError('venueAddress') && <p className="mt-1 text-sm text-red-500">{showVenueError('venueAddress')}</p>}</div><div><input value={venueCity} onChange={(e) => setVenueCity(e.target.value)} onBlur={() => markVenueTouched('venueCity')} placeholder="Venue City" className={`w-full rounded-2xl border px-5 py-4 text-base text-foreground shadow-sm outline-none transition-all ${showVenueError('venueCity') ? 'border-red-500' : 'border-border bg-white/95 focus:border-accent focus:shadow-focus'}`} />{showVenueError('venueCity') && <p className="mt-1 text-sm text-red-500">{showVenueError('venueCity')}</p>}</div><div><select value={venueState} onChange={(e) => setVenueState(e.target.value)} onBlur={() => markVenueTouched('venueState')} className={`w-full appearance-none rounded-2xl border bg-white/95 px-5 py-4 text-base text-foreground shadow-sm outline-none transition-all ${showVenueError('venueState') ? 'border-red-500' : 'border-border focus:border-accent focus:shadow-focus'}`}><option value="">Select State</option>{US_STATES.map((state) => <option key={state} value={state}>{state}</option>)}</select>{showVenueError('venueState') && <p className="mt-1 text-sm text-red-500">{showVenueError('venueState')}</p>}</div><div><input value={venueZip} onChange={(e) => setVenueZip(e.target.value.replace(/\D/g, '').slice(0, 5))} onBlur={() => markVenueTouched('venueZip')} placeholder="Zip" maxLength={5} className={`w-full rounded-2xl border px-5 py-4 text-base text-foreground shadow-sm outline-none transition-all ${showVenueError('venueZip') ? 'border-red-500' : 'border-border bg-white/95 focus:border-accent focus:shadow-focus'}`} />{showVenueError('venueZip') && <p className="mt-1 text-sm text-red-500">{showVenueError('venueZip')}</p>}</div><div><input value={venueContactName} onChange={(e) => setVenueContactName(e.target.value)} placeholder="Name of Venue Contact (optional)" className="w-full rounded-2xl border border-border bg-white/95 px-5 py-4 text-base text-foreground shadow-sm outline-none transition-all placeholder:text-foreground focus:border-accent focus:shadow-focus" /></div><div><input value={venueContactPhone} onChange={(e) => setVenueContactPhone(e.target.value)} onBlur={() => markVenueTouched('venueContactPhone')} placeholder="Venue's Number (optional)" className={`w-full rounded-2xl border px-5 py-4 text-base text-foreground shadow-sm outline-none transition-all ${showVenueError('venueContactPhone') ? 'border-red-500' : 'border-border bg-white/95 focus:border-accent focus:shadow-focus'}`} />{showVenueError('venueContactPhone') && <p className="mt-1 text-sm text-red-500">{showVenueError('venueContactPhone')}</p>}</div><div className="sm:col-span-2"><input value={venueContactEmail} onChange={(e) => setVenueContactEmail(e.target.value)} onBlur={() => markVenueTouched('venueContactEmail')} placeholder="Venue Contact's Email (optional)" className={`w-full rounded-2xl border px-5 py-4 text-base text-foreground shadow-sm outline-none transition-all ${showVenueError('venueContactEmail') ? 'border-red-500' : 'border-border bg-white/95 focus:border-accent focus:shadow-focus'}`} />{showVenueError('venueContactEmail') && <p className="mt-1 text-sm text-red-500">{showVenueError('venueContactEmail')}</p>}</div></div><p className="mx-auto mt-4 max-w-xl text-center text-base font-medium leading-8 text-foreground">If you provide us the information of your contact at the venue, we send them your Certificate directly!</p></div></div>}
              {step === 12 && <div><StepHeader title="What is your best contact information?" subtitle="" /><div className="mx-auto max-w-2xl"><div className="mb-10 flex justify-center"><div className="relative flex h-40 w-full max-w-md items-center justify-center"><div className="absolute inset-x-10 top-4 flex h-28 items-center justify-center rounded-[2rem] bg-gradient-to-br from-[#cfe2ff] via-[#91b7ff] to-[#4a7de8] text-white shadow-[0_22px_40px_rgba(74,125,232,0.24)]"><ReceiptText className="h-16 w-16" /></div><div className="absolute -left-1 top-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ffe7ea] text-[#ef4444] shadow-[0_18px_35px_rgba(239,68,68,0.16)]"><ClipboardCheck className="h-8 w-8" /></div><div className="absolute -right-1 top-12 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#efe7ff] text-[#7c3aed] shadow-[0_18px_35px_rgba(124,58,237,0.16)]"><Shield className="h-8 w-8" /></div></div></div><div className="grid gap-4 sm:grid-cols-2"><div><input value={quoteUserFirstName} onChange={(e) => setQuoteUserFirstName(e.target.value)} onBlur={() => markQuoteTouched('quoteUserFirstName')} placeholder="First Name" className={`w-full rounded-2xl border px-5 py-4 text-base text-foreground shadow-sm outline-none transition-all ${showQuoteError('quoteUserFirstName') ? 'border-red-500' : 'border-border bg-white/95 focus:border-accent focus:shadow-focus'}`} />{showQuoteError('quoteUserFirstName') && <p className="mt-1 text-sm text-red-500">{showQuoteError('quoteUserFirstName')}</p>}</div><div><input value={quoteUserLastName} onChange={(e) => setQuoteUserLastName(e.target.value)} onBlur={() => markQuoteTouched('quoteUserLastName')} placeholder="Last Name" className={`w-full rounded-2xl border px-5 py-4 text-base text-foreground shadow-sm outline-none transition-all ${showQuoteError('quoteUserLastName') ? 'border-red-500' : 'border-border bg-white/95 focus:border-accent focus:shadow-focus'}`} />{showQuoteError('quoteUserLastName') && <p className="mt-1 text-sm text-red-500">{showQuoteError('quoteUserLastName')}</p>}</div><div><input value={quoteUserEmail} onChange={(e) => setQuoteUserEmail(e.target.value)} onBlur={() => markQuoteTouched('quoteUserEmail')} placeholder="Email" className={`w-full rounded-2xl border px-5 py-4 text-base text-foreground shadow-sm outline-none transition-all ${showQuoteError('quoteUserEmail') ? 'border-red-500' : 'border-border bg-white/95 focus:border-accent focus:shadow-focus'}`} />{showQuoteError('quoteUserEmail') && <p className="mt-1 text-sm text-red-500">{showQuoteError('quoteUserEmail')}</p>}</div><div><input value={quoteUserPhoneNumber} onChange={(e) => setQuoteUserPhoneNumber(e.target.value)} onBlur={() => markQuoteTouched('quoteUserPhoneNumber')} placeholder="Phone Number" className={`w-full rounded-2xl border px-5 py-4 text-base text-foreground shadow-sm outline-none transition-all ${showQuoteError('quoteUserPhoneNumber') ? 'border-red-500' : 'border-border bg-white/95 focus:border-accent focus:shadow-focus'}`} />{showQuoteError('quoteUserPhoneNumber') && <p className="mt-1 text-sm text-red-500">{showQuoteError('quoteUserPhoneNumber')}</p>}</div></div></div></div>}

              <div className="mt-10 max-w-2xl mx-auto">
                <motion.button whileHover={canProceed() ? { scale: 1.02 } : {}} whileTap={canProceed() ? { scale: 0.98 } : {}} disabled={!canProceed() || isSubmitting} onClick={async () => { if (step === TOTAL_STEPS) await submitQuote(); else nextStep(); }} className={`${primaryActionClass} ${!canProceed() || isSubmitting ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-primary text-primary-foreground shadow-button hover:shadow-button-hover hover:bg-accent'}`}><span>{step === TOTAL_STEPS ? (isSubmitting ? 'Finishing...' : 'Finish') : 'Next'}</span>{step !== TOTAL_STEPS && <ArrowRight className="ml-2 h-4 w-4" />}</motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <div className="fixed -bottom-32 -left-32 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed -top-32 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};

const StepHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <header className="mb-8 text-center">
    <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight leading-snug">{title} <br /><span className="text-muted-foreground">{subtitle}</span></h2>
  </header>
);

export default GetQuote;
