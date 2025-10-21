"use client"

import type React from "react"
import { Github, Linkedin, Mail, Instagram, Twitter, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

// Floating particles for anime background
const FloatingParticle = ({ delay, duration }: { delay: number; duration: number }) => (
  <motion.div
    className="absolute w-1 h-1 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 rounded-full blur-sm"
    animate={{
      y: [0, -80, 0],
      x: [0, Math.sin(delay) * 40, 0],
      opacity: [0, 0.6, 0],
    }}
    transition={{
      duration,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
      delay,
    }}
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  />
)

// Rotating circle animation for brand
const RotatingCircle = () => (
  <motion.div
    className="relative w-12 h-12 flex items-center justify-center"
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
  >
    {/* Outer circle */}
    <motion.div
      className="absolute inset-0 rounded-full border-2 border-purple-600 dark:border-purple-400"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
    />

    {/* Middle circle - dashed */}
    <motion.div
      className="absolute inset-2 rounded-full border border-dashed border-pink-600 dark:border-pink-400"
      animate={{ rotate: -360 }}
      transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
    />

    {/* Inner dot */}
    <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 rounded-full" />
  </motion.div>
)

// Social button with hover effects
interface SocialButtonProps {
  href: string
  Icon: React.ComponentType<{ className?: string }>
  label: string
  gradientColor: string
  index: number
}

const SocialButton = ({ href, Icon, label, gradientColor, index }: SocialButtonProps) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-12 h-12 rounded-full flex items-center justify-center ${gradientColor} text-white shadow-lg border border-white/20 backdrop-blur-sm`}
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08 }}
    whileHover={{
      scale: 1.15,
      rotate: 10,
      boxShadow: "0 0 20px rgba(139, 92, 246, 0.6)",
    }}
    whileTap={{ scale: 0.9 }}
    aria-label={label}
    title={label}
  >
    <Icon className="w-5 h-5" />
  </motion.a>
)

export function Footer() {
  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ]

  const socialLinks = [
    {
      href: "https://github.com/Psqasim",
      Icon: Github,
      label: "GitHub",
      gradientColor: "bg-gradient-to-br from-gray-700 to-gray-900",
    },
    {
      href: "https://www.linkedin.com/in/muhammad-qasim-5bba592b4/",
      Icon: Linkedin,
      label: "LinkedIn",
      gradientColor: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
    {
      href: "https://www.instagram.com/ps_qasim/",
      Icon: Instagram,
      label: "Instagram",
      gradientColor: "bg-gradient-to-br from-pink-500 to-orange-500",
    },
    {
      href: "https://x.com/psqasim0",
      Icon: Twitter,
      label: "Twitter/X",
      gradientColor: "bg-gradient-to-br from-sky-500 to-blue-600",
    },
    {
      href: "mailto:muhammadqasim0326@gmail.com",
      Icon: Mail,
      label: "Email",
      gradientColor: "bg-gradient-to-br from-red-500 to-rose-500",
    },
  ]

  return (
    <footer className="relative min-h-screen md:min-h-auto overflow-hidden bg-gradient-to-br from-[#fdfaf5] via-[#f5f0eb] to-[#f0e8e0] dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 border-t border-amber-200 dark:border-purple-800/30 transition-colors duration-300">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 dark:opacity-60">
        {[...Array(10)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.4} duration={4 + i * 0.5} />
        ))}
      </div>

      {/* Decorative anime orbs - adjusted for light mode */}
      <motion.div
        className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-200/30 dark:from-purple-600/20 to-transparent rounded-full blur-3xl"
        animate={{
          y: [0, 40, 0],
          x: [0, 20, 0],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-200/30 dark:from-blue-600/20 to-transparent rounded-full blur-3xl"
        animate={{
          y: [0, -40, 0],
          x: [0, -20, 0],
        }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      {/* Main content - Flex column to push copyright to bottom on mobile */}
      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10 flex flex-col min-h-[inherit] md:min-h-auto">
        <div className="flex flex-col lg:flex-row gap-12 flex-1">
          {/* Left Section - Main Content */}
          <div className="flex-1 space-y-8">
            {/* Header with rotating circle */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4">
                <RotatingCircle />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Muhammad Qasim</h2>
              </div>

              {/* Animated Japanese tagline with smooth floating animation */}
              <motion.p
                className="text-lg md:text-xl font-mono font-bold text-cyan-600 dark:text-cyan-400 py-1 tracking-widest"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                animate={{
                  y: [0, -5, 0],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              >
                伝説$いつも$チル$
              </motion.p>

              <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl">
                Frontend Developer crafting intelligent, future-ready web solutions with modern tech and AI innovation.
              </p>
            </motion.div>

            {/* Quick Links - Glass Morphism with warm light mode colors */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-sm font-semibold text-purple-700 dark:text-purple-400 tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                QUICK LINKS
              </h3>

              <div className="bg-white/85 dark:bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 border-2 border-amber-300 dark:border-purple-800/30 shadow-lg dark:shadow-lg dark:shadow-purple-500/10">
                <nav className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
                  {quickLinks.map((link, index) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-purple-700 dark:hover:text-purple-400 transition-colors duration-300 font-medium text-sm py-2 px-3 rounded-lg hover:bg-amber-100 dark:hover:bg-purple-500/10"
                      whileHover={{ x: 8, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <span className="text-purple-600 dark:text-purple-400 font-bold">›</span>
                      {link.label}
                    </motion.a>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Divider */}
            <motion.div
              className="h-0.5 bg-gradient-to-r from-amber-300/40 via-amber-300/60 to-amber-300/40 dark:from-purple-700/30 dark:via-purple-700/50 dark:to-purple-700/30"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </div>

          {/* Right Section - Let's Connect (Sidebar) */}
          <motion.div
            className="w-full lg:w-80 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {/* Connect Card with warm light mode colors */}
            <div className="bg-white/85 dark:bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 border-2 border-amber-300 dark:border-purple-800/30 shadow-lg dark:shadow-lg dark:shadow-purple-500/10">
              <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-1 flex items-center gap-2">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  ✨
                </motion.span>
                Let's Connect
              </h3>

              <p className="text-xs text-gray-700 dark:text-gray-400 mb-5 font-medium">
                Open for opportunities & collaborations
              </p>

              {/* Social buttons */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {socialLinks.map((link, index) => (
                  <SocialButton key={link.label} {...link} index={index} />
                ))}
              </div>
            </div>

            {/* Stats or info box with warm light mode colors */}
            <motion.div
              className="bg-gradient-to-br from-purple-200/60 to-pink-200/60 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-4 border-2 border-amber-300 dark:border-purple-800/30"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-xs text-gray-800 dark:text-gray-300 text-center font-semibold">
                🚀 Always learning, always building
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Copyright - AT FOOTER BOTTOM */}
        <motion.p
          className="text-xs md:text-sm text-gray-700 dark:text-gray-400 text-center mt-8 md:mt-auto pt-8 md:pt-0 border-t border-amber-300 dark:border-purple-800/30 py-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          © {new Date().getFullYear()} Muhammad Qasim. All rights reserved.
        </motion.p>
      </div>
    </footer>
  )
}
