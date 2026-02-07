import { motion } from 'motion/react';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-8 px-4 md:px-8 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-2"
          >
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Samarth Dhanaji Pawar
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-4"
          >
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all"
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="mailto:samarthpawar9322@gmail.com"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all"
            >
              <Mail className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-gray-500 dark:text-gray-500 text-xs mt-4"
        >
          © 2026 Samarth Dhanaji Pawar. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}
