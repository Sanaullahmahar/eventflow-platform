import { calendarCategories } from "@/data/siteData";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CalendarsSection = () => (
  <section className="bg-brand-gradient py-20">
    <div className="container mx-auto px-4 text-center lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-extrabold text-primary-foreground md:text-4xl">
          Featured Calendars
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
          Discover curated calendars tailored to your interests. Effortlessly search by category to find events that inspire, entertain, and engage.
        </p>
      </motion.div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {calendarCategories.map((cat) => (
          <button
            key={cat}
            className="group inline-flex items-center gap-2 rounded-full border-2 border-accent-lime px-5 py-2.5 text-sm font-semibold text-accent-lime transition-all hover:bg-accent-lime hover:text-foreground"
          >
            {cat}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        ))}
      </div>
    </div>
  </section>
);

export default CalendarsSection;
