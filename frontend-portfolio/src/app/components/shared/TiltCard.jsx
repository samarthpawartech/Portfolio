import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";

export function TiltCard({ children, className = "", maxTilt = 8, glare = true }) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springConfig = { stiffness: 220, damping: 20, mass: 0.4 };
  const sRotateX = useSpring(rotateX, springConfig);
  const sRotateY = useSpring(rotateY, springConfig);
  const sGlareX = useSpring(glareX, { stiffness: 200, damping: 26 });
  const sGlareY = useSpring(glareY, { stiffness: 200, damping: 26 });
  const glareBackground = useMotionTemplate`radial-gradient(320px circle at ${sGlareX}% ${sGlareY}%, rgba(0,245,255,0.14), transparent 60%)`;

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * maxTilt * 2);
    rotateX.set((0.5 - py) * maxTilt * 2);
    glareX.set(px * 100);
    glareY.set(py * 100);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        shouldReduceMotion
          ? undefined
          : { rotateX: sRotateX, rotateY: sRotateY, transformPerspective: 1000 }
      }
      className={`group relative ${className}`}
    >
      {children}
      {glare && !shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glareBackground }}
        />
      )}
    </motion.div>
  );
}
