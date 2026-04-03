import { motion } from "framer-motion";
import { Search } from "lucide-react";

const DiscoverSection = () => (
  <section id="discover" className="bg-brand-gradient py-20">
    <div className="container mx-auto px-4 text-center lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="mx-auto max-w-2xl text-3xl font-extrabold text-primary-foreground md:text-4xl">
          Events.com Discover
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
          Discover the best events happening near you. Whether you're looking for concerts, festivals, conferences, or sports events, our global event discovery tool has you covered. Easily search by category, location, and date.
        </p>

        {/* Search mockup */}
        <div className="mx-auto mt-8 flex max-w-lg items-center gap-2 rounded-full bg-card/10 px-5 py-3 backdrop-blur-sm">
          <Search size={18} className="text-primary-foreground/60" />
          <span className="text-sm text-primary-foreground/60">Search events by city, category, or keyword...</span>
        </div>

        <a
          href="#"
          className="mt-8 inline-flex rounded-full border-2 border-primary-foreground/40 px-8 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
        >
          Discover events
        </a>
      </motion.div>
    </div>
  </section>
);

export default DiscoverSection;
