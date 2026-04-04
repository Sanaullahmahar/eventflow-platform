import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import singerImg from "@/assets/singer-event.jpg";
import { AppRoutes } from "@/shared/routing/AppRoutes";

const ServicesSection = () => (
  <section className="bg-card py-20">
    <div className="container mx-auto grid items-center gap-12 px-4 lg:grid-cols-2 lg:px-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-2 text-sm font-bold text-primary">
          <span className="border-b-2 border-accent-lime pb-0.5">Events.com</span>{" "}
          <span className="font-normal text-muted-foreground">Live</span>
        </p>
        <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
          End-to-end event services
        </h2>
        <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
          We create unforgettable experiences that captivate attendees and leave a lasting impact. Drawing on over 30 years of experience, we deliver innovative marketing, acquire top talent, and produce world-class events to bring your vision to life.
        </p>
        <Link
          to={AppRoutes.GET_QUOTE}
          className="mt-6 inline-flex rounded-full bg-accent-cyan px-8 py-3 text-sm font-bold text-foreground transition-transform hover:scale-105"
        >
          Get Quote
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex justify-center"
      >
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-accent-cyan/20 blur-xl" />
          <img
            src={singerImg}
            alt="Live event performance"
            loading="lazy"
            width={640}
            height={768}
            className="relative z-10 h-80 w-80 rounded-full object-cover shadow-2xl lg:h-96 lg:w-96"
          />
        </div>
      </motion.div>
    </div>
  </section>
);

export default ServicesSection;
