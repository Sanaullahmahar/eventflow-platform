import { useState } from "react";
import { toolCategories } from "@/shared/config/siteContent";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ToolsSection = () => {
  const [activeId, setActiveId] = useState("sell");
  const active = toolCategories.find((t) => t.id === activeId)!;

  return (
    <section className="bg-card py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="mb-12 text-3xl font-extrabold text-primary md:text-4xl">
          Our Tools
        </h2>

        {/* Dashboard mockup */}
        <div className="mb-12 overflow-hidden rounded-2xl bg-foreground/95 p-6 shadow-2xl">
          <div className="flex gap-2 mb-4">
            <div className="h-3 w-3 rounded-full bg-destructive/60" />
            <div className="h-3 w-3 rounded-full bg-accent-lime/60" />
            <div className="h-3 w-3 rounded-full bg-accent-cyan/60" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-card/10 p-4">
              <p className="text-xs text-muted-foreground/60">Total Registrations</p>
              <p className="mt-1 text-2xl font-bold text-accent-cyan">2,847</p>
            </div>
            <div className="rounded-lg bg-card/10 p-4">
              <p className="text-xs text-muted-foreground/60">Revenue</p>
              <p className="mt-1 text-2xl font-bold text-accent-lime">$142,680</p>
            </div>
            <div className="rounded-lg bg-card/10 p-4">
              <p className="text-xs text-muted-foreground/60">Sponsors</p>
              <p className="mt-1 text-2xl font-bold text-primary-foreground">18</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {toolCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveId(cat.id)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                activeId === cat.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-muted-foreground hover:bg-border"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="border-t-4 border-primary pt-6">
              <h3 className="text-2xl font-extrabold text-primary">{active.title}</h3>
              <p className="mt-3 max-w-xl text-muted-foreground leading-relaxed">
                {active.description}
              </p>
              <a
                href="#"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-cyan hover:underline"
              >
                Learn more <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ToolsSection;
