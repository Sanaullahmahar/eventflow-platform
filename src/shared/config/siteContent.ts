import { FooterColumn } from "@/shared/config/models/FooterColumn";
import { NavigationItem } from "@/shared/config/models/NavigationItem";
import { AppRoutes } from "@/shared/routing/AppRoutes";

export const navLinks = [
  new NavigationItem("My Tickets", "#"),
  new NavigationItem("Events Insurance", AppRoutes.EVENTS_INSURANCE),
  new NavigationItem("Discover Events", "/#discover"),
  new NavigationItem("Virtual Events", "#"),
] as const;

export const featuredEvents = [
  {
    id: 1,
    image: "event-summit",
    date: "Thursday 23-26 April",
    title: "Summit At Sea 2026",
    location: "Miami, FL",
    tags: ["Conference"],
  },
  {
    id: 2,
    image: "event-beer",
    date: "Friday 22-23 May",
    title: "Great Alaska Craft Beer Festival",
    location: "Haines, AK",
    tags: ["Festival"],
  },
  {
    id: 3,
    image: "event-cars",
    date: "Friday 24-26 April",
    title: "La Jolla Concours d'Elegance",
    location: "La Jolla, CA",
    tags: ["Culture", "Cars"],
  },
  {
    id: 4,
    image: "event-food",
    date: "Saturday 10-12 May",
    title: "International Food Expo 2026",
    location: "Chicago, IL",
    tags: ["Food", "Expo"],
  },
  {
    id: 5,
    image: "event-startup",
    date: "Monday 5-7 June",
    title: "TechStart Summit 2026",
    location: "San Francisco, CA",
    tags: ["Tech", "Startup"],
  },
  {
    id: 6,
    image: "hero-event",
    date: "Saturday 14-15 June",
    title: "Neon Lights Music Festival",
    location: "Austin, TX",
    tags: ["Music", "Festival"],
  },
] as const;

export const toolCategories = [
  {
    id: "sell",
    title: "Sell",
    description:
      "Sell more tickets, save more time, make more money. Sell and manage tickets, registrations, and merchandise with add-ons like attendee ticket insurance, transfers, and upgrades.",
  },
  {
    id: "promote",
    title: "Promote",
    description:
      "Promote your event, expand your reach, and boost attendance with digital marketing services, including calendar listings, social media ads, and more.",
  },
  {
    id: "sponsor",
    title: "Sponsor",
    description:
      "Engage, manage, and lock down mission-aligned sponsors. Create sponsorship proposals, agreements, and activation calendars in minutes.",
  },
  {
    id: "execute",
    title: "Execute",
    description:
      "Manage events effortlessly, before, during, and after, with on-site check-in, real-time analytics, and world-class customer support.",
  },
  {
    id: "insights",
    title: "Insights",
    description:
      "Get the data you need, instantly. Our reporting tools generate custom reports and insights, helping you make smarter, faster event decisions.",
  },
  {
    id: "virtual",
    title: "Virtual",
    description:
      "Boost engagement, grow attendance, and build connections with immersive virtual and hybrid experiences featuring interactive tools and real-time networking.",
  },
] as const;

export const integrations = [
  "Stripe",
  "Zapier",
  "Google Analytics",
  "Mailchimp",
  "HubSpot",
  "Salesforce",
] as const;

export const calendarCategories = [
  "Mountain Biking",
  "Music Festivals",
  "Car Shows",
  "Food Festivals",
  "Comedy Shows",
  "Motor Sport",
  "Art & Design",
  "Tech Conferences",
] as const;

export const testimonials = [
  {
    id: 1,
    quote:
      "Events.com transformed how we manage registrations. The check-in process is seamless, and the analytics dashboard gives us real-time visibility into every metric that matters.",
    name: "Sarah Chen",
    role: "Director of Events, TechConf Global",
    company: "TechConf Global",
  },
  {
    id: 2,
    quote:
      "The sponsorship management tools alone saved us hundreds of hours. We grew sponsor revenue by 40% in our first year on the platform.",
    name: "Marcus Williams",
    role: "VP of Partnerships, FestivalPro",
    company: "FestivalPro",
  },
  {
    id: 3,
    quote:
      "From ticketing to post-event insights, everything just works. Our attendee satisfaction scores have never been higher since switching to Events.com.",
    name: "Emily Rodriguez",
    role: "Head of Operations, CultureFest",
    company: "CultureFest",
  },
] as const;

export const supportCards = [
  {
    title: "Help Center",
    description: "Find answers and step-by-step resources for any question.",
    cta: "Browse articles",
    color: "cyan" as const,
  },
  {
    title: "Call Us",
    description: "Talk to our event support team directly.",
    cta: "Get in touch",
    color: "lime" as const,
  },
  {
    title: "Email Us",
    description: "Reach us directly for help and inquiries.",
    cta: "Send email",
    color: "blue" as const,
  },
  {
    title: "Our Blog",
    description: "Tips and best practices for successful events.",
    cta: "Read now",
    color: "cyan" as const,
  },
] as const;

export const footerColumns = [
  new FooterColumn("Organizer", [
    "Sell",
    "Promote",
    "Sponsor",
    "Execute",
    "Insights",
    "Virtual",
    "Pricing",
  ]),
  new FooterColumn("Event Goer", ["Discover Events", "My Tickets", "Event Insurance"]),
  new FooterColumn("Partner", [
    "Calendar",
    "Referral Program",
    "Trusted Partners",
    "Become a Sponsor",
  ]),
  new FooterColumn("Resources", [
    "Contact Support",
    "Help Center",
    "Blog",
    "eBooks",
    "AI Event Tools",
    "Brand Guide",
  ]),
  new FooterColumn("Company", ["About Us", "Press", "Investor Relations", "Careers"]),
] as const;
