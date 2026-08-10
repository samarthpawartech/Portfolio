import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sparkles } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Certificates", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const scrollPosition = window.scrollY + 140;

      NAV_ITEMS.forEach((item) => {
        const section = document.querySelector(item.href);
        if (!section) return;
        const offsetTop = section.offsetTop;
        const offsetHeight = section.offsetHeight;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(item.href.replace("#", ""));
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-3 left-0 right-0 z-50 px-3 sm:top-4 sm:px-4 md:px-8"
    >
      <div className="mx-auto max-w-7xl relative">
        <div
          className={`glass-strong relative flex items-center justify-between rounded-2xl px-4 py-3 transition-shadow duration-500 sm:px-6 ${
            scrolled ? "shadow-[0_8px_40px_-12px_rgba(0,245,255,0.25)]" : ""
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            data-cursor-hover
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
            className="btn-focus-ring flex items-center gap-1.5 rounded-lg"
          >
            <span className="font-display text-2xl font-bold text-gradient glow-cyan">SP</span>
            <Sparkles className="h-4 w-4 text-neon-purple anim-pulse-glow" style={{ animationDuration: "2.4s" }} />
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  data-cursor-hover
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="btn-focus-ring relative rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted transition-colors duration-200 hover:text-ink"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-lg bg-white/8 ring-1 ring-neon-cyan/30"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? "text-neon-cyan" : ""}`}>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-underline"
                      className="absolute -bottom-0.5 left-3.5 right-3.5 h-px bg-gradient-to-r from-neon-cyan to-neon-purple"
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            data-cursor-hover
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="btn-focus-ring rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple p-2.5 text-void lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -16, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -16, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mt-3 overflow-hidden lg:hidden"
            >
              <div className="glass-strong rounded-2xl p-3">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.href.replace("#", "");
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href);
                      }}
                      className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                        isActive ? "bg-white/8 text-neon-cyan" : "text-ink-muted hover:bg-white/5 hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
