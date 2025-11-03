"use client";

import { motion } from "framer-motion";
import { FiArrowDown, FiZap } from "react-icons/fi";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTypescript } from "react-icons/si";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass"
          >
            <FiZap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">
              Available for freelance projects
            </span>
          </motion.div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          <span className="text-gray-100">Hi, I&apos;m </span>
          <span className="gradient-text">John Doe</span>
        </motion.h1>

        {/* Typing Animation */}
        <motion.div variants={itemVariants} className="mb-8">
          <p className="text-2xl md:text-4xl lg:text-5xl text-gray-400 mb-2">
            I build
          </p>
          <motion.div
            className="text-3xl md:text-5xl lg:text-6xl font-bold gradient-text h-20"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            Modern Web Applications
          </motion.div>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12"
        >
          Full-stack developer specializing in React, Next.js, and modern web
          technologies. I create beautiful, performant, and scalable web
          applications.
        </motion.p>

        {/* Tech Icons */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center space-x-8 mb-12"
        >
          {[
            { Icon: FaReact, label: "React", color: "text-cyan-400" },
            { Icon: SiNextdotjs, label: "Next.js", color: "text-white" },
            { Icon: SiTypescript, label: "TypeScript", color: "text-blue-400" },
            { Icon: FaNodeJs, label: "Node.js", color: "text-green-400" },
          ].map(({ Icon, label, color }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.2, y: -5 }}
              className="flex flex-col items-center space-y-2"
            >
              <div className="w-16 h-16 rounded-xl glass flex items-center justify-center">
                <Icon className={`w-8 h-8 ${color}`} />
              </div>
              <span className="text-xs text-gray-500">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold text-lg shadow-lg shadow-violet-500/50 hover:shadow-violet-500/70 transition-all"
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full glass text-white font-semibold text-lg hover:bg-white/20 transition-all"
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="flex flex-col items-center space-y-2"
          >
            <span className="text-sm text-gray-500">Scroll Down</span>
            <FiArrowDown className="w-5 h-5 text-gray-500" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

