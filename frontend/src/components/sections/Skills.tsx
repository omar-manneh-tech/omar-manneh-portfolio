"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaDocker,
  FaAws,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiFramer,
} from "react-icons/si";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: FaReact, level: 95, color: "text-cyan-400" },
      { name: "Next.js", icon: SiNextdotjs, level: 90, color: "text-white" },
      { name: "TypeScript", icon: SiTypescript, level: 88, color: "text-blue-400" },
      { name: "JavaScript", icon: SiJavascript, level: 92, color: "text-yellow-400" },
      { name: "Tailwind CSS", icon: SiTailwindcss, level: 90, color: "text-cyan-300" },
      { name: "Framer Motion", icon: SiFramer, level: 85, color: "text-pink-400" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: FaNodeJs, level: 90, color: "text-green-400" },
      { name: "Python", icon: FaPython, level: 80, color: "text-blue-500" },
      { name: "MongoDB", icon: SiMongodb, level: 85, color: "text-green-500" },
      { name: "PostgreSQL", icon: SiPostgresql, level: 82, color: "text-blue-300" },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Git", icon: FaGitAlt, level: 95, color: "text-orange-400" },
      { name: "Docker", icon: FaDocker, level: 80, color: "text-blue-400" },
      { name: "AWS", icon: FaAws, level: 75, color: "text-orange-500" },
    ],
  },
];

export function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="skills"
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
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-pink-500 mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: categoryIndex * 0.2, duration: 0.6 }}
              className="glass rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 gradient-text">
                {category.title}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      delay: categoryIndex * 0.2 + skillIndex * 0.1,
                      duration: 0.4,
                    }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="glass-dark rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <skill.icon className={`w-8 h-8 ${skill.color}`} />
                        <span className="font-semibold text-lg">{skill.name}</span>
                      </div>
                      <span className="text-sm text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.2,
                          duration: 1,
                          ease: "easeOut",
                        }}
                        className="h-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

