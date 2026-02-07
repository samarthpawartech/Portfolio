import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Education } from "./components/Education";
import { Certifications } from "./components/Certifications";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

/* Home page */
function HomePage() {
  return (
    <main>
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="education">
        <Education />
      </section>
      <section id="certifications">
        <Certifications />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  /* 🌙 Theme handling */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  /* 👁 Blur when app goes to background (Desktop + Mobile) */
  useEffect(() => {
    const handleVisibility = () => {
      document.body.style.filter = document.hidden ? "blur(14px)" : "none";
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:to-gray-900 transition-colors duration-300"
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none",
      }}
    >
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>

      <Footer />

      {/* 🔒 Subtle Watermark */}
      <div className="fixed bottom-3 right-4 opacity-40 text-xs pointer-events-none z-[1]">
        © Samarth Dhanaji Pawar
      </div>
    </div>
  );
}
