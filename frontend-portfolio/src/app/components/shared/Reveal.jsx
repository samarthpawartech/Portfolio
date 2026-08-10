import { motion, useReducedMotion } from "motion/react";

/**
 * Consistent scroll-reveal wrapper. Wraps children in a fade + rise
 * animation that triggers once when scrolled into view.
 *
 * direction: "up" | "left" | "right" | "none"
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  amount = 0.2,
  className = "",
  as: Component = motion.div,
}) {
  const shouldReduceMotion = useReducedMotion();

  const offsets = {
    up: { y: 36, x: 0 },
    left: { y: 0, x: -36 },
    right: { y: 0, x: 36 },
    none: { y: 0, x: 0 },
  };

  const { x, y } = offsets[direction] || offsets.up;

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Component
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: Math.min(amount, 0.1), margin: "0px 0px 160px 0px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}
