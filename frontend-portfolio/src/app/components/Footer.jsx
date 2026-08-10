import { motion } from "motion/react";
import { Heart, Github, Linkedin, Mail, Sparkles } from "lucide-react";

const PARTICLES = [
  { top: "20%", left: "10%", delay: "-2s", duration: "9s" },
  { top: "60%", left: "22%", delay: "-5s", duration: "11s" },
  { top: "30%", left: "78%", delay: "-1s", duration: "10s" },
  { top: "70%", left: "88%", delay: "-7s", duration: "12s" },
  { top: "45%", left: "50%", delay: "-3s", duration: "8s" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 px-4 py-12 md:px-8">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="anim-float absolute h-1 w-1 rounded-full bg-neon-cyan/50"
            style={{
              top: p.top,
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />

        <div className="mt-10 flex flex-col items-center justify-between gap-6 md:flex-row">
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#home")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.05 }}
            data-cursor-hover
            className="btn-focus-ring flex items-center gap-1.5"
          >
            <span className="text-gradient glow-cyan font-display text-2xl font-bold">
              SP
            </span>
            <Sparkles
              className="h-3.5 w-3.5 text-neon-purple anim-pulse-glow"
              style={{ animationDuration: "2.4s" }}
            />
          </motion.a>

          <p className="flex items-center gap-2 text-sm text-ink-muted">
            Made with{" "}
            <Heart className="h-4 w-4 fill-neon-pink text-neon-pink" /> by
            Samarth Dhanaji Pawar
          </p>

          <div className="flex gap-3">
            {[
              {
                icon: Github,
                href: "https://github.com/samarthpawartech",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/samarth-pawar-31083137b/",
                label: "LinkedIn",
              },
              {
                icon: Mail,
                href: "mailto:samarthpawar9322@gmail.com",
                label: "Email",
              },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  s.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                aria-label={s.label}
                data-cursor-hover
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.92 }}
                className="btn-focus-ring glass flex h-10 w-10 items-center justify-center rounded-lg text-ink-muted transition-colors hover:text-neon-cyan"
              >
                <s.icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
