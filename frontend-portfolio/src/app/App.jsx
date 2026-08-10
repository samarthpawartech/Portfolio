import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { LoadingScreen } from "./components/shared/LoadingScreen";
import { CustomCursor } from "./components/shared/CustomCursor";
import { CodingBackground } from "./components/shared/CodingBackground";
import { BackToTop } from "./components/shared/BackToTop";

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

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen onDone={() => setLoading(false)} />}</AnimatePresence>

      <CodingBackground />
      <CustomCursor />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Certifications />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </motion.div>
    </>
  );
}
