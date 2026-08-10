import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Rocket } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleClick}
          data-cursor-hover
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.9 }}
          className="btn-focus-ring glass fixed bottom-6 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full text-neon-cyan shadow-[0_0_24px_-6px_rgba(0,245,255,0.5)] sm:bottom-8 sm:right-8"
        >
          <Rocket className="h-5 w-5 -rotate-45" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
