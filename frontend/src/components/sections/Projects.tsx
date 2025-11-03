"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiMongodb } from "react-icons/si";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A modern e-commerce platform with real-time inventory management, payment integration, and admin dashboard.",
    image: "/images/projects/ecommerce.jpg",
    tech: [FaReact, SiNextdotjs, SiTypescript, SiMongodb],
    github: "https://github.com",
    demo: "https://demo.com",
    category: "web-app",
  },
  {
    id: 2,
    title: "Social Media Dashboard",
    description:
      "Analytics dashboard for social media management with real-time metrics, scheduling, and insights.",
    image: "/images/projects/dashboard.jpg",
    tech: [FaReact, SiNextdotjs, FaNodeJs],
    github: "https://github.com",
    demo: "https://demo.com",
    category: "dashboard",
  },
  {
    id: 3,
    title: "Task Management App",
    description:
      "Collaborative task management application with real-time updates, team collaboration, and project tracking.",
    image: "/images/projects/taskapp.jpg",
    tech: [FaReact, SiTypescript, FaNodeJs],
    github: "https://github.com",
    demo: "https://demo.com",
    category: "productivity",
  },
];

export function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="projects"
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
            My <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-pink-500 mx-auto rounded-full" />
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            Here are some of my recent projects showcasing my skills and
            expertise
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group relative glass rounded-2xl overflow-hidden"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/30 to-pink-500/30 flex items-center justify-center">
                  <div className="text-6xl">🚀</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full glass flex items-center justify-center"
                  >
                    <FiExternalLink className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full glass flex items-center justify-center"
                  >
                    <FiGithub className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 group-hover:gradient-text transition-all">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex items-center space-x-3">
                  {project.tech.map((TechIcon, techIndex) => (
                    <motion.div
                      key={techIndex}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      className="w-8 h-8 rounded-lg glass flex items-center justify-center"
                    >
                      <TechIcon className="w-5 h-5 text-violet-400" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

