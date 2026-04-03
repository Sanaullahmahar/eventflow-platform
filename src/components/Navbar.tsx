import { useState } from "react";
import { Menu, X, LayoutGrid } from "lucide-react";
import { navLinks } from "@/data/siteData";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-primary-deep shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <a href="#" className="text-2xl font-extrabold tracking-tight text-primary-foreground lg:text-3xl">
          events<span className="text-accent-lime">.com</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/40"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#quote"
            className="ml-2 rounded-full bg-accent-lime px-5 py-2 text-sm font-bold text-foreground transition-transform hover:scale-105"
          >
            Get Quote
          </a>
        </div>

        {/* Right side */}
        <div className="hidden items-center gap-3 lg:flex">
          <a href="#" className="text-sm font-semibold text-accent-lime transition-colors hover:text-accent-cyan">
            Log in
          </a>
          <button className="rounded-lg p-2 text-primary-foreground transition-colors hover:bg-primary/40" aria-label="Menu grid">
            <LayoutGrid size={20} />
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="rounded-lg p-2 text-primary-foreground lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-primary/30 bg-primary-deep lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-lg px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/40"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#quote"
                className="mt-2 rounded-full bg-accent-lime px-5 py-3 text-center text-sm font-bold text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                Get Quote
              </a>
              <a
                href="#"
                className="mt-1 text-center text-sm font-semibold text-accent-lime"
                onClick={() => setMobileOpen(false)}
              >
                Log in
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
