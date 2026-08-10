import { Reveal } from "./Reveal";

const ACCENT_MAP = {
  cyan: { text: "text-neon-cyan", dot: "bg-neon-cyan" },
  purple: { text: "text-neon-purple", dot: "bg-neon-purple" },
  pink: { text: "text-neon-pink", dot: "bg-neon-pink" },
  green: { text: "text-neon-green", dot: "bg-neon-green" },
  orange: { text: "text-neon-orange", dot: "bg-neon-orange" },
};

/**
 * code    — a short code-syntax line shown as the eyebrow, e.g.
 *           `import { skills } from './engineer';`
 * title   — the human-readable section title
 * accent  — one of the neon token keys, colors the eyebrow + divider
 */
export function SectionHeading({ code, title, accent = "cyan", align = "center" }) {
  const accentClass = ACCENT_MAP[accent] || ACCENT_MAP.cyan;
  const isCenter = align === "center";

  return (
    <Reveal className={`mb-14 md:mb-20 ${isCenter ? "text-center" : "text-left"}`}>
      <div
        className={`inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-5 ${
          isCenter ? "" : ""
        }`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${accentClass.dot}`} />
        <code className={`font-mono text-[11px] sm:text-xs ${accentClass.text} tracking-wide`}>
          {code}
        </code>
      </div>
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-ink tracking-tight">
        {title}
      </h2>
      <div
        className={`h-px w-24 mt-6 bg-gradient-to-r from-transparent via-current to-transparent ${accentClass.text} opacity-60 ${
          isCenter ? "mx-auto" : ""
        }`}
      />
    </Reveal>
  );
}
