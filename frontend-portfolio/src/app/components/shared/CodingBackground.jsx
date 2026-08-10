import { useEffect } from "react";
import {
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
  motion,
} from "motion/react";

/**
 * Real, complete-looking source code for each requested language/technology.
 * Kept idiomatic and generic (standard boilerplate patterns, not copied from
 * any particular source) so it reads as authentic to a developer's eye at a
 * glance, without being a display of someone else's actual work.
 */
const CODE_SNIPPETS = [
  {
    id: "java",
    tone: "gray",
    lines: [
      "package com.samarth.engineer;",
      "",
      "public class Application {",
      '    private final String stack = "Java 17";',
      "",
      "    public static void main(String[] args) {",
      "        SpringApplication.run(Application.class, args);",
      "    }",
      "}",
    ],
    style: { top: "8%", left: "4%", rotate: -1, duration: "22s", delay: "-3s" },
    visibility: "sm",
  },
  {
    id: "spring",
    tone: "cyan",
    lines: [
      "@RestController",
      '@RequestMapping("/api/v1/projects")',
      "public class ProjectController {",
      "",
      "    @Autowired",
      "    private ProjectService service;",
      "",
      "    @GetMapping(\"/{id}\")",
      "    public ResponseEntity<Project> getById(",
      "        @PathVariable Long id) {",
      "        return ResponseEntity.ok(service.findById(id));",
      "    }",
      "}",
    ],
    style: { top: "16%", right: "9%", rotate: 1, duration: "26s", delay: "-9s" },
    visibility: "lg",
  },
  {
    id: "rest",
    tone: "gray",
    lines: [
      "GET /api/v1/projects/42 HTTP/1.1",
      "Host: api.samarthpawar.dev",
      "Authorization: Bearer eyJhbGciOi...",
      "Accept: application/json",
      "",
      "HTTP/1.1 200 OK",
      "Content-Type: application/json",
      "Cache-Control: no-store",
    ],
    style: { top: "40%", right: "1%", rotate: -1, duration: "24s", delay: "-14s" },
    visibility: "always",
  },
  {
    id: "sql",
    tone: "cyan",
    lines: [
      "SELECT e.name, e.role, COUNT(p.id) AS total",
      "FROM engineers e",
      "JOIN projects p ON p.engineer_id = e.id",
      "WHERE e.stack = 'Java'",
      "GROUP BY e.name, e.role",
      "ORDER BY total DESC;",
    ],
    style: { bottom: "30%", left: "3%", rotate: 1, duration: "23s", delay: "-6s" },
    visibility: "lg",
  },
  {
    id: "react",
    tone: "gray",
    lines: [
      "function ProfileCard({ engineer }) {",
      "  const [available, setAvailable] = useState(true);",
      "",
      "  useEffect(() => {",
      "    fetchStatus(engineer.id).then(setAvailable);",
      "  }, [engineer.id]);",
      "",
      "  return <Card active={available} />;",
      "}",
    ],
    style: { bottom: "14%", right: "20%", rotate: 1, duration: "25s", delay: "-11s" },
    visibility: "lg",
  },
  {
    id: "json",
    tone: "cyan",
    lines: [
      "{",
      '  "name": "Samarth Dhanaji Pawar",',
      '  "role": "Backend Engineer",',
      '  "stack": ["Java", "Spring Boot", "React"],',
      '  "experience": "2+ years",',
      '  "available": true',
      "}",
    ],
    style: { top: "62%", right: "4%", rotate: -1, duration: "21s", delay: "-4s" },
    visibility: "always",
  },
  {
    id: "git",
    tone: "gray",
    lines: [
      "$ git log --oneline -5",
      "a3f9c1d feat: ship CafeDesk v2 backend",
      "7e2b0da fix: optimise JPA query latency",
      "c11d4ab chore: bump spring-boot to 3.3.0",
      "9f4e21c feat: add JWT-based RBAC",
      "$ git push origin main",
    ],
    style: { bottom: "7%", left: "6%", rotate: -1, duration: "27s", delay: "-17s" },
    visibility: "sm",
  },
];

// Requested band: 10-15% opacity, readable dark gray / cyan, no glow.
const TONE_COLOR = {
  gray: "text-slate-300",
  cyan: "text-cyan-300",
};
const OPACITY_BY_ID = {
  java: 0.14,
  spring: 0.12,
  rest: 0.13,
  sql: 0.11,
  react: 0.12,
  json: 0.14,
  git: 0.13,
};

function CodeBlock({ snippet }) {
  const { style, lines, tone, visibility, id } = snippet;
  const visibilityClass = visibility === "always" ? "block" : visibility === "sm" ? "hidden sm:block" : "hidden lg:block";
  return (
    <pre
      className={`anim-float absolute select-none whitespace-pre font-mono text-[11px] leading-[1.65] sm:text-[12px] ${TONE_COLOR[tone]} ${visibilityClass}`}
      style={{
        ...style,
        opacity: OPACITY_BY_ID[id],
        animationDuration: style.duration,
        animationDelay: style.delay,
      }}
    >
      {lines.join("\n")}
    </pre>
  );
}

export function CodingBackground() {
  const shouldReduceMotion = useReducedMotion();

  // Gentle scroll parallax — the code drifts slightly slower than the page
  // scrolls, a subtle cinematic depth cue rather than a moving pattern.
  const { scrollYProgress } = useScroll();
  const scrollParallaxY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // Very light cursor parallax, spring-smoothed and transform-only so it
  // stays cheap and never causes layout work.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 30, damping: 20, mass: 0.7 });
  const smy = useSpring(my, { stiffness: 30, damping: 20, mass: 0.7 });
  const parallaxX = useTransform(smx, [-1, 1], [-8, 8]);
  const parallaxY = useTransform(smy, [-1, 1], [-6, 6]);

  useEffect(() => {
    if (shouldReduceMotion) return undefined;
    const handleMove = (e) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [shouldReduceMotion, mx, my]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-void" aria-hidden="true">
      {/* Completely plain black base — no gradients, no shapes, no grid. */}
      <motion.div className="absolute inset-0" style={shouldReduceMotion ? undefined : { y: scrollParallaxY }}>
        <motion.div
          className="absolute inset-0"
          style={shouldReduceMotion ? undefined : { x: parallaxX, y: parallaxY }}
        >
          {CODE_SNIPPETS.map((s) => (
            <CodeBlock key={s.id} snippet={s} />
          ))}
        </motion.div>
      </motion.div>

      {/* Faint film-grain only — a cinematic texture, not a visual pattern,
          kept low enough that it reads as "black" rather than "textured". */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          opacity: 0.02,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
