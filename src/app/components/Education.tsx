import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { GraduationCap, BookOpen, Award, Calendar } from "lucide-react";

export function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const education = [
    {
      icon: GraduationCap,
      degree: "B.Tech – Computer Science & Engineering",
      institution: "Nanasaheb Mahadik College Of Engineering, Sangli",
      startDate: "June 2021",
      endDate: "May 2025",
    },
    {
      icon: BookOpen,
      degree: "HSC – Higher Secondary Certificate",
      institution: "Sadguru Junior College of Science & Arts, Ishwarpur",
      startDate: "June 2019",
      endDate: "March 2021",
    },
    {
      icon: Award,
      degree: "SSC – Secondary School Certificate",
      institution: "Mohanrao Patangrao Patil Madhyamik Vidhyalaya, Borgaon",
      startDate: "June 2018",
      endDate: "March 2019",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-20 px-4 md:px-8 bg-gray-50/50 dark:bg-gray-900/50"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800 dark:text-white">
            Education
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-rose-500 mx-auto mb-12 rounded-full" />
        </motion.div>

        <div className="space-y-6">
          {education.map((edu, index) => {
            const Icon = edu.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-6 md:p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="flex gap-6 items-start">
                  {/* Icon */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500 to-rose-500">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {edu.institution}
                    </p>

                    {/* Dates */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-sm">
                        <Calendar className="w-4 h-4" />
                        {edu.startDate}
                      </span>

                      <span className="text-gray-400 font-medium">→</span>

                      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-rose-500 to-red-500 shadow-sm">
                        <Calendar className="w-4 h-4" />
                        {edu.endDate}
                      </span>
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
