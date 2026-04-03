import { useState, useRef, useEffect } from "react";
import { Menu, X, LayoutGrid, Settings, Target, Award, Zap, BarChart3, Monitor, CalendarDays, ChevronDown } from "lucide-react";
import { navLinks } from "@/data/siteData";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const dropdownItems = [
  { label: "Sell", subtitle: "Sales Management Tools", icon: Settings },
  { label: "Promote", subtitle: "Digital Marketing Management Tools", icon: Target },
  { label: "Sponsor", subtitle: "Sponsorship Management Tools", icon: Award },
  { label: "Execute", subtitle: "Event Execution Tools", icon: Zap },
  { label: "Insights", subtitle: "Data Management Tools", icon: BarChart3 },
  { label: "Virtual", subtitle: "Virtual Event Tools", icon: Monitor },
  { label: "Calendar", subtitle: "Calendar Management Tools", icon: CalendarDays },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

          {/* Get Quote Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="ml-1 flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/40"
            >
              Get Quote
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 top-full mt-2 w-72 overflow-hidden rounded-2xl bg-primary shadow-2xl ring-1 ring-primary-foreground/10"
                >
                  <div className="py-2">
                    {dropdownItems.map((item) => (
                      <Link
                        key={item.label}
                        to="/get-quote"
                        className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-primary-foreground/10"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <item.icon size={20} className="flex-shrink-0 text-accent-cyan" />
                        <div>
                          <span className="block text-sm font-bold text-primary-foreground">
                            Events.com <span className="font-bold">{item.label}</span>
                          </span>
                          <span className="block text-xs text-primary-foreground/60">{item.subtitle}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
              {/* Mobile dropdown items */}
              <div className="mt-2 border-t border-primary-foreground/10 pt-2">
                <span className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground/50">
                  Get Quote
                </span>
                {dropdownItems.map((item) => (
                  <Link
                    key={item.label}
                    to="/get-quote"
                    className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-primary/40"
                    onClick={() => setMobileOpen(false)}
                  >
                    <item.icon size={18} className="text-accent-cyan" />
                    <span className="text-sm font-semibold text-primary-foreground">
                      Events.com {item.label}
                    </span>
                  </Link>
                ))}
              </div>
              <a
                href="#"
                className="mt-2 text-center text-sm font-semibold text-accent-lime"
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
