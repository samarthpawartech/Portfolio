import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Code2,
  Server,
  Globe,
  Database,
  Terminal,
  Boxes,
  Brain,
  TestTube,
} from "lucide-react";
import { Reveal } from "./shared/Reveal";
import { SectionHeading } from "./shared/SectionHeading";
import { useMediaQuery } from "./shared/useMediaQuery";

const ACCENTS = {
  cyan: {
    text: "text-neon-cyan",
    border: "border-neon-cyan/45",
    bg: "bg-neon-cyan/10",
    dot: "bg-neon-cyan",
    rgb: "0,245,255",
    stroke: "#00f5ff",
  },
  purple: {
    text: "text-neon-purple",
    border: "border-neon-purple/45",
    bg: "bg-neon-purple/10",
    dot: "bg-neon-purple",
    rgb: "123,46,255",
    stroke: "#7b2eff",
  },
  pink: {
    text: "text-neon-pink",
    border: "border-neon-pink/45",
    bg: "bg-neon-pink/10",
    dot: "bg-neon-pink",
    rgb: "255,46,136",
    stroke: "#ff2e88",
  },
  green: {
    text: "text-neon-green",
    border: "border-neon-green/45",
    bg: "bg-neon-green/10",
    dot: "bg-neon-green",
    rgb: "0,255,136",
    stroke: "#00ff88",
  },
  orange: {
    text: "text-neon-orange",
    border: "border-neon-orange/45",
    bg: "bg-neon-orange/10",
    dot: "bg-neon-orange",
    rgb: "255,138,0",
    stroke: "#ff8a00",
  },
};

const CATEGORIES = [
  { icon: Code2, title: "Languages", skills: ["Java", "C++"], accent: "cyan" },
  {
    icon: Server,
    title: "Backend",
    skills: [
      "Spring Boot",
      "REST API",
      "JPA",
      "Hibernate",
      "JDBC",
      "Servlets & JSP",
      "Microservices",
    ],
    accent: "purple",
  },
  {
    icon: Globe,
    title: "Frontend",
    skills: ["React.js", "HTML5", "CSS3", "JavaScript"],
    accent: "pink",
  },
  {
    icon: Database,
    title: "Databases",
    skills: ["PostgreSQL", "MySQL", "Schema Design", "Query Optimisation"],
    accent: "green",
  },
  {
    icon: Terminal,
    title: "Tools & DevOps",
    skills: ["Git", "GitHub", "Maven", "Docker", "Postman", "Vercel", "Render"],
    accent: "orange",
  },
  {
    icon: Boxes,
    title: "Architecture",
    skills: ["MVC", "Client-Server", "Microservices", "RESTful Design"],
    accent: "cyan",
  },
  {
    icon: Brain,
    title: "CS Concepts",
    skills: [
      "Data Structures & Algorithms",
      "OOP",
      "DBMS",
      "Operating Systems",
    ],
    accent: "purple",
  },
  {
    icon: TestTube,
    title: "Testing",
    skills: ["Selenium Automation", "API Testing (Postman)"],
    accent: "pink",
  },
];

function RadialMap({ category }) {
  const uid = useId();
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const accent = ACCENTS[category.accent];
  const size = isDesktop ? 380 : 280;
  const center = size / 2;
  const radius = isDesktop
    ? Math.min(170, 100 + category.skills.length * 10)
    : Math.min(118, 74 + category.skills.length * 7);

  const points = category.skills.map((skill, i) => {
    const angle = (-90 + (360 / category.skills.length) * i) * (Math.PI / 180);
    return {
      skill,
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  });

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="absolute inset-0 overflow-visible"
      >
        {points.map((p, i) => (
          <motion.line
            key={`${uid}-line-${i}`}
            x1={center}
            y1={center}
            x2={p.x}
            y2={p.y}
            stroke={accent.stroke}
            strokeOpacity={0.35}
            strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.35 }}
            transition={{
              duration: 0.6,
              delay: shouldReduceMotion ? 0 : 0.05 * i,
              ease: "easeOut",
            }}
          />
        ))}
      </svg>

      {/* hub */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`glass absolute flex h-16 w-16 items-center justify-center rounded-full ${accent.text} anim-pulse-glow`}
        style={{
          left: center,
          top: center,
          x: "-50%",
          y: "-50%",
          animationDuration: "2.6s",
        }}
      >
        <category.icon className="h-7 w-7" />
      </motion.div>

      {points.map((p, i) => (
        <motion.div
          key={p.skill}
          initial={{ opacity: 0, scale: 0.4, left: center, top: center }}
          animate={{ opacity: 1, scale: 1, left: p.x, top: p.y }}
          exit={{ opacity: 0, scale: 0.4 }}
          transition={{
            duration: 0.45,
            delay: shouldReduceMotion ? 0 : 0.05 * i + 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={{
            scale: 1.12,
            boxShadow: `0 0 22px -4px rgba(${accent.rgb},0.7)`,
          }}
          className={`glass absolute whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium text-ink ${accent.border}`}
          style={{ x: "-50%", y: "-50%" }}
        >
          {p.skill}
        </motion.div>
      ))}
    </div>
  );
}

export function Skills() {
  const [active, setActive] = useState(0);
  const category = CATEGORIES[active];

  return (
    <section id="skills" className="relative px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          code="import { skills } from './engineer';"
          title="Skill Galaxy"
          accent="purple"
        />

        {/* category tabs */}
        <Reveal>
          <div className="scrollbar-none -mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
            {CATEGORIES.map((cat, i) => {
              const a = ACCENTS[cat.accent];
              const isActive = i === active;
              return (
                <button
                  key={cat.title}
                  type="button"
                  data-cursor-hover
                  onClick={() => setActive(i)}
                  className={`btn-focus-ring flex flex-shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? `${a.border} ${a.text} ${a.bg}`
                      : "border-white/10 text-ink-muted hover:border-white/25 hover:text-ink"
                  }`}
                >
                  <cat.icon className="h-4 w-4" />
                  {cat.title}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] ${isActive ? a.bg : "bg-white/10"}`}
                  >
                    {cat.skills.length}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* radial display */}
        <Reveal delay={0.1}>
          <div className="glass rounded-3xl p-6 sm:p-10">
            <RadialMap key={category.title} category={category} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
