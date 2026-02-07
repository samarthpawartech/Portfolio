import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Globe, Server, Database, Wrench, TestTube } from "lucide-react";

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const skillCategories = [
    {
      icon: Code2,
      title: "Programming Languages",
      skills: ["Java", "C", "C++"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Globe,
      title: "Frontend",
      skills: ["React.js", "HTML5", "CSS3", "JavaScript"],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Server,
      title: "Backend",
      skills: ["Spring Boot", "REST APIs", "JDBC", "JPA", "Hibernate"],
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Database,
      title: "Database",
      skills: ["MySQL", "PostgreSQL"],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Wrench,
      title: "Tools & Concepts",
      skills: ["Git", "GitHub", "Maven", "DSA", "MVC", "Client–Server"],
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: TestTube,
      title: "Testing",
      skills: ["Selenium Automation"],
      color: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <section
      id="skills"
      ref={ref}
      className="py-20 px-4 md:px-8 bg-gray-50/50 dark:bg-gray-900/50"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto mb-12 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group p-6 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-500 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300" />

                  <div className="relative z-10">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                      {category.title}
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skillIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.1 + skillIndex * 0.05,
                          }}
                          whileHover={{ scale: 1.05 }}
                          className="
                            px-3 py-1.5 rounded-full text-sm font-medium
                            bg-gradient-to-r from-gray-400 to-gray-600
                            dark:from-gray-600 dark:to-gray-800
                            text-white
                            shadow-sm hover:shadow-md
                            transition-all duration-200
                          "
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
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
