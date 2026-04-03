import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="bg-brand-gradient py-20">
      <div className="container mx-auto grid items-center gap-12 px-4 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 inline-block text-4xl">☀️</div>
          <h2 className="text-3xl font-extrabold text-primary-foreground md:text-4xl">
            Where the world finds events.
          </h2>
          <p className="mt-4 max-w-md text-primary-foreground/80">
            Join the waitlist for the new Events.com App — the future of event discovery.
          </p>

          <div className="mt-8 max-w-md rounded-2xl bg-primary/40 p-6 backdrop-blur-sm">
            {submitted ? (
              <p className="text-center font-semibold text-accent-lime">
                🎉 You're on the list! We'll be in touch.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block text-sm font-semibold text-primary-foreground">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="Email*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border-0 bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-accent-cyan px-6 py-3 text-sm font-bold text-foreground transition-transform hover:scale-105"
                >
                  <Send size={16} />
                  Request Invite
                </button>
              </form>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative flex justify-center"
        >
          {/* Decorative circle */}
          <div className="absolute -right-8 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent-cyan/30" />
          <div className="relative z-10 flex gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 w-36 rounded-2xl bg-foreground/90 shadow-2xl md:h-80 md:w-44"
                style={{
                  transform: `rotate(${(i - 2) * 5}deg)`,
                }}
              >
                <div className="flex h-full flex-col items-center justify-center gap-2 p-3">
                  <div className="h-3 w-3 rounded-full bg-accent-cyan" />
                  <div className="h-2 w-16 rounded bg-muted-foreground/30" />
                  <div className="mt-2 h-20 w-full rounded-lg bg-muted-foreground/20" />
                  <div className="h-2 w-12 rounded bg-muted-foreground/30" />
                  <div className="h-2 w-20 rounded bg-muted-foreground/20" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WaitlistSection;
