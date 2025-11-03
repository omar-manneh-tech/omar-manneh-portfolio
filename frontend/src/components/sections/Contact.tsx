"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaTwitter, FaDiscord } from "react-icons/fa";

const contactInfo = [
  { icon: FiMail, label: "Email", value: "hello@yourportfolio.com" },
  { icon: FiPhone, label: "Phone", value: "+1 (555) 123-4567" },
  { icon: FiMapPin, label: "Location", value: "San Francisco, CA" },
];

const socialLinks = [
  { icon: FaGithub, href: "https://github.com", label: "GitHub" },
  { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FaDiscord, href: "https://discord.com", label: "Discord" },
];

export function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <section
      id="contact"
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
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-pink-500 mx-auto rounded-full" />
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            Let's discuss your next project or just say hello!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 gradient-text">
                Let's Connect
              </h3>
              <p className="text-gray-400 mb-8">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 glass rounded-xl p-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">{info.label}</div>
                    <div className="text-white font-medium">{info.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
              <div className="flex items-center space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full glass flex items-center justify-center text-gray-300 hover:text-violet-400 transition-colors"
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
                  required
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold text-lg flex items-center justify-center space-x-2"
              >
                <span>Send Message</span>
                <FiSend className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

