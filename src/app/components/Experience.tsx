import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Calendar, TrendingUp, Database, Zap, Shield } from "lucide-react";

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // FIRST EXPERIENCE
  const achievements1 = [
    {
      icon: TrendingUp,
      text: "Built and optimized Spring Boot REST APIs",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Database,
      text: "Improved SQL query performance by 50%",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Zap,
      text: "Increased database efficiency by 30%",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: TrendingUp,
      text: "Improved overall system throughput by 35%",
      color: "from-green-500 to-emerald-500",
    },
  ];

  // SECOND EXPERIENCE (NEW DESCRIPTION)
  const achievements2 = [
    {
      icon: TrendingUp,
      text: "Built backend with Spring Boot",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      text: "Developed REST APIs",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Shield,
      text: "Implemented JWT security",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Database,
      text: "Managed MySQL database",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: TrendingUp,
      text: "Worked on real-world projects",
      color: "from-orange-500 to-yellow-500",
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 relative overflow-hidden" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-16 rounded-full"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <motion.div
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          />

          {/* FIRST EXPERIENCE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-white z-10"></div>

            <div className="ml-16 md:ml-0 md:flex md:items-center mb-16">
              <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold">
                    Jul 2023 – Aug 2023
                  </span>
                </div>
              </div>

              <div className="md:w-1/2 md:pl-12">
                <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-lg shadow-xl">
                  <h3 className="text-2xl font-bold mb-2">
                    Backend Developer (Internship)
                  </h3>
                  <p className="text-purple-600 font-semibold mb-4">
                    Triplet's Service Pvt. Ltd.
                  </p>

                  {achievements1.map((a, i) => {
                    const Icon = a.icon;
                    return (
                      <div key={i} className="flex gap-3 mb-3">
                        <div
                          className={`p-2 rounded-lg bg-gradient-to-br ${a.color}`}
                        >
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <p>{a.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* SECOND EXPERIENCE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-4 border-white z-10"></div>

            <div className="ml-16 md:ml-0 md:flex md:items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-semibold">
                    Mar 2024 – Present
                  </span>
                </div>
              </div>

              <div className="md:w-1/2 md:pl-12">
                <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-lg shadow-xl">
                  <h3 className="text-2xl font-bold mb-2">
                    Backend Developer Intern
                  </h3>
                  <p className="text-purple-600 font-semibold mb-4">
                    QSpider - Deccan Pune
                  </p>

                  {achievements2.map((a, i) => {
                    const Icon = a.icon;
                    return (
                      <div key={i} className="flex gap-3 mb-3">
                        <div
                          className={`p-2 rounded-lg bg-gradient-to-br ${a.color}`}
                        >
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <p>{a.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
