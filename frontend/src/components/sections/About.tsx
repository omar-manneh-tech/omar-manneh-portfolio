"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiCode, FiUsers, FiAward } from "react-icons/fi";
import Image from "next/image";

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { icon: FiCode, value: "50+", label: "Projects Completed" },
    { icon: FiUsers, value: "30+", label: "Happy Clients" },
    { icon: FiAward, value: "5+", label: "Years Experience" },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-pink-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden glass">
              {/* Placeholder for actual image */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center">
                <div className="text-6xl">👨‍💻</div>
              </div>
              {/* Decorative elements */}
              <motion.div
                className="absolute top-10 right-10 w-32 h-32 bg-violet-500/30 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-3xl font-bold mb-4 gradient-text">
                Full-Stack Web Developer
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-4">
                I'm a passionate developer with over 5 years of experience
                building modern web applications. I specialize in creating
                beautiful, functional, and user-friendly experiences.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed mb-4">
                My expertise spans across frontend and backend technologies,
                with a particular focus on React, Next.js, Node.js, and cloud
                architectures. I love turning complex problems into simple,
                elegant solutions.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass rounded-xl p-6 text-center"
                >
                  <stat.icon className="w-8 h-8 text-violet-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

