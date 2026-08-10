import { motion } from "motion/react";
import { Calendar, Briefcase, Layers, FileCode2, ClipboardList, Server, Database } from "lucide-react";
import { Reveal } from "./shared/Reveal";
import { SectionHeading } from "./shared/SectionHeading";

const EXPERIENCES = [
  {
    role: "Full Stack Developer Trainee",
    company: "QSpiders, Deccan, Pune",
    duration: "Feb 2026 – Present",
    current: true,
    achievements: [
      {
        icon: Layers,
        text: "Designed, developed, and deployed 2+ Java-based full-stack applications integrating Spring Boot REST APIs with React.js, owning the complete SDLC from requirements gathering and schema design through testing and deployment.",
      },
      {
        icon: FileCode2,
        text: "Wrote clean, maintainable Java code following OOP principles and MVC best practices; collaborated with cross-functional peers to define technical specifications and implement solutions using Git branching workflows and Maven build pipelines.",
      },
      {
        icon: ClipboardList,
        text: "Contributed to technical documentation including API specifications and design schemas; actively staying up-to-date with emerging Java frameworks and industry trends.",
      },
    ],
  },
  {
    role: "Backend Developer Intern",
    company: "Triplets Service Pvt. Ltd., Sangli",
    duration: "Jul 2023 – Aug 2023",
    current: false,
    achievements: [
      {
        icon: Server,
        text: "Designed, developed, tested, and deployed 8+ production-grade RESTful APIs using Spring Boot, JPA & Hibernate, following clean code standards and boosting system throughput by 35% under concurrent load.",
      },
      {
        icon: Database,
        text: "Debugged and resolved critical database inefficiencies by re-engineering schema to 3NF normalisation, performing code-level analysis to identify improvement areas and reducing redundant data reads by 40% while improving query efficiency by 30%.",
      },
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading code="git log --oneline experience" title="Experience" accent="green" />

        <div className="relative pl-10 sm:pl-14">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-white/10 sm:left-5" />
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, amount: 0.1, margin: "0px 0px 160px 0px" }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="absolute left-3 top-2 w-px bg-gradient-to-b from-neon-cyan via-neon-purple to-neon-pink sm:left-5"
          />

          <div className="space-y-10">
            {EXPERIENCES.map((exp, expIndex) => (
              <Reveal key={exp.company} direction="left" delay={expIndex * 0.12}>
                <div className="relative">
                  <span
                    className={`absolute -left-10 top-1.5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-void text-void sm:-left-14 ${
                      exp.current
                        ? "bg-gradient-to-br from-neon-cyan to-neon-purple"
                        : "bg-gradient-to-br from-neon-purple to-neon-pink"
                    }`}
                  >
                    <Briefcase className="h-4 w-4" />
                  </span>

                  <div className="mb-3 flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 font-mono text-xs text-neon-cyan">
                      <Calendar className="h-3.5 w-3.5" />
                      {exp.duration}
                    </span>
                    {exp.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-neon-green/10 px-3 py-1 text-[11px] font-semibold text-neon-green">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-green opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon-green" />
                        </span>
                        Current
                      </span>
                    )}
                  </div>

                  <div className="glass rounded-3xl p-6 sm:p-8">
                    <h3 className="font-display text-2xl font-bold text-ink">{exp.role}</h3>
                    <p className="mb-5 mt-1 font-semibold text-neon-purple">{exp.company}</p>

                    <div className="space-y-3.5">
                      {exp.achievements.map((a, i) => (
                        <motion.div
                          key={a.text}
                          initial={{ opacity: 0, x: 16 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.1, margin: "0px 0px 160px 0px" }}
                          transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 text-neon-cyan">
                            <a.icon className="h-4 w-4" />
                          </span>
                          <p className="pt-1 text-sm text-ink-muted sm:text-base">{a.text}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
