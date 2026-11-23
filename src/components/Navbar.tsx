import React, { useEffect, useState } from "react";
import { Lock, Menu, Moon, Sun, X } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useSite } from "../context/SiteContext";
import { scrollToId } from "../lib/scroll";

const LINKS: [string, string][] = [
  ["About", "about"],
  ["What I do", "services"],
  ["Case studies", "cases"],
  ["Clients", "clients"],
  ["Experience", "experience"],
  ["Contact", "contact"],
];

export default function Navbar() {
  const { theme, setTheme } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink/85 backdrop-blur-xl border-b border-line"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between">
        <a
          href="#top"
          data-testid="nav-logo"
          onClick={(e) => go(e, "top")}
          className="flex items-center gap-2.5 group"
        >
          <span className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center font-display font-800 text-white text-sm font-bold tracking-tight group-hover:scale-105 transition-transform">
            RJ
          </span>
          <span className="font-display font-bold text-lg tracking-tight">
            Richa Jha<span className="text-brand">.</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {LINKS.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              data-testid={`nav-link-${id}`}
              onClick={(e) => go(e, id)}
              className="text-sm text-fg-mut hover:text-brand transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            data-testid="theme-toggle"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-fg-mut hover:text-brand hover:border-brand/50 transition-all"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <Link
            to="/admin"
            data-testid="nav-admin"
            aria-label="Admin panel"
            className="w-10 h-10 rounded-full border border-line hidden sm:flex items-center justify-center text-fg-mut hover:text-brand hover:border-brand/50 transition-all"
          >
            <Lock size={15} />
          </Link>

          <a
            href="#contact"
            data-testid="nav-cta"
            onClick={(e) => go(e, "contact")}
            className="hidden sm:inline-flex items-center h-10 px-5 rounded-full bg-brand text-white text-sm font-semibold hover:bg-brand-deep hover:shadow-[0_0_28px_rgba(111,130,86,0.45)] transition-all"
          >
            Let's Talk
          </a>

          <button
            data-testid="nav-mobile-toggle"
            aria-label="Menu"
            className="lg:hidden w-10 h-10 rounded-full border border-line flex items-center justify-center text-fg-mut"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-ink/95 backdrop-blur-xl border-b border-line px-6 py-4 flex flex-col gap-4"
        >
          {LINKS.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              data-testid={`nav-mobile-link-${id}`}
              onClick={(e) => go(e, id)}
              className="text-base text-fg-mut hover:text-brand transition-colors"
            >
              {label}
            </a>
          ))}
          <Link
            to="/admin"
            className="text-sm text-fg-dim flex items-center gap-2"
            data-testid="nav-mobile-admin"
          >
            <Lock size={13} /> Admin
          </Link>
        </motion.nav>
      )}
    </header>
  );
}
