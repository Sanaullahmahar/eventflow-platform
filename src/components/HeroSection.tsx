import { motion } from "framer-motion";
import heroImg from "@/assets/hero-event.jpg";

const HeroSection = () => (
  <section className="relative overflow-hidden">
    {/* Full-width background image */}
    <div className="absolute inset-0">
      <img
        src={heroImg}
        alt="Vibrant concert event with excited crowd"
        className="h-full w-full object-cover"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-deep/90 via-primary/70 to-primary/30" />
    </div>

    {/* Orbital decorative circles */}
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/4 -translate-y-1/2 rounded-full border border-primary-foreground/10" />
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/4 -translate-y-1/2 rounded-full border border-primary-foreground/5" />
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/4 -translate-y-1/2 rounded-full border border-primary-foreground/5" />

    {/* Content */}
    <div className="relative z-10 container mx-auto flex min-h-[520px] flex-col justify-center px-4 py-20 lg:min-h-[580px] lg:px-8 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl"
      >
        <h1 className="text-4xl font-extrabold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
          Your event.{" "}
          <span className="text-gradient-brand">Let's make it happen.</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-primary-foreground/80">
          Empowering event creators through every stage of the journey — sell tickets, promote events, engage sponsors, insure your event, and discover experiences worldwide.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#quote"
            className="inline-flex items-center rounded-full bg-accent-cyan px-8 py-3.5 text-sm font-bold text-foreground shadow-lg transition-transform hover:scale-105"
          >
            Get Quote
          </a>
          <a
            href="#discover"
            className="inline-flex items-center rounded-full border-2 border-primary-foreground/40 px-8 py-3.5 text-sm font-bold text-primary-foreground transition-colors hover:border-primary-foreground hover:bg-primary-foreground/10"
          >
            Discover Events
          </a>
        </div>
      </motion.div>
    </div>

    {/* Bottom product pills */}
    <div className="relative z-10 bg-primary/60 backdrop-blur-sm">
      <div className="container mx-auto flex gap-4 overflow-x-auto px-4 py-4 lg:justify-center lg:px-8">
        {["Insights", "Virtual", "Sell", "Promote", "Sponsor"].map((tool) => (
          <span
            key={tool}
            className="flex-shrink-0 rounded-full bg-primary-foreground/10 px-5 py-2 text-sm font-semibold text-primary-foreground backdrop-blur-sm"
          >
            Events.com <span className="font-bold">{tool}</span>
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default HeroSection;
