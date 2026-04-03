import { MapPin } from "lucide-react";
import { featuredEvents } from "@/data/siteData";
import { motion } from "framer-motion";

import eventSummit from "@/assets/event-summit.jpg";
import eventBeer from "@/assets/event-beer.jpg";
import eventCars from "@/assets/event-cars.jpg";
import eventFood from "@/assets/event-food.jpg";
import eventStartup from "@/assets/event-startup.jpg";
import heroEvent from "@/assets/hero-event.jpg";

const imageMap: Record<string, string> = {
  "event-summit": eventSummit,
  "event-beer": eventBeer,
  "event-cars": eventCars,
  "event-food": eventFood,
  "event-startup": eventStartup,
  "hero-event": heroEvent,
};

const FeaturedEvents = () => (
  <section className="bg-card py-20">
    <div className="container mx-auto px-4 lg:px-8">
      <h2 className="mb-12 text-center text-3xl font-extrabold text-primary md:text-4xl">
        Featured events
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredEvents.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="group overflow-hidden rounded-2xl bg-card shadow-md transition-shadow hover:shadow-xl"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={imageMap[event.image]}
                alt={event.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <p className="text-sm font-semibold text-accent-cyan">{event.date}</p>
              <h3 className="mt-1 text-lg font-bold text-foreground">{event.title}</h3>
              <div className="mt-3 flex items-center justify-between">
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin size={14} /> {event.location}
                </span>
                <button className="rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground transition-transform hover:scale-105">
                  Let's go
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href="#"
          className="inline-flex rounded-full border-2 border-primary px-8 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          View more events
        </a>
      </div>
    </div>
  </section>
);

export default FeaturedEvents;
