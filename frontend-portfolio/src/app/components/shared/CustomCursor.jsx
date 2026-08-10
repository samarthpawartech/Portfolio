import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useMediaQuery } from "./useMediaQuery";

export function CustomCursor() {
  const isFinePointer = useMediaQuery("(pointer: fine)");
  const shouldReduceMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.4 });

  const active = isFinePointer && !shouldReduceMotion;

  useEffect(() => {
    if (!active) return undefined;

    document.body.classList.add("cursor-none-active");

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const down = () => setIsDown(true);
    const up = () => setIsDown(false);
    const over = (e) => {
      const target = e.target.closest?.(
        "a, button, [data-cursor-hover], input, textarea, select",
      );
      setIsHovering(Boolean(target));
    };
    const leaveWindow = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leaveWindow);

    return () => {
      document.body.classList.remove("cursor-none-active");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leaveWindow);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  if (!active) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s" }}
    >
      <motion.div
        className="absolute rounded-full bg-neon-cyan"
        style={{
          x,
          y,
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          boxShadow: "0 0 12px 2px rgba(0,245,255,0.8)",
        }}
        animate={{ scale: isDown ? 0.6 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="absolute rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          borderColor: isHovering ? "var(--color-neon-purple)" : "rgba(0,245,255,0.5)",
        }}
        animate={{
          width: isHovering ? 56 : 32,
          height: isHovering ? 56 : 32,
          marginLeft: isHovering ? -28 : -16,
          marginTop: isHovering ? -28 : -16,
          opacity: isHovering ? 0.9 : 0.5,
          backgroundColor: isHovering ? "rgba(123,46,255,0.08)" : "rgba(0,245,255,0.04)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </div>
  );
}
