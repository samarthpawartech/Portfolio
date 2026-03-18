import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Code2,
  Database,
  Layers,
  Braces,
  FileText,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  icon: React.ComponentType<{ className?: string }>;
  link: string;
  gradient: string;
}

export function Certifications() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const certifications: Certification[] = [
    {
      title: "Full Stack Development",
      issuer: "Coding Seekho Institute, Nashik",
      icon: Layers,
      link: "/certificates/Full Stack Development.jpg",
      gradient: "from-amber-400 to-orange-400",
    },
    {
      title: "Programming in Java",
      issuer: "Coding Seekho Institute, Nashik",
      icon: Code2,
      link: "/certificates/Java Programming.jpg",
      gradient: "from-rose-400 to-pink-400",
    },
    {
      title: "Data Structures & Algorithms",
      issuer: "Coding Seekho Institute, Nashik",
      icon: Database,
      link: "/certificates/DSA.jpg",
      gradient: "from-orange-400 to-red-400",
    },
    {
      title: "HTML, CSS, JavaScript & Bootstrap",
      issuer: "Coding Seekho Institute, Nashik",
      icon: Braces,
      link: "/certificates/html css and js.jpg",
      gradient: "from-yellow-400 to-amber-400",
    },
    {
      title: "C++ Certification",
      issuer: "Coding Seekho Institute, Nashik",
      icon: Code2,
      link: "/certificates/CPP.jpg",
      gradient: "from-emerald-400 to-lime-400",
    },
    {
      title: "C Programming Certification",
      issuer: "Coding Seekho Institute, Nashik",
      icon: Code2,
      link: "/certificates/C.jpg",
      gradient: "from-emerald-400 to-lime-400",
    },
  ];

  const handlePrev = () => {
    if (modalIndex === null) return;
    setModalIndex((prev) =>
      prev === 0 ? certifications.length - 1 : prev! - 1,
    );
  };

  const handleNext = () => {
    if (modalIndex === null) return;
    setModalIndex((prev) =>
      prev === certifications.length - 1 ? 0 : prev! + 1,
    );
  };

  // Swipe logic without react-swipeable
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.changedTouches[0].screenX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEndX(e.changedTouches[0].screenX);

    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].screenX - touchStartX;

    if (deltaX > 50) {
      handlePrev();
    } else if (deltaX < -50) {
      handleNext();
    }
  };

  return (
    <section
      ref={ref}
      className="py-20 px-4 md:px-8 bg-gray-50/50 dark:bg-gray-900/50"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800 dark:text-white">
            Certifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-rose-400 mx-auto mb-12 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group"
              >
                <div className="relative p-6 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all">
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cert.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
                  />
                  <div className="relative z-10 flex gap-4 items-start">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${cert.gradient} group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-4">
                        {cert.issuer}
                      </p>
                      <button
                        onClick={() => setModalIndex(index)}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-400 hover:text-orange-600 dark:hover:text-orange-300 transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        View Certificate
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {modalIndex !== null && (
        <div
          onClick={() => setModalIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative max-w-3xl w-full flex items-center justify-center"
          >
            <X
              onClick={() => setModalIndex(null)}
              className="absolute top-4 right-4 w-8 h-8 text-white cursor-pointer"
            />

            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white w-10 h-10 flex items-center justify-center bg-black/50 rounded-full hover:bg-black/70"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white w-10 h-10 flex items-center justify-center bg-black/50 rounded-full hover:bg-black/70"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <img
              src={certifications[modalIndex].link}
              alt={certifications[modalIndex].title}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
