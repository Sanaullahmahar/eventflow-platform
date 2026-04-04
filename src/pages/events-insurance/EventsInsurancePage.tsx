import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeDollarSign,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  FileText,
  HeartHandshake,
  Music2,
  PartyPopper,
  ShieldCheck,
  Star,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/shared/components/layout/Footer";
import Navbar from "@/shared/components/navigation/Navbar";
import { AppRoutes } from "@/shared/routing/AppRoutes";
import heroEvent from "@/assets/hero-event.jpg";
import eventBeer from "@/assets/event-beer.jpg";
import eventCars from "@/assets/event-cars.jpg";
import eventFood from "@/assets/event-food.jpg";
import eventSummit from "@/assets/event-summit.jpg";
import eventStartup from "@/assets/event-startup.jpg";

const benefits = [
  {
    title: "Quick & easy quote process",
    description:
      "Tell us about your event, checkout online, and receive your certificate in minutes.",
    icon: FileText,
  },
  {
    title: "In house claims team",
    description:
      "Our Claims Advocacy Team ensures a smooth and easy claims process when you need it.",
    icon: ShieldCheck,
  },
  {
    title: "Best Price Guaranteed!",
    description:
      "We compare top rated carriers and match the best policy to your event details.",
    icon: BadgeDollarSign,
  },
];

const faqs = [
  {
    question: "What is special event insurance?",
    answer:
      "Special event insurance, also called one day event insurance, is a liability policy for claims by third parties. It helps cover injuries, property damage, and related legal costs for weddings, parties, concerts, trade shows, and festivals.",
  },
  {
    question: "What does special event insurance cover?",
    answer:
      "Coverage can include bodily injury, property damage, and personal or advertising injury claims from third parties. You can also choose additional options based on venue requirements and event type.",
  },
  {
    question: "How do I get my certificate of insurance?",
    answer:
      "Once you complete your quote and purchase, your certificate is available instantly in your customer portal. You can download, share, and send COIs directly from there at any time.",
  },
];

const partners = [
  { label: "Vendor", icon: Building2 },
  { label: "Brokers", icon: BriefcaseBusiness },
  { label: "Event Planners", icon: Users },
  { label: "Others", icon: PartyPopper },
];

const testimonials = [
  {
    id: 0,
    name: "Marcel Toorians",
    icon: PartyPopper,
    accentIcon: null,
    accentBg: "bg-pink-100",
    avatarBg: "from-pink-400 to-fuchsia-500",
    shortText:
      "The process was simple and fast. I got covered before our big retirement party and had full confidence on event day.",
    fullText:
      "I do not know what I would have done without One Day Event considering the problems I ended up having. If they had not helped me set up insurance for my dad's retirement party, I would have had a lot of trouble.",
  },
  {
    id: 1,
    name: "Francesca Alea",
    icon: UserRound,
    accentIcon: null,
    accentBg: "bg-indigo-100",
    avatarBg: "from-cyan-400 to-blue-500",
    shortText:
      "I bought event insurance for my wedding role. Everything was clear, affordable, and easy to manage from the portal.",
    fullText:
      "I was so grateful to find this company when I took on the role as maid of honor for my sister's wedding. Having the security helped put her mind at ease, and she was able to focus on the happiest day of her life.",
  },
  {
    id: 2,
    name: "Liz Niccum",
    icon: PartyPopper,
    accentIcon: null,
    accentBg: "bg-amber-100",
    avatarBg: "from-amber-400 to-orange-500",
    shortText:
      "The team helped me find a policy quickly for a one day event. Great service and pricing.",
    fullText:
      "I am so grateful I found One Day Event Insurance online to help me obtain liability insurance for a single day event I organized in my town. The company was very prompt in offering me an affordable price and support.",
  },
  {
    id: 3,
    name: "Natalie Wheeler",
    icon: Music2,
    accentIcon: null,
    accentBg: "bg-violet-100",
    avatarBg: "from-violet-400 to-purple-500",
    shortText:
      "I had limited knowledge about event insurance and needed a lot of help determining what kind of coverage I needed and how to get it quickly.",
    fullText:
      "I had limited knowledge about event insurance and needed a lot of help determining what kind of coverage I needed and how to get it quickly. The representatives at One Day Event were so incredibly helpful and guided me through each option.",
  },
];

const contentCards = [
  {
    title: "What is wedding insurance",
    excerpt:
      "Planning your dream day takes time. Wedding insurance helps protect your investment from unexpected situations.",
    image: eventCars,
    byline: "By One Day Event",
    date: "Nov 26, 2020",
  },
  {
    title: "What Is Special Event Insurance?",
    excerpt:
      "Special event liability insurance can save you thousands if unexpected incidents happen during your event.",
    image: eventSummit,
    byline: "By One Day Event",
    date: "June 10, 2020",
  },
  {
    title: "10 Tips for Buying Special Event Insurance",
    excerpt:
      "Buying event insurance for the first time can feel overwhelming. Use this checklist to choose the right policy.",
    image: eventFood,
    byline: "By One Day Event",
    date: "Nov 26, 2020",
  },
];

const EventsInsurance = () => {
  const [openFaq, setOpenFaq] = useState(-1);
  const [activeReviewSlide, setActiveReviewSlide] = useState(0);
  const [selectedReview, setSelectedReview] = useState<(typeof testimonials)[number] | null>(null);
  const rotatingTypes = ["Birthday", "Wedding", "Party"];
  const [activeTypeIndex, setActiveTypeIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveTypeIndex((prev) => (prev + 1) % rotatingTypes.length);
    }, 2200);

    return () => clearInterval(intervalId);
  }, [rotatingTypes.length]);

  const handleReviewSlideSelect = (index: number) => {
    if (index === activeReviewSlide) return;
    setActiveReviewSlide(index);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden bg-brand-gradient text-primary-foreground">
        <div className="absolute -left-24 top-12 h-64 w-64 rounded-full bg-accent-cyan/20 blur-3xl" />
        <div className="absolute -right-16 top-28 h-72 w-72 rounded-full bg-accent-lime/10 blur-3xl" />
        <div className="container mx-auto grid gap-10 px-4 py-16 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-sm font-semibold">
              <ShieldCheck size={18} className="text-accent-cyan" />
              Events.com Insurance
            </div>
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              <span className="inline-flex items-baseline gap-3">
                <span className="inline-grid h-[1.05em] overflow-hidden align-bottom">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingTypes[activeTypeIndex]}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    className="col-start-1 row-start-1 inline-block text-gradient-brand"
                  >
                    {rotatingTypes[activeTypeIndex]}
                  </motion.span>
                </AnimatePresence>
                </span>
                <span>Event</span>
              </span>
              <br />
              Insurance
            </h1>
            <p className="text-xl font-medium text-primary-foreground/90">
              Get a quote. Buy your plan. Enjoy the event!
            </p>
            <p className="max-w-xl text-lg text-primary-foreground/85">
              Special event insurance made simple for one-day and multi-day celebrations with fast
              policy setup and reliable support.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to={AppRoutes.GET_QUOTE}
                className="inline-flex items-center rounded-full bg-accent-cyan px-7 py-3 font-bold text-foreground transition-transform hover:scale-105 hover:bg-accent-cyan/90"
              >
                Get Quote
              </Link>
              <a
                href="#faq"
                className="inline-flex items-center rounded-full border border-primary-foreground/40 px-7 py-3 font-semibold text-primary-foreground hover:bg-primary-foreground/10"
              >
                Explore FAQ
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="relative"
          >
            <div className="aspect-[5/4] overflow-hidden rounded-[2.5rem] border border-primary-foreground/20 shadow-2xl">
              <img
                src={heroEvent}
                alt="Crowd enjoying a high-energy event with stage lights"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-fit rounded-2xl bg-primary-foreground/10 p-4 backdrop-blur">
              <p className="text-sm font-semibold text-primary-foreground/90">Guaranteed Satisfaction</p>
              <div className="mt-1 flex items-center gap-1 text-accent-lime">
                <span className="text-2xl font-extrabold">5.0</span>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={17} fill="currentColor" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 lg:px-8 lg:py-20">
        <h2 className="text-center text-3xl font-bold text-primary-deep md:text-4xl">
          Why choose One Day Event?
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {benefits.map((benefit, i) => (
            <motion.article
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-3xl bg-card p-7 shadow-lg ring-1 ring-primary/10"
            >
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent-cyan/15 text-primary">
                <benefit.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold text-primary-deep">{benefit.title}</h3>
              <p className="mt-2 text-muted-foreground">{benefit.description}</p>
            </motion.article>
          ))}
        </div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="mt-8 grid items-center gap-6 rounded-3xl bg-card p-8 shadow-xl ring-1 ring-primary/10 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div>
            <h3 className="text-3xl font-bold text-primary-deep">Customer Portal</h3>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Get access to all of your policy details and documents 24/7 in your Customer Portal.
              File claims, send your COI, and add additional insureds at any time.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <img
              src={eventBeer}
              alt="People celebrating at a festival"
              className="h-56 w-full object-cover lg:h-64"
            />
          </div>
        </motion.article>
      </section>

      <section id="faq" className="bg-card">
        <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-20">
          <h2 className="text-center text-3xl font-bold text-primary-deep md:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto mt-10 max-w-4xl space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = index === openFaq;
              return (
                <article
                  key={faq.question}
                  className="rounded-2xl border border-primary/15 bg-background shadow-sm"
                >
                  <button
                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg font-semibold text-primary-deep">{faq.question}</span>
                    <ChevronDown
                      size={20}
                      className={`text-primary transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-primary/10 px-5 pb-5 pt-4 text-muted-foreground">
                      {faq.answer}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 lg:px-8 lg:py-20">
        <h2 className="text-center text-3xl font-bold text-primary-deep md:text-4xl">
          Partner with One Day Event & start making money!
        </h2>
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((partner) => (
            <article
              key={partner.label}
              className="rounded-2xl bg-card p-6 text-center shadow-md transition-transform hover:-translate-y-1"
            >
              <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent-cyan/15 text-primary">
                <partner.icon size={26} />
              </div>
              <h3 className="mt-4 text-xl font-bold text-primary-deep">{partner.label}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-primary-deep/5">
        <div className="container mx-auto grid gap-8 px-4 py-16 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-20">
          <div className="relative overflow-hidden rounded-3xl bg-brand-gradient p-8">
            <img
              src={eventStartup}
              alt="Crowd enjoying a high-energy live event"
              className="h-72 w-full rounded-2xl object-cover opacity-85"
            />
            <div className="absolute left-4 top-4 rounded-full bg-card/85 p-3 text-primary">
              <HeartHandshake size={22} />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary-deep md:text-4xl">Giving Back</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We work with 4 different organizations to support causes locally and globally, and
              we are 100% paperless. Customers can donate $1 from each purchase to selected
              charities, so even a small event can make a real impact.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-primary">
              {["Yours Humanly", "Aware", "Gift of Adoption", "Kids Around the World"].map((org) => (
                <span key={org} className="rounded-full bg-primary/10 px-4 py-2">
                  {org}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#ececef]">
        <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-20">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#1f2a4a] md:text-5xl">
            Guaranteed Satisfaction
          </h2>
          <div className="mt-5 flex items-center justify-center gap-1.5">
            <span className="mr-2 text-4xl font-extrabold leading-none text-[#e62939] md:text-5xl">5.0</span>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={26} className="fill-yellow-300 text-[#f43136]" strokeWidth={1.8} />
            ))}
          </div>
          <div className="mx-auto mt-12 max-w-[1500px] overflow-x-hidden overflow-y-visible px-2 pt-12">
            <motion.div
              animate={{ x: `-${(activeReviewSlide * 100) / 3}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex items-stretch"
            >
              {[...testimonials, ...testimonials.slice(0, 2)].map((item, idx) => {
                const Icon = item.icon;
                const AccentIcon = item.accentIcon;
                const slideOffset = idx % 3;
                const isCenter = slideOffset === 1;
                return (
                  <div key={`${item.id}-${idx}`} className="w-full shrink-0 px-4 md:w-1/3">
                    <article
                      className={`group relative h-full rounded-[28px] border border-[#dbe0ea] bg-[#f6f7f9] p-6 pt-10 shadow-[0_8px_20px_rgba(31,42,74,0.06)] transition-all duration-300 ${
                        isCenter ? "min-h-[315px]" : "min-h-[300px]"
                      }`}
                    >
                      <div className="absolute -top-10 left-1/2 inline-flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-[#f1f3f8] bg-white shadow-[0_8px_18px_rgba(31,42,74,0.14)]">
                        <span
                          className={`inline-flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gradient-to-br text-white ${item.avatarBg}`}
                        >
                          <Icon size={28} strokeWidth={2.2} />
                        </span>
                        {AccentIcon && (
                          <span
                            className={`absolute -left-1 -top-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-primary shadow ${item.accentBg}`}
                          >
                            <AccentIcon size={12} />
                          </span>
                        )}
                      </div>
                      <div className="mt-2 flex items-start justify-between gap-3">
                        <h3 className="text-[2.15rem] font-bold leading-[1.1] text-[#1f2a4a]">{item.name}</h3>
                        <div className="mt-1 flex gap-1">
                          {[...Array(5)].map((_, starIdx) => (
                            <Star
                              key={starIdx}
                              size={17}
                              className="fill-yellow-300 text-[#f43136]"
                              strokeWidth={1.8}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-4 text-[1.15rem] leading-[1.5] text-[#7b8395]">{item.shortText}</p>
                      <button
                        onClick={() => setSelectedReview(item)}
                        className="mt-5 text-[1.05rem] font-medium text-[#2ea7e6] transition-colors hover:text-[#1888c8]"
                      >
                        Read More
                      </button>
                    </article>
                  </div>
                );
              })}
            </motion.div>
          </div>
          <div className="mt-10 flex justify-center gap-4">
            {testimonials.map((item, i) => (
              <button
                key={`dot-${item.id}`}
                onClick={() => handleReviewSlideSelect(i)}
                aria-label={`Show testimonial set ${i + 1}`}
                className={`h-4 w-4 rounded-full transition-colors ${
                  activeReviewSlide === i ? "bg-[#3f434b]" : "bg-[#bfc2c9]"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-primary-deep/50 px-4"
            onClick={() => setSelectedReview(null)}
          >
            <motion.article
              initial={{ y: 22, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 18, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl rounded-3xl bg-card p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedReview(null)}
                className="absolute right-5 top-5 rounded-full p-2 text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close testimonial"
              >
                <X size={22} />
              </button>
              <div
                className="absolute -top-8 left-1/2 inline-flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-white shadow-xl"
              >
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br text-white ${selectedReview.avatarBg}`}
                >
                  <selectedReview.icon size={24} />
                </span>
              </div>
              <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-3xl font-bold text-primary-deep">{selectedReview.name}</h3>
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={20} fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="mt-4 text-lg leading-relaxed text-foreground/85">{selectedReview.fullText}</p>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="bg-card">
        <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-20">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-3xl font-bold text-primary-deep md:text-4xl">Event Insurance Content</h2>
            <a
              href="#"
              className="rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              See More
            </a>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {contentCards.map((card) => (
              <article
                key={card.title}
                className="overflow-hidden rounded-2xl bg-background shadow-md ring-1 ring-primary/10"
              >
                <img src={card.image} alt={card.title} className="h-44 w-full object-cover" />
                <div className="p-5">
                  <h3 className="text-2xl font-bold leading-tight text-primary-deep">{card.title}</h3>
                  <p className="mt-3 text-muted-foreground">{card.excerpt}</p>
                  <p className="mt-4 text-sm font-semibold text-primary-deep">{card.byline}</p>
                  <p className="text-xs text-muted-foreground">{card.date}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="quote" className="container mx-auto px-4 py-16 lg:px-8 lg:py-20">
        <div className="rounded-3xl bg-brand-gradient p-8 text-center text-primary-foreground md:p-12">
          <h2 className="text-3xl font-bold md:text-4xl">Have questions?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/85">
            Our top notch sales team is here to help you get the right policy and answer all your
            questions. Give us a call, send us an email, or browse our FAQ and definitions.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="#"
              className="rounded-full bg-accent-cyan px-7 py-3 font-bold text-foreground transition-transform hover:scale-105"
            >
              Contact Us
            </a>
            <a
              href="#faq"
              className="rounded-full border border-primary-foreground/50 px-7 py-3 font-semibold text-primary-foreground hover:bg-primary-foreground/10"
            >
              FAQ & Definitions
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventsInsurance;
