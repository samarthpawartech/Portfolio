import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Download, Mail, Github, Linkedin } from "lucide-react";

export function Hero() {
  const [typedText, setTypedText] = useState("");

  const fullText =
    "Results-driven Java Software Developer with strong foundations in Core Java, Spring Boot, REST APIs, and React.";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 md:px-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center gap-8" // ✅ 32px gap
        >
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
              <img
                src="/assets/Profile_image.jpg" // ✅ public/assets
                alt="Samarth Dhanaji Pawar"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Samarth Dhanaji Pawar
            </h1>

            <h2 className="text-lg md:text-xl lg:text-2xl font-medium text-purple-600 dark:text-purple-400 mb-6">
              Software Developer | Java Full Stack | Backend Developer
            </h2>

            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 min-h-[70px]">
              {typedText}
              <span className="animate-pulse">|</span>
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8">
              {/* Download Resume */}
              <a
                href="/resume/SAMARTH-DHANAJI-PAWAR-SD.pdf" // ✅ public/certificates
                download
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold flex items-center gap-2 shadow-lg"
                >
                  <Download size={18} />
                  Download Resume
                </motion.button>
              </a>

              {/* Contact Scroll */}
              <motion.a
                href="#contact" // ✅ scrolls to Contact section
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 rounded-full font-semibold flex items-center gap-2"
              >
                <Mail size={18} />
                Contact Me
              </motion.a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-6 justify-center md:justify-start">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-6 h-6 hover:scale-125 transition-transform" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-6 h-6 hover:scale-125 transition-transform" />
              </a>

              <a href="mailto:samarthpawar9322@gmail.com">
                <Mail className="w-6 h-6 hover:scale-125 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
