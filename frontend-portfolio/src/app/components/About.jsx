import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Award, Briefcase, Code2, Terminal } from "lucide-react";
import { Reveal } from "./shared/Reveal";
import { SectionHeading } from "./shared/SectionHeading";

function AnimatedCounter({ end, duration = 1.6 }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (!isInView) return undefined;
    let startTime;
    let frame;
    const animate = (t) => {
      if (!startTime) startTime = t;
      const progress = (t - startTime) / (duration * 1000);
      if (progress < 1) {
        setCount(Math.floor(end * progress));
        frame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, end, duration]);

  return <span ref={nodeRef}>{count}</span>;
}

const BULLETS = [
  { text: "Building scalable Java backends with Spring Boot, JPA/Hibernate & PostgreSQL/MySQL", accent: "text-neon-cyan" },
  { text: "Shipped CafeDesk — a multi-role platform handling 500+ concurrent orders with JWT-based RBAC", accent: "text-neon-purple" },
  { text: "Full-stack exposure with React.js, HTML5, CSS3 & JavaScript", accent: "text-neon-pink" },
  { text: "Trained at QSpiders in full-stack Java development — immediate joiner, open to backend & full-stack roles", accent: "text-neon-green" },
];

const STATS = [
  { icon: Briefcase, label: "Professional Experience", value: "2+", numeric: 2, bg: "bg-neon-cyan/10", text: "text-neon-cyan" },
  { icon: Code2, label: "Projects", value: "5+", numeric: 5, bg: "bg-neon-purple/10", text: "text-neon-purple" },
  { icon: Award, label: "Strong DSA Foundation", value: "✓", numeric: null, bg: "bg-neon-orange/10", text: "text-neon-orange" },
];

export function About() {
  return (
    <section id="about" className="relative px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading code="const about = () => {" title="About Me" accent="cyan" />

        <div className="grid items-center gap-8 md:grid-cols-2">
          <Reveal direction="left">
            <div className="glass relative overflow-hidden rounded-3xl p-8">
              <div
                className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-neon-cyan/10 blur-3xl"
                aria-hidden="true"
              />
              <div className="mb-5 flex items-center gap-3">
                <span className="glass flex h-11 w-11 items-center justify-center rounded-xl text-neon-cyan">
                  <Terminal className="h-5 w-5" />
                </span>
                <h3 className="font-display text-2xl font-bold text-ink">Aspiring Java Backend Developer</h3>
              </div>
              <div className="space-y-4">
                {BULLETS.map((b) => (
                  <p key={b.text} className="flex items-start gap-3 text-ink-muted">
                    <span className={`mt-1 ${b.accent}`}>▹</span>
                    <span>{b.text}</span>
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} direction="right" delay={0.1 + i * 0.1}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass flex items-center gap-4 rounded-2xl p-5"
                >
                  <div
                    className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl ${stat.bg} ${stat.text}`}
                  >
                    <stat.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <div className={`font-display text-3xl font-bold ${stat.text}`}>
                      {stat.numeric ? (
                        <>
                          <AnimatedCounter end={stat.numeric} />+
                        </>
                      ) : (
                        stat.value
                      )}
                    </div>
                    <div className="mt-0.5 text-sm text-ink-muted">{stat.label}</div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
