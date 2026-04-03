import { integrations } from "@/data/siteData";
import { motion } from "framer-motion";

const IntegrationsSection = () => (
  <section className="bg-brand-gradient py-16">
    <div className="container mx-auto px-4 text-center lg:px-8">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-10 text-2xl font-extrabold text-primary-foreground md:text-3xl"
      >
        Integrations with tools you already use
      </motion.h2>
      <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-14">
        {integrations.map((name) => (
          <span
            key={name}
            className="text-lg font-bold text-primary-foreground/80 transition-colors hover:text-primary-foreground md:text-xl"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default IntegrationsSection;
