import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  MessageCircle,
  Send,
  ExternalLink,
} from "lucide-react";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Me",
      value: "samarthpawar9322@gmail.com",
      href: "mailto:samarthpawar9322@gmail.com",
      description: "Send me an email anytime",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      hoverGradient: "hover:from-blue-600 hover:via-cyan-600 hover:to-teal-600",
    },
    {
      icon: Phone,
      title: "Call Me",
      value: "+91 9322007416",
      href: "tel:+919322007416",
      description: "Let's talk about your project",
      gradient: "from-purple-500 via-pink-500 to-rose-500",
      hoverGradient:
        "hover:from-purple-600 hover:via-pink-600 hover:to-rose-600",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Borgaon,Sangli,Maharashtra",
      href: "https://www.google.com/maps/search/?api=1&query=415413+Kolhapur+Maharashtra+India",
      description: "India",
      gradient: "from-orange-500 via-red-500 to-pink-500",
      hoverGradient:
        "hover:from-orange-600 hover:via-red-600 hover:to-pink-600",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      name: "GitHub",
      username: "samarthpawartech",
      href: "https://github.com",
      gradient: "from-gray-700 to-gray-900",
      color: "bg-gray-900",
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      username: "Samarth Dhanaji Pawar",
      href: "https://linkedin.com",
      gradient: "from-blue-600 to-blue-800",
      color: "bg-blue-700",
    },
    {
      icon: MessageCircle,
      name: "WhatsApp",
      username: "+91 9322007416",
      href: "https://wa.me/919322007416",
      gradient: "from-green-500 to-green-700",
      color: "bg-green-600",
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 relative overflow-hidden" ref={ref}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-block mb-4"
          >
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
              <Send className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Let's collaborate and create something amazing together! Feel free
            to reach out through any of these channels.
          </p>
        </motion.div>

        {/* Contact Method Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={index}
                href={method.href}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative"
              >
                <div className="relative p-8 rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-white/20 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  {/* Animated gradient background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  {/* Icon */}
                  <motion.div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${method.gradient} mb-6 shadow-lg`}
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {method.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {method.description}
                  </p>
                  <p
                    className={`text-sm font-semibold bg-gradient-to-r ${method.gradient} bg-clip-text text-transparent`}
                  >
                    {method.value}
                  </p>

                  {/* Arrow indicator */}
                  <motion.div
                    className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <ExternalLink
                      className={`w-5 h-5 bg-gradient-to-r ${method.gradient} bg-clip-text text-transparent`}
                    />
                  </motion.div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Social Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/70 to-gray-50/70 dark:from-gray-800/70 dark:to-gray-900/70 backdrop-blur-lg border border-white/20 dark:border-gray-700/50 shadow-2xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                Let's Connect
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Follow me on social media or send a message
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative"
                  >
                    <div
                      className={`p-6 rounded-2xl bg-gradient-to-br ${social.gradient} shadow-lg hover:shadow-2xl transition-all duration-300 text-white relative overflow-hidden`}
                    >
                      {/* Shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />

                      <div className="flex items-center gap-4 relative z-10">
                        <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-lg">{social.name}</p>
                          <p className="text-sm opacity-90">
                            {social.username}
                          </p>
                        </div>
                      </div>

                      <motion.div
                        className="absolute top-2 right-2"
                        whileHover={{ rotate: 45 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ExternalLink className="w-5 h-5 opacity-70" />
                      </motion.div>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Call to action */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-8 text-center"
            >
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Open to Work | Freelance & Full-Time Opportunities
              </p>
              <motion.div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg"
                animate={{
                  boxShadow: [
                    "0 10px 30px rgba(59, 130, 246, 0.3)",
                    "0 10px 40px rgba(168, 85, 247, 0.4)",
                    "0 10px 30px rgba(59, 130, 246, 0.3)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                Currently Available
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
