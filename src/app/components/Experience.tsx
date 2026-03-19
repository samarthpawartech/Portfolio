import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Calendar, TrendingUp, Database, Zap } from 'lucide-react';

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const achievements = [
    {
      icon: TrendingUp,
      text: 'Built and optimized Spring Boot REST APIs',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Database,
      text: 'Improved SQL query performance by 50%',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Zap,
      text: 'Increased database efficiency by 30%',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: TrendingUp,
      text: 'Improved overall system throughput by 35%',
      color: 'from-green-500 to-emerald-500',
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
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-16 rounded-full"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <motion.div
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Timeline dot */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-white dark:border-gray-900 z-10"
            ></motion.div>

            <div className="ml-16 md:ml-0 md:flex md:items-center mb-8">
              <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm"
                >
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Jul 2023 – Aug 2023
                  </span>
                </motion.div>
              </div>

              <div className="md:w-1/2 md:pl-12">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="p-6 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-white/20 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      Backend Developer (Internship)
                    </h3>
                    <p className="text-lg text-purple-600 dark:text-purple-400 font-semibold mb-4">
                      Triplet's Service Pvt. Ltd.
                    </p>
                    
                    <div className="space-y-3">
                      {achievements.map((achievement, index) => {
                        const Icon = achievement.icon;
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                            className="flex items-start gap-3 group"
                          >
                            <div className={`mt-1 p-2 rounded-lg bg-gradient-to-br ${achievement.color} group-hover:scale-110 transition-transform duration-300`}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 flex-1">
                              {achievement.text}
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
