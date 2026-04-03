import { footerColumns } from "@/data/siteData";
import { Send } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-primary-deep pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
          {Object.entries(footerColumns).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-primary-foreground">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-primary-foreground">
              Newsletter
            </h4>
            <p className="mb-3 text-xs text-primary-foreground/60">
              Stay up to date with the latest event industry news.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-primary/40 px-3 py-2 text-xs text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent-cyan"
              />
              <button className="rounded-lg bg-accent-cyan p-2 text-foreground transition-transform hover:scale-105" aria-label="Subscribe">
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary/30 pt-6 md:flex-row">
          <p className="text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Events.com. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Terms", "Privacy", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-primary-foreground/50 hover:text-primary-foreground"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
