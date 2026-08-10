import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const BOOT_LINES = [
  "booting devOS v2027...",
  "loading modules: java · spring-boot · react...",
  "connecting to REST endpoints...",
  "compiling portfolio.jsx...",
  "status: ready ✓",
];

export function LoadingScreen({ onDone }) {
  const shouldReduceMotion = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      onDone?.();
      return undefined;
    }

    if (lineIndex < BOOT_LINES.length) {
      const t = setTimeout(() => setLineIndex((n) => n + 1), 280);
      return () => clearTimeout(t);
    }

    const exitTimer = setTimeout(() => setExiting(true), 260);
    const doneTimer = setTimeout(() => onDone?.(), 780);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [lineIndex, shouldReduceMotion, onDone]);

  if (shouldReduceMotion) return null;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-void"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, rgba(123,46,255,0.12), transparent 60%)",
            }}
          />
          <div className="relative w-[min(90vw,420px)] font-mono text-sm">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-neon-pink/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-neon-orange/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-neon-green/80" />
              <span className="ml-2 text-ink-dim text-xs">system.boot</span>
            </div>
            <div className="glass rounded-xl p-5 min-h-[168px]">
              {BOOT_LINES.slice(0, lineIndex).map((line, i) => (
                <div key={line} className="mb-1.5 text-ink-muted">
                  <span className="text-neon-green">❯</span>{" "}
                  <span className={i === lineIndex - 1 ? "text-ink" : ""}>{line}</span>
                </div>
              ))}
              {lineIndex < BOOT_LINES.length && (
                <span className="inline-block h-4 w-2 translate-y-0.5 bg-neon-cyan [animation:blink-caret_0.9s_step-end_infinite]" />
              )}
            </div>
            <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                initial={{ width: "0%" }}
                animate={{ width: `${(lineIndex / BOOT_LINES.length) * 100}%` }}
                transition={{ duration: 0.25 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
