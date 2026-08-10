import { motion } from "motion/react";
import { GraduationCap, BookOpen, Award, ArrowRight } from "lucide-react";
import { Reveal } from "./shared/Reveal";
import { SectionHeading } from "./shared/SectionHeading";

const EDUCATION = [
  {
    icon: GraduationCap,
    degree: "B.Tech – Computer Science & Engineering",
    institution: "Nanasaheb Mahadik College of Engineering, Peth, Sangli",
    startDate: "2021",
    endDate: "2025",
  },
  {
    icon: BookOpen,
    degree: "HSC – Higher Secondary Certificate",
    institution: "Sadguru Junior College of Arts & Science, Islampur, Sangli",
    startDate: "2020",
    endDate: "2021",
  },
  {
    icon: Award,
    degree: "SSC – Secondary School Certificate",
    institution: "Mohanrao Patangrao Patil High School, Borgaon, Sangli",
    startDate: "2018",
    endDate: "2019",
  },
];

export function Education() {
  return (
    <section id="education" className="relative px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          code="class Education extends Background {"
          title="Education"
          accent="orange"
        />

        <div className="relative pl-10 sm:pl-14">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-white/10 sm:left-5" />
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute left-3 top-2 w-px bg-gradient-to-b from-neon-orange via-neon-pink to-neon-purple sm:left-5"
          />

          <div className="space-y-8">
            {EDUCATION.map((edu, i) => (
              <Reveal key={edu.degree} direction="left" delay={i * 0.12}>
                <div className="relative">
                  <span className="absolute -left-10 top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-void bg-gradient-to-br from-neon-orange to-neon-pink text-void sm:-left-14">
                    <edu.icon className="h-4 w-4" />
                  </span>

                  <motion.div
                    whileHover={{ y: -4 }}
                    className="glass rounded-2xl p-6"
                  >
                    <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
                      {edu.degree}
                    </h3>
                    <p className="mt-1 text-ink-muted">{edu.institution}</p>

                    <div className="mt-4 flex flex-wrap items-center gap-2.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-neon-orange/10 px-3.5 py-1.5 font-mono text-xs font-semibold text-neon-orange">
                        {edu.startDate}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-ink-dim" />
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-neon-pink/10 px-3.5 py-1.5 font-mono text-xs font-semibold text-neon-pink">
                        {edu.endDate}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
