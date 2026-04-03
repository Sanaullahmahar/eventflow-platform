import { testimonials } from "@/data/siteData";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TestimonialsSection = () => (
  <section className="bg-card py-20">
    <div className="container mx-auto px-4 lg:px-8">
      <h2 className="mb-12 text-center text-3xl font-extrabold text-foreground md:text-4xl">
        Why event organizers keep coming back
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
          >
            <Quote size={24} className="mb-3 text-accent-cyan" />
            <p className="text-sm leading-relaxed text-muted-foreground">"{t.quote}"</p>
            <div className="mt-5 border-t border-border pt-4">
              <p className="font-bold text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
