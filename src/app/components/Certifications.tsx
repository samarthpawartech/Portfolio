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
} from "lucide-react";

export function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activePdf, setActivePdf] = useState<string | null>(null);

  const certifications = [
    {
      title: "Full Stack Development",
      issuer: "Coding Seekho Institute, Nashik",
      icon: Layers,
      link: "/certificates/Full Stack Development.pdf",
      gradient: "from-amber-400 to-orange-400",
    },
    {
      title: "Programming in Java",
      issuer: "Coding Seekho Institute, Nashik",
      icon: Code2,
      link: "/certificates/Java Programming.pdf",
      gradient: "from-rose-400 to-pink-400",
    },
    {
      title: "Data Structures & Algorithms",
      issuer: "Coding Seekho Institute, Nashik",
      icon: Database,
      link: "/certificates/DSA.pdf",
      gradient: "from-orange-400 to-red-400",
    },
    {
      title: "HTML, CSS, JavaScript & Bootstrap",
      issuer: "Coding Seekho Institute, Nashik",
      icon: Braces,
      link: "/certificates/html css and js.pdf",
      gradient: "from-yellow-400 to-amber-400",
    },
    {
      title: "C++ Certification",
      issuer: "Coding Seekho Institute, Nashik",
      icon: Code2,
      link: "/certificates/CPP.pdf",
      gradient: "from-emerald-400 to-lime-400",
    },
    {
      title: "C Programming Certification",
      issuer: "Coding Seekho Institute, Nashik",
      icon: Code2,
      link: "/certificates/C.pdf",
      gradient: "from-emerald-400 to-lime-400",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-20 px-4 md:px-8 bg-gray-50/50 dark:bg-gray-900/50"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
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

        {/* Cards */}
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

                      {/* VIEW BUTTON (NO DOWNLOAD) */}
                      <button
                        onClick={() => setActivePdf(cert.link)}
                        className="inline-flex items-center gap-2 text-sm font-semibold
                                   text-amber-700 dark:text-amber-400
                                   hover:text-orange-600 dark:hover:text-orange-300 transition-colors"
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

      {/* PDF VIEWER MODAL */}
      {activePdf && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="relative bg-white w-full max-w-5xl h-[90vh] rounded-xl overflow-hidden">
            <button
              onClick={() => setActivePdf(null)}
              className="absolute top-3 right-3 z-10 p-2 bg-red-500 text-white rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <iframe
              src={activePdf}
              className="w-full h-full"
              title="Certificate Viewer"
            />
          </div>
        </div>
      )}
    </section>
  );
}
