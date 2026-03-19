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
  const [blocked, setBlocked] = useState(false);
  const [mobileBlur, setMobileBlur] = useState(false);

  /* 🌙 Theme */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  /* 🚫 Desktop: Screenshot + DevTools */
  useEffect(() => {
    const blockKeys = (e: KeyboardEvent) => {
      if (
        e.key === "PrintScreen" ||
        e.key === "F12" ||
        (e.ctrlKey && e.key.toLowerCase() === "s") ||
        (e.ctrlKey &&
          e.shiftKey &&
          ["i", "j", "c"].includes(e.key.toLowerCase()))
      ) {
        e.preventDefault();
        setBlocked(true);
        setTimeout(() => setBlocked(false), 2000);
      }
    };

    document.addEventListener("keydown", blockKeys);
    return () => document.removeEventListener("keydown", blockKeys);
  }, []);

  /* 🚫 Disable Right Click */
  useEffect(() => {
    const disableRightClick = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);
    return () => document.removeEventListener("contextmenu", disableRightClick);
  }, []);

  useEffect(() => {
    const disableTouch = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };

    document.addEventListener("touchstart", disableTouch, { passive: false });
    document.addEventListener("touchmove", disableTouch, { passive: false });

    return () => {
      document.removeEventListener("touchstart", disableTouch);
      document.removeEventListener("touchmove", disableTouch);
    };
  }, []);

  /* 👁 Blur when app goes background (Desktop + Mobile) */
  useEffect(() => {
    const handleVisibility = () => {
      document.body.style.filter = document.hidden ? "blur(14px)" : "none";
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  /* 📱 Mobile Screenshot Neutralizer (best possible) */
  useEffect(() => {
    const handleTouchEnd = () => {
      setMobileBlur(true);
      setTimeout(() => setMobileBlur(false), 800);
    };

    window.addEventListener("touchend", handleTouchEnd);
    return () => window.removeEventListener("touchend", handleTouchEnd);
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

      {/* 🚨 Desktop Screenshot Warning */}
      {blocked && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 text-white text-xl font-semibold">
          Screenshots are disabled 🚫
        </div>
      )}

      {/* 📱 Mobile Blur Overlay */}
      {mobileBlur && (
        <div className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-xl" />
      )}

      {/* 🔒 Watermark (recommended) */}
      <div className="fixed bottom-3 right-4 opacity-40 text-xs pointer-events-none z-[1]">
        © Samarth Dhanaji Pawar
      </div>
    </div>
  );
}
