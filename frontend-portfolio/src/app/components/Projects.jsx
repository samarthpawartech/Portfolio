import {
  Github,
  Coffee,
  Stethoscope,
  Sparkle,
  Calendar,
  CreditCard,
  GraduationCap,
} from "lucide-react";
import { Reveal } from "./shared/Reveal";
import { SectionHeading } from "./shared/SectionHeading";
import { TiltCard } from "./shared/TiltCard";

const PROJECTS = [
  {
    title: "CafeDesk – Cafe Management System",

    icon: Coffee,

    github: "https://github.com/samarthpawartech/CafeDesk",

    duration: "Jan 2026 – Present",

    description:
      "A scalable Java-based multi-role backend processing 500+ concurrent orders with real-time billing, inventory and user management.",

    features: [
      "Spring Security-aligned JWT-based RBAC (Admin / Employee / Customer)",
      "15+ RESTful endpoints on a microservices-ready architecture",
      "Normalised 6-table PostgreSQL schema",
      "JPA optimistic locking for full data consistency",
    ],

    techStack: ["Java", "Spring Boot", "PostgreSQL", "Hibernate/JPA", "JWT"],

    accent: "purple",
  },

  {
    title: "Doctor–Patient Appointment System",

    icon: Stethoscope,

    github:
      "https://github.com/samarthpawartech/Doctor-Patient-Appointment-System",

    duration: "Apr 2025 – Aug 2025",

    description:
      "A full-stack Java application with 3 user roles and conflict-free, double-booking-proof appointment scheduling.",

    features: [
      "Admin, Doctor & Patient roles with session-based authentication",
      "Conflict-free scheduling enforced via JDBC transactions",
      "5-table MySQL schema with referential integrity",
      "Prepared statements eliminate SQL injection vulnerabilities",
    ],

    techStack: ["Java", "Servlets", "JSP", "JDBC", "MySQL"],

    accent: "cyan",
  },

  {
    title: "IBS – Internet Banking System",

    icon: CreditCard,

    github: "https://github.com/samarthpawartech/Internet-Banking-System",

    duration: "May 2026 – Present",

    description:
      "A secure full-stack Internet Banking System built with React and Spring Boot for account management, fund transfers, transactions and banking services.",

    features: [
      "JWT-based authentication with Spring Security and role-based access control",
      "Secure fund transfers with transaction validation and account balance management",
      "RESTful Spring Boot APIs integrated with a responsive React frontend",
      "Transaction history, account management and secure banking workflows",
    ],

    techStack: ["React", "Spring Boot", "MySQL", "Spring Security", "JWT"],

    accent: "cyan",
  },

  {
    title: "Student Management System",

    icon: GraduationCap,

    github: "https://github.com/samarthpawartech/student_management_system",

    duration: "Jun 2025 –july  2025",

    description:
      "A Python Django-based student management platform for managing student records, academic information, attendance and administrative operations.",

    features: [
      "Student registration, profiles and academic record management",
      "CRUD operations for students, courses and academic information",
      "Attendance management with database-driven record tracking",
      "Django authentication with an admin dashboard for managing student data",
    ],

    techStack: ["Python", "Django", "MySQL", "HTML/CSS", "Bootstrap"],

    accent: "purple",
  },
];

export default PROJECTS;

const ACCENT_TEXT = { cyan: "text-neon-cyan", purple: "text-neon-purple" };
const ACCENT_GRADIENT = {
  cyan: "from-neon-cyan to-neon-green",
  purple: "from-neon-purple to-neon-pink",
};
const ACCENT_DOT = { cyan: "bg-neon-cyan", purple: "bg-neon-purple" };

export function Projects() {
  return (
    <section id="projects" className="relative px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          code="SELECT * FROM projects ORDER BY impact DESC;"
          title="Featured Projects"
          accent="pink"
        />

        <div className="grid gap-8 md:grid-cols-2">
          {PROJECTS.map((project, index) => {
            const Icon = project.icon;
            return (
              <Reveal key={project.title} delay={index * 0.15}>
                <TiltCard className="h-full rounded-3xl">
                  <div className="glass relative flex h-full flex-col overflow-hidden rounded-3xl p-7 sm:p-8">
                    <div
                      className={`pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br ${ACCENT_GRADIENT[project.accent]} opacity-[0.08] blur-3xl`}
                      aria-hidden="true"
                    />

                    <div className="mb-5 flex items-start justify-between">
                      <span
                        className={`glass flex h-14 w-14 items-center justify-center rounded-2xl ${ACCENT_TEXT[project.accent]}`}
                      >
                        <Icon className="h-7 w-7" />
                      </span>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-hover
                        aria-label={`View ${project.title} on GitHub`}
                        className="btn-focus-ring glass flex h-11 w-11 items-center justify-center rounded-xl text-ink-muted transition-colors hover:text-neon-cyan"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-ink">
                      {project.title}
                    </h3>
                    <span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 font-mono text-[11px] text-ink-dim">
                      <Calendar className="h-3 w-3" />
                      {project.duration}
                    </span>
                    <p className="mt-3 text-ink-muted">{project.description}</p>

                    <div className="mt-5 space-y-2.5">
                      {project.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-2.5">
                          <Sparkle
                            className={`mt-0.5 h-3.5 w-3.5 flex-shrink-0 ${ACCENT_TEXT[project.accent]}`}
                          />
                          <span className="text-sm text-ink-muted">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-ink-muted"
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${ACCENT_DOT[project.accent]}`}
                          />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
