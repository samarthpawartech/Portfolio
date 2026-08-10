import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

const VARIANTS = {
  solid:
    "text-void bg-gradient-to-r from-neon-cyan to-neon-purple shadow-[0_0_30px_-6px_rgba(0,245,255,0.55)]",
  outline: "text-ink glass border-neon-cyan/40 hover:border-neon-cyan",
  ghost: "text-ink glass",
};

/**
 * A button (or anchor, via `as="a"`) that gently pulls toward the cursor
 * within its bounds, with a glow + shine sweep on hover. Falls back to a
 * static button when reduced motion is requested.
 */
export function MagneticButton({
  children,
  as = "button",
  variant = "solid",
  className = "",
  strength = 18,
  ...props
}) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set((relX / rect.width) * strength);
    y.set((relY / rect.height) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = motion[as] || motion.button;

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={shouldReduceMotion ? undefined : { x: springX, y: springY }}
      whileTap={{ scale: 0.94 }}
      data-cursor-hover
      className={`btn-focus-ring group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-[shimmer-sweep_1s_ease]"
      />
    </Component>
  );
}
