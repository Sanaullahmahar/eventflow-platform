import { supportCards } from "@/data/siteData";
import { motion } from "framer-motion";
import { HelpCircle, Phone, Mail, BookOpen } from "lucide-react";

const icons = [HelpCircle, Phone, Mail, BookOpen];

const colorMap = {
  cyan: "bg-accent-cyan/10 border-accent-cyan/30",
  lime: "bg-accent-lime/10 border-accent-lime/30",
  blue: "bg-primary/10 border-primary/30",
};

const SupportSection = () => (
  <section className="bg-secondary py-20">
    <div className="container mx-auto px-4 lg:px-8">
      <h2 className="mb-12 text-center text-3xl font-extrabold text-foreground md:text-4xl">
        We're here to help when you need it
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {supportCards.map((card, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`rounded-2xl border p-6 transition-shadow hover:shadow-lg ${colorMap[card.color]}`}
            >
              <Icon size={28} className="mb-4 text-primary" />
              <h3 className="text-lg font-bold text-foreground">{card.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{card.description}</p>
              <a
                href="#"
                className="mt-4 inline-block text-sm font-semibold text-accent-cyan hover:underline"
              >
                {card.cta} →
              </a>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default SupportSection;
