import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Award, Briefcase, Code2 } from 'lucide-react';

function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return <span ref={nodeRef}>{count}</span>;
}

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const stats = [
    { icon: Briefcase, label: 'Internship Experience', value: '1+', color: 'from-blue-500 to-cyan-500' },
    { icon: Code2, label: 'Projects', value: '5+', color: 'from-purple-500 to-pink-500' },
    { icon: Award, label: 'Strong DSA Foundation', value: '✓', color: 'from-orange-500 to-red-500' },
  ];

  return (
    <section className="py-20 px-4 md:px-8 relative overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-12 rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="p-8 rounded-3xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-white/20 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                  Java Software Developer
                </h3>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 mt-1">▹</span>
                    <span>Experienced in <strong>Spring Boot, REST APIs, JDBC, Hibernate</strong></span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-purple-600 dark:text-purple-400 mt-1">▹</span>
                    <span>Full-stack exposure with <strong>React, HTML, CSS, JavaScript</strong></span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-pink-600 dark:text-pink-400 mt-1">▹</span>
                    <span>Passionate about <strong>clean code & scalable systems</strong></span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-cyan-600 dark:text-cyan-400 mt-1">▹</span>
                    <span>Strong foundation in <strong>Core Java, Data Structures & Algorithms</strong></span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-white/20 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${stat.color}`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.value.match(/\d/) ? (
                          <>
                            <AnimatedCounter end={parseInt(stat.value)} />
                            {stat.value.replace(/\d+/, '')}
                          </>
                        ) : (
                          stat.value
                        )}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
