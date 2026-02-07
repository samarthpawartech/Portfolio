import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Github, Coffee, Stethoscope } from "lucide-react";

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const projects = [
    {
      title: "Doctor–Patient Appointment System",
      icon: Stethoscope,
      github:
        "https://github.com/samarthpawartech/Doctor-Patient-Appointment-System",
      description:
        "A comprehensive healthcare management system with role-based authentication and appointment scheduling.",
      features: [
        "Role-based login (Admin, Doctor, Patient)",
        "Appointment booking & tracking",
        "Responsive UI design",
        "Deployed on Apache Tomcat",
      ],
      techStack: [
        { name: "Java", color: "from-gray-600 to-gray-800" },
        { name: "Servlets", color: "from-gray-500 to-gray-700" },
        { name: "JSP", color: "from-gray-500 to-gray-700" },
        { name: "JDBC", color: "from-gray-500 to-gray-700" },
        { name: "MySQL", color: "from-gray-600 to-gray-800" },
        { name: "Frontend-Technologies", color: "from-gray-600 to-gray-800" },
      ],
    },
    {
      title: "CafeDesk – Cafe Management System",
      icon: Coffee,
      github: "https://github.com/samarthpawartech/CafeDesk",
      description:
        "Full-stack cafe management application with complete order and billing functionality.",
      features: [
        "CRUD operations for menu management",
        "Order & Billing modules",
        "Role-based access control",
        "REST API integration",
      ],
      techStack: [
        { name: "Java", color: "from-gray-600 to-gray-800" },
        { name: "Spring Boot", color: "from-gray-600 to-gray-800" },
        { name: "REST APIs", color: "from-gray-500 to-gray-700" },
        { name: "MySQL", color: "from-gray-600 to-gray-800" },
        { name: "Frontend-technologies", color: "from-gray-600 to-gray-800" },
      ],
    },
  ];

  return (
    <section
      ref={ref}
      className="py-20 px-4 md:px-8 bg-gray-50/50 dark:bg-gray-900/50"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800 dark:text-white">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto mb-12 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="p-8 rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600">
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <div className="flex gap-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-700 hover:text-white transition"
                          aria-label="View project on GitHub"
                        >
                          <Github className="w-5 h-5" />
                        </motion.button>
                      </a>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {project.features.map((feature, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.08 }}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${tech.color} shadow-sm`}
                      >
                        {tech.name}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
