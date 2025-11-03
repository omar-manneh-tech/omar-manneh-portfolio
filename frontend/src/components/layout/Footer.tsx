"use client";

import { motion } from "framer-motion";
import { FiCode, FiHeart } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-2 text-gray-400">
            <span>Built with</span>
            <FiHeart className="w-4 h-4 text-red-500" />
            <span>using</span>
            <FiCode className="w-4 h-4 text-violet-400" />
            <span>React & Next.js</span>
          </div>
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

