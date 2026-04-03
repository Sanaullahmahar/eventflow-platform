import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FinalCTA = () => (
  <section id="quote" className="relative overflow-hidden bg-brand-gradient py-24">
    <div className="pointer-events-none absolute -left-40 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-accent-cyan/20 blur-3xl" />
    <div className="pointer-events-none absolute -right-40 top-0 h-80 w-80 rounded-full bg-accent-lime/10 blur-3xl" />

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="container relative z-10 mx-auto px-4 text-center lg:px-8"
    >
      <h2 className="mx-auto max-w-2xl text-3xl font-extrabold text-primary-foreground md:text-5xl">
        Find new ways to elevate your event
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
        From ticketing and promotion to sponsorship, event insurance, and attendee engagement — everything you need to create unforgettable experiences.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          to="/get-quote"
          className="rounded-full bg-accent-cyan px-8 py-3.5 text-sm font-bold text-foreground shadow-lg transition-transform hover:scale-105"
        >
          Get Quote
        </Link>
        <a
          href="#discover"
          className="rounded-full border-2 border-primary-foreground/40 px-8 py-3.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
        >
          Discover Events
        </a>
      </div>
    </motion.div>
  </section>
);

export default FinalCTA;
