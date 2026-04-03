import { motion } from "framer-motion";
import heroImg from "@/assets/hero-event.jpg";

const HeroSection = () => (
  <section className="relative overflow-hidden bg-brand-gradient">
    {/* Orbital decorative circles */}
    <div className="pointer-events-none absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full border border-primary-foreground/10" />
    <div className="pointer-events-none absolute -right-16 top-0 h-[480px] w-[480px] rounded-full border border-primary-foreground/5" />
    <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent-cyan/10 blur-3xl" />

    <div className="container mx-auto grid min-h-[560px] items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
      {/* Left */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl font-extrabold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
          Your event.{" "}
          <span className="text-gradient-brand">Let's make it happen.</span>
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-primary-foreground/80">
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

      {/* Right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative flex justify-center"
      >
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          <img
            src={heroImg}
            alt="Vibrant concert event with excited crowd"
            width={1024}
            height={768}
            className="h-auto max-h-[420px] w-full object-cover lg:max-h-[480px]"
          />
        </div>
      </motion.div>
    </div>

    {/* Bottom product pills */}
    <div className="bg-primary/60 backdrop-blur-sm">
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
