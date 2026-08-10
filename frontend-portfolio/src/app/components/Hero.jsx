import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Download,
  Mail,
  Github,
  Linkedin,
  Code2,
  Layers,
  Timer,
  Target,
  Coffee,
  Leaf,
  Database,
  Container,
  GitBranch,
  Zap,
} from "lucide-react";

import { MagneticButton } from "./shared/MagneticButton";
import { useMediaQuery } from "./shared/useMediaQuery";

/* =========================================================
   HERO DATA
========================================================= */

const ROLES = [
  "Java Backend Developer",
  "Java Full Stack Developer",
  "Spring Boot Developer",
  "Backend Engineer",
  "REST API Developer",
  "Software Engineer",
];

const TAGLINE =
  "Java Developer skilled in Spring Boot, JPA/Hibernate, SQL, and RESTful APIs — building scalable, production-ready applications.";

const ORBIT_ICONS = [
  {
    key: "java",
    label: "Java",
    icon: Coffee,
  },
  {
    key: "spring",
    label: "Spring Boot",
    icon: Leaf,
  },
  {
    key: "react",
    label: "React",
    icon: Code2,
  },
  {
    key: "postgres",
    label: "PostgreSQL",
    icon: Database,
  },
  {
    key: "mysql",
    label: "MySQL",
    icon: Database,
  },
  {
    key: "docker",
    label: "Docker",
    icon: Container,
  },
  {
    key: "git",
    label: "Git",
    icon: GitBranch,
  },
  {
    key: "api",
    label: "REST API",
    icon: Zap,
  },
];

const STATS = [
  {
    icon: Layers,
    value: "4+",
    label: "Projects",
  },
  {
    icon: Code2,
    value: "30+",
    label: "Technologies",
  },
  {
    icon: Timer,
    value: "2+",
    label: "Experience",
  },
  {
    icon: Target,
    value: "DSA",
    label: "Problem Solving",
  },
];

/* =========================================================
   TYPEWRITER HOOK
========================================================= */

function useTypewriterCycle(
  words,
  { typeSpeed = 60, deleteSpeed = 32, pause = 1500 } = {},
) {
  const shouldReduceMotion = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [text, setText] = useState(shouldReduceMotion ? words[0] : "");
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    if (shouldReduceMotion) return undefined;

    const current = words[index];
    let timer;

    if (phase === "typing") {
      if (text.length < current.length) {
        timer = setTimeout(() => {
          setText(current.slice(0, text.length + 1));
        }, typeSpeed);
      } else {
        timer = setTimeout(() => {
          setPhase("deleting");
        }, pause);
      }
    } else if (text.length > 0) {
      timer = setTimeout(() => {
        setText(current.slice(0, text.length - 1));
      }, deleteSpeed);
    } else {
      setIndex((currentIndex) => (currentIndex + 1) % words.length);
      setPhase("typing");
    }

    return () => clearTimeout(timer);
  }, [
    text,
    phase,
    index,
    words,
    typeSpeed,
    deleteSpeed,
    pause,
    shouldReduceMotion,
  ]);

  return shouldReduceMotion ? words[0] : text;
}

/* =========================================================
   ONE-TIME TYPEWRITER
========================================================= */

function useTypeOnce(fullText, speed = 24) {
  const shouldReduceMotion = useReducedMotion();

  const [text, setText] = useState(shouldReduceMotion ? fullText : "");

  useEffect(() => {
    if (shouldReduceMotion) return undefined;

    let i = 0;

    const timer = setInterval(() => {
      i += 1;

      setText(fullText.slice(0, i));

      if (i >= fullText.length) {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [fullText, speed, shouldReduceMotion]);

  return text;
}

/* =========================================================
   HUD RING
========================================================= */

function HudRing({
  insetClass,
  dasharray,
  colorVar,
  duration,
  reverse = false,
  strokeWidth = 1.5,
  energized,
}) {
  const animationClass = reverse ? "anim-spin-ccw" : "anim-spin-cw";

  return (
    <svg
      className={`pointer-events-none absolute ${insetClass} ${animationClass}`}
      style={{
        animationDuration: duration,
        transformOrigin: "center",
      }}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      {/* Soft base ring */}
      <circle
        cx="50"
        cy="50"
        r="48"
        stroke={colorVar}
        strokeWidth={strokeWidth}
        opacity="0.12"
      />

      {/* Animated segmented ring */}
      <circle
        cx="50"
        cy="50"
        r="48"
        stroke={colorVar}
        strokeWidth={strokeWidth}
        strokeDasharray={dasharray}
        strokeLinecap="round"
        style={{
          opacity: energized ? 1 : 0.72,
          transition: "opacity 0.5s ease",
        }}
      />
    </svg>
  );
}

/* =========================================================
   STABLE ORBIT SYSTEM
   IMPORTANT:
   All icons use one common orbit animation.
   They do NOT independently move.
========================================================= */

function OrbitSystem({ radius, shouldReduceMotion }) {
  const duration = 26;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div
        className={
          shouldReduceMotion
            ? "absolute left-1/2 top-1/2"
            : "hero-orbit absolute left-1/2 top-1/2"
        }
        style={{
          "--orbit-radius": `${radius}px`,
          "--orbit-duration": `${duration}s`,
        }}
      >
        {ORBIT_ICONS.map((item, index) => {
          const Icon = item.icon;

          const angle = (360 / ORBIT_ICONS.length) * index;

          return (
            <div
              key={item.key}
              className="absolute left-0 top-0"
              style={{
                transform: `rotate(${angle}deg) translateX(var(--orbit-radius))`,
                transformOrigin: "0 0",
              }}
            >
              <motion.div
                className="hero-orbit-chip glass relative flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 sm:h-12 sm:w-12"
                whileHover={{
                  scale: 1.18,
                }}
                transition={{
                  duration: 0.2,
                }}
                title={item.label}
                style={{
                  "--counter-angle": `${-angle}deg`,
                }}
              >
                <Icon
                  className="h-5 w-5 text-neon-cyan sm:h-[21px] sm:w-[21px]"
                  strokeWidth={1.8}
                />

                <span className="sr-only">{item.label}</span>

                {/* Small neon core */}
                <span className="pointer-events-none absolute inset-0 rounded-full shadow-[0_0_18px_rgba(0,245,255,0.18)]" />
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   PROFILE HUD
========================================================= */

function ProfileHUD() {
  const [energized, setEnergized] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  const isLg = useMediaQuery("(min-width: 1024px)");
  const isSm = useMediaQuery("(min-width: 640px)");

  const radius = isLg ? 188 : isSm ? 165 : 128;

  return (
    <div
      className="
        relative mx-auto
        h-[18rem] w-[18rem]
        sm:h-[21rem] sm:w-[21rem]
        lg:h-[26rem] lg:w-[26rem]
      "
      onMouseEnter={() => setEnergized(true)}
      onMouseLeave={() => setEnergized(false)}
      data-cursor-hover
    >
      {/* =================================================
          OUTER HUD RINGS
      ================================================= */}

      <HudRing
        insetClass="inset-0"
        dasharray="38 38"
        colorVar="var(--color-neon-cyan)"
        duration="20s"
        strokeWidth={1.5}
        energized={energized}
        reverse={false}
      />

      <HudRing
        insetClass="inset-4 sm:inset-6"
        dasharray="2 8"
        colorVar="var(--color-neon-purple)"
        duration="16s"
        strokeWidth={1.5}
        energized={energized}
        reverse
      />

      <HudRing
        insetClass="inset-8 sm:inset-10"
        dasharray="70 232"
        colorVar="var(--color-neon-pink)"
        duration="9s"
        strokeWidth={2}
        energized={energized}
        reverse={false}
      />

      {/* =================================================
          ADDITIONAL STATIC HUD MARKERS
      ================================================= */}

      <div
        className="
          pointer-events-none absolute inset-4
          rounded-full border border-white/[0.04]
          sm:inset-6
        "
      />

      <div
        className="
          pointer-events-none absolute inset-12
          rounded-full border border-cyan-400/[0.08]
          sm:inset-14
        "
      />

      {/* =================================================
          ORBITING TECHNOLOGIES
      ================================================= */}

      <OrbitSystem radius={radius} shouldReduceMotion={shouldReduceMotion} />

      {/* =================================================
          PROFILE IMAGE
      ================================================= */}

      <motion.div
        className="
          absolute
          inset-[3.25rem]
          overflow-hidden
          rounded-full
          border border-white/10
          bg-black
          shadow-[0_0_60px_rgba(0,245,255,0.12)]
          sm:inset-[4.5rem]
          lg:inset-[5rem]
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                y: [0, -4, 0, 4, 0],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Image glow */}
        <div
          className="pointer-events-none absolute inset-0 z-20 rounded-full"
          style={{
            boxShadow: energized
              ? "inset 0 0 55px 8px rgba(0,245,255,0.42)"
              : "inset 0 0 42px 5px rgba(0,245,255,0.22)",
            transition: "box-shadow 0.6s ease",
          }}
        />

        {/* Profile image */}
        <img
          src="/assets/Profile_image.jpg"
          alt="Samarth Dhanaji Pawar"
          className="
            h-full
            w-full
            object-cover
            object-center
          "
          fetchPriority="high"
        />

        {/* Dark image overlay */}
        <div
          className="
            pointer-events-none absolute inset-0
            bg-gradient-to-b
            from-transparent
            via-transparent
            to-black/20
          "
        />

        {/* Scanner */}
        {!shouldReduceMotion && (
          <div
            className="
              pointer-events-none absolute
              inset-x-0 h-1/3
              bg-gradient-to-b
              from-transparent
              via-neon-cyan/20
              to-transparent
            "
            style={{
              animation: "scan-sweep 3.2s ease-in-out infinite",
            }}
          />
        )}
      </motion.div>

      {/* =================================================
          CENTER GLOW
      ================================================= */}

      <div
        className="pointer-events-none absolute inset-10 rounded-full sm:inset-14"
        style={{
          boxShadow: energized
            ? "0 0 110px 12px rgba(123,46,255,0.35)"
            : "0 0 80px 8px rgba(123,46,255,0.20)",
          transition: "box-shadow 0.6s ease",
        }}
      />

      {/* =================================================
          SMALL HUD STATUS DOTS
      ================================================= */}

      <span
        className="
          pointer-events-none absolute
          left-[11%] top-[31%]
          h-1.5 w-1.5
          rounded-full
          bg-neon-cyan
          shadow-[0_0_10px_rgba(0,245,255,0.8)]
        "
      />

      <span
        className="
          pointer-events-none absolute
          right-[12%] top-[27%]
          h-1.5 w-1.5
          rounded-full
          bg-neon-purple
          shadow-[0_0_10px_rgba(123,46,255,0.8)]
        "
      />

      <span
        className="
          pointer-events-none absolute
          bottom-[20%] left-[15%]
          h-1.5 w-1.5
          rounded-full
          bg-neon-pink
          shadow-[0_0_10px_rgba(255,0,140,0.8)]
        "
      />
    </div>
  );
}

/* =========================================================
   HERO
========================================================= */

export function Hero() {
  const role = useTypewriterCycle(ROLES);

  const typedTagline = useTypeOnce(TAGLINE, 22);

  const shouldReduceMotion = useReducedMotion();

  const nameLetters = useMemo(() => "Samarth Dhanaji Pawar".split(""), []);

  return (
    <>
      {/* =================================================
          LOCAL ORBIT ANIMATION
      ================================================= */}

      <style>
        {`
          .hero-orbit {
            width: 0;
            height: 0;
            transform: translate(-50%, -50%);
            animation: hero-orbit-spin var(--orbit-duration) linear infinite;
            will-change: transform;
          }

          .hero-orbit-chip {
            animation:
              hero-orbit-counter var(--orbit-duration) linear infinite;
            will-change: transform;
          }

          @keyframes hero-orbit-spin {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }

            to {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }

          @keyframes hero-orbit-counter {
            from {
              transform:
                translate(-50%, -50%)
                rotate(var(--counter-angle));
            }

            to {
              transform:
                translate(-50%, -50%)
                rotate(calc(var(--counter-angle) - 360deg));
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .hero-orbit,
            .hero-orbit-chip {
              animation: none !important;
            }
          }
        `}
      </style>

      <section
        id="home"
        className="
          relative
          flex
          min-h-[100svh]
          items-center
          justify-center
          overflow-hidden
          px-5
          pb-16
          pt-28
          sm:px-8
          md:pb-20
          md:pt-32
        "
      >
        {/* =================================================
            SUBTLE HERO BACKGROUND
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            left-[8%]
            top-[20%]
            h-72
            w-72
            rounded-full
            bg-cyan-400/[0.025]
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-[5%]
            top-[25%]
            h-80
            w-80
            rounded-full
            bg-purple-500/[0.035]
            blur-3xl
          "
        />

        {/* =================================================
            MAIN CONTAINER
        ================================================= */}

        <div
          className="
            relative
            z-10
            mx-auto
            grid
            w-full
            max-w-7xl
            items-center
            gap-12
            lg:grid-cols-[1.08fr_0.92fr]
            lg:gap-8
            xl:gap-12
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div
            className="
              order-2
              min-w-0
              text-center
              lg:order-1
              lg:text-left
            "
          >
            {/* Greeting */}

            <motion.p
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="
                eyebrow
                mb-4
                font-mono
                text-sm
                text-neon-green
              "
            >
              <span className="text-neon-green">const</span> greeting ={" "}
              <span className="text-neon-orange">"Hi, I'm"</span>;
            </motion.p>

            {/* Name */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.1,
              }}
              className="
                text-gradient
                glow-cyan
                font-display
                text-[3.2rem]
                font-bold
                leading-[0.98]
                tracking-[-0.04em]
                sm:text-6xl
                md:text-7xl
                lg:text-[4.6rem]
                xl:text-[5rem]
              "
            >
              {nameLetters.map((character, index) => (
                <span key={`${character}-${index}`}>{character}</span>
              ))}
            </motion.h1>

            {/* Professional title */}

            <motion.h2
              initial={{
                opacity: 0,
                y: 14,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              className="
                mt-5
                text-base
                font-medium
                leading-relaxed
                text-ink-muted
                sm:text-lg
                lg:text-xl
                xl:text-2xl
              "
            >
              Java Full Stack Developer{" "}
              <span className="text-neon-cyan">|</span> Spring Boot{" "}
              <span className="text-neon-cyan">|</span> SQL
            </motion.h2>

            {/* Animated role */}

            <motion.div
              initial={{
                opacity: 0,
                y: 14,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.3,
              }}
              className="
                mt-5
                flex
                min-h-8
                items-center
                justify-center
                font-mono
                text-sm
                text-neon-cyan
                sm:text-base
                lg:justify-start
                lg:text-lg
              "
            >
              <span className="mr-2 text-neon-purple">&gt;</span>

              <span>{role}</span>

              {!shouldReduceMotion && (
                <span
                  className="
                    ml-0.5
                    inline-block
                    h-5
                    w-[2px]
                    bg-neon-cyan
                  "
                  style={{
                    animation: "blink-caret 0.9s step-end infinite",
                  }}
                />
              )}
            </motion.div>

            {/* Description */}

            <p
              className="
                mx-auto
                mt-6
                min-h-[78px]
                max-w-2xl
                text-sm
                leading-7
                text-ink-muted
                sm:text-base
                lg:mx-0
                lg:text-lg
              "
            >
              {typedTagline}

              {!shouldReduceMotion && (
                <span
                  className="
                    ml-0.5
                    inline-block
                    h-5
                    w-[2px]
                    translate-y-1
                    bg-neon-purple
                  "
                  style={{
                    animation: "blink-caret 0.9s step-end infinite",
                  }}
                />
              )}
            </p>

            {/* =================================================
                CTA BUTTONS
            ================================================= */}

            <div
              className="
                mt-8
                flex
                flex-wrap
                justify-center
                gap-3
                sm:gap-4
                lg:justify-start
              "
            >
              <MagneticButton
                as="a"
                href="/resume/SAMARTH-DHANAJI-PAWAR-CV.pdf"
                download
                variant="solid"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </MagneticButton>

              <MagneticButton
                as="a"
                href="#projects"
                variant="outline"
                onClick={(event) => {
                  event.preventDefault();

                  document.querySelector("#projects")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                <Layers className="h-4 w-4" />
                View My Work
              </MagneticButton>

              <MagneticButton
                as="a"
                href="#contact"
                variant="ghost"
                onClick={(event) => {
                  event.preventDefault();

                  document.querySelector("#contact")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                <Mail className="h-4 w-4" />
                Contact Me
              </MagneticButton>
            </div>

            {/* =================================================
                SOCIAL LINKS
            ================================================= */}

            <div
              className="
                mt-7
                flex
                justify-center
                gap-5
                lg:justify-start
              "
            >
              <a
                href="https://github.com/samarthpawartech"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                aria-label="GitHub"
                className="
                  btn-focus-ring
                  text-ink-muted
                  transition-colors
                  duration-200
                  hover:text-neon-cyan
                "
              >
                <Github className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>

              <a
                href="https://www.linkedin.com/in/samarth-pawar-31083137b/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                aria-label="LinkedIn"
                className="
                  btn-focus-ring
                  text-ink-muted
                  transition-colors
                  duration-200
                  hover:text-neon-cyan
                "
              >
                <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>

              <a
                href="mailto:samarthpawar9322@gmail.com"
                data-cursor-hover
                aria-label="Email"
                className="
                  btn-focus-ring
                  text-ink-muted
                  transition-colors
                  duration-200
                  hover:text-neon-cyan
                "
              >
                <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            </div>

            {/* =================================================
                STATS
            ================================================= */}

            <div
              className="
                mt-9
                grid
                grid-cols-2
                gap-3
                sm:mt-10
                sm:grid-cols-4
              "
            >
              {STATS.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <motion.div
                    key={stat.label}
                    initial={{
                      opacity: 0,
                      y: 16,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.5 + index * 0.08,
                    }}
                    whileHover={{
                      y: -5,
                    }}
                    className="
                      glass
                      rounded-xl
                      border
                      border-white/[0.08]
                      px-3
                      py-4
                      text-center
                      transition-colors
                      duration-300
                      hover:border-cyan-400/20
                    "
                  >
                    <Icon
                      className="
                        mx-auto
                        mb-1.5
                        h-4
                        w-4
                        text-neon-cyan
                      "
                    />

                    <div
                      className="
                        font-display
                        text-xl
                        font-bold
                        text-ink
                      "
                    >
                      {stat.value}
                    </div>

                    <div
                      className="
                        mt-0.5
                        text-[10px]
                        text-ink-dim
                        sm:text-[11px]
                      "
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* =================================================
              RIGHT PROFILE
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.88,
              x: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: "easeOut",
            }}
            className="
              order-1
              flex
              min-w-0
              items-center
              justify-center
              lg:order-2
            "
          >
            <ProfileHUD />
          </motion.div>
        </div>
      </section>
    </>
  );
}
