"use client"

import type React from "react"
import { Github, Linkedin, Mail, Code, Twitter, Sparkles, Circle } from "lucide-react"
import { motion } from "framer-motion"

// Floating sakura petals animation
const SakuraPetal = ({ delay, duration }: { delay: number; duration: number }) => (
  <motion.div
    className="absolute w-2 h-2 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full opacity-60"
    animate={{
      y: [0, 100, 200],
      x: [0, Math.sin(delay * 2) * 60, Math.cos(delay) * 40],
      rotate: [0, 180, 360],
      opacity: [0.8, 0.4, 0],
    }}
    transition={{
      duration,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeOut",
      delay,
    }}
    style={{
      left: `${Math.random() * 100}%`,
      top: `-${Math.random() * 20}%`,
    }}
  />
)

// Japanese kanji animation component
const KanjiCircle = () => (
  <motion.div
    className="relative w-16 h-16 flex items-center justify-center"
    animate={{ rotate: 360 }}
    transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
  >
    <motion.div
      className="absolute inset-0 rounded-full border-2 border-rose-500"
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
    />

    <motion.div
      className="absolute inset-3 rounded-full border border-dashed border-pink-500"
      animate={{ rotate: -360 }}
      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
    />

    <span className="text-2xl font-bold text-rose-600">夢</span>
  </motion.div>
)

// Social icon with anime-style hover
interface SocialIconProps {
  href: string
  Icon: React.ComponentType<{ className?: string }>
  label: string
  bgColor: string
  index: number
}

const SocialIcon = ({ href, Icon, label, bgColor, index }: SocialIconProps) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-11 h-11 rounded-xl flex items-center justify-center ${bgColor} text-white shadow-md border border-white/30 backdrop-blur-sm relative overflow-hidden group`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    whileHover={{
      scale: 1.2,
      rotate: 5,
      boxShadow: "0 8px 25px rgba(236, 72, 153, 0.4)",
    }}
    whileTap={{ scale: 0.85 }}
    aria-label={label}
    title={label}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
      initial={{ x: "-100%" }}
      whileHover={{ x: "100%" }}
      transition={{ duration: 0.5 }}
    />
    <Icon className="w-5 h-5 relative z-10" />
  </motion.a>
)

// Wave divider component
const WaveDivider = () => (
  <motion.div
    className="absolute top-0 left-0 w-full overflow-hidden leading-none"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
  >
    <svg
      className="relative block w-full h-12 md:h-16"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
        className="fill-white"
        animate={{
          d: [
            "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
            "M321.39,70c58-15,114.16-25,172-35,82.39-12,168.19-10,250.45,5C823.78,55,906.67,80,985.66,95c70.05,15,146.53,20,214.34,0V0H0V40A600.21,600.21,0,0,0,321.39,70Z",
            "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </svg>
  </motion.div>
)

export function AnimeFooter() {
  const navigationLinks = [
    { name: "Home", path: "#home" },
    { name: "Projects", path: "#projects" },
    { name: "About", path: "#about" },
    { name: "Skills", path: "#skills" },
    { name: "Contact", path: "#contact" },
  ]

  const socialConnections = [
    {
      href: "https://github.com/Psqasim",
      Icon: Github,
      label: "GitHub",
      bgColor: "bg-gradient-to-br from-gray-600 to-gray-800",
    },
    {
      href: "https://www.linkedin.com/in/muhammad-qasim-5bba592b4",
      Icon: Linkedin,
      label: "LinkedIn",
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-700",
    },
    {
      href: "mailto:muhammadqasim0326@gmail.com",
      Icon: Mail,
      label: "Email",
      bgColor: "bg-gradient-to-br from-red-500 to-pink-600",
       isEmail: true,
    },
    {
      href: "https://x.com/psqasim0",
      Icon: Twitter,
      label: "Twitter",
      bgColor: "bg-gradient-to-br from-blue-400 to-blue-600",
    },
  ]

  return (
    <footer className="footer-container relative min-h-auto overflow-hidden bg-white transition-colors duration-500">
      {/* Wave divider at top */}
      <WaveDivider />

      {/* Animated sakura petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        {[...Array(15)].map((_, i) => (
          <SakuraPetal key={i} delay={i * 0.6} duration={5 + i * 0.3} />
        ))}
      </div>

      {/* Glowing orbs background */}
      <motion.div
        className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-rose-300/20 to-transparent rounded-full blur-3xl"
        animate={{
          y: [0, 50, 0],
          x: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-purple-300/20 to-transparent rounded-full blur-3xl"
        animate={{
          y: [0, -50, 0],
          x: [0, -30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      {/* Main content container */}
      <div className="container mx-auto px-6 py-16 md:py-20 relative z-10 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left Column - Brand & Description */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Brand header with kanji circle */}
            <div className="space-y-4">
              <div className="flex items-center gap-5">
                <KanjiCircle />
                <div>
                  <h1>
                    <motion.p
                    className="text-4xl md:text-5xl font-bold  text-pink-600 mt-1 tracking-wide"
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    MUHAMMAD QASIM
                  </motion.p>
                  </h1>
                  <motion.p
                    className="text-base md:text-lg font-mono font-semibold text-pink-600 mt-1 tracking-wide"
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    夢を追いかけて • Chasing Dreams
                  </motion.p>
                </div>
              </div>

              <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-2xl">
                Crafting digital experiences with passion and precision. Where creativity meets innovation in every
                pixel.
              </p>
            </div>

            {/* Navigation links in glass card */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-sm font-bold text-rose-600 tracking-wider flex items-center gap-2 uppercase">
                <Circle className="w-3 h-3 fill-current" />
                Navigation
              </h3>

              <div className="glass-card rounded-3xl p-6 md:p-8 border-2 border-rose-200 shadow-xl">
                <nav className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {navigationLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.path}
                      className="flex items-center gap-2 text-gray-800 hover:text-rose-600 transition-colors duration-300 font-semibold text-sm md:text-base py-2 px-4 rounded-xl hover:bg-rose-100 group"
                      whileHover={{ x: 6, scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.06 }}
                    >
                      <span className="text-rose-600 text-lg group-hover:scale-125 transition-transform">›</span>
                      {link.name}
                    </motion.a>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Decorative quote with anime styling */}
            <motion.div
              className="quote-card bg-gradient-to-r from-rose-100 via-pink-100 to-purple-100 rounded-2xl p-6 border-l-4 border-rose-500"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-gray-800 text-sm md:text-base italic font-medium flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <span>"The future belongs to those who believe in the beauty of their dreams."</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Connect Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {/* Connect card */}
            <div className="glass-card  backdrop-blur-xl rounded-3xl p-7 border-2 border-rose-200 shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-rose-600 mb-2 flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    🌸
                  </motion.span>
                  Let's Connect
                </h3>
                <p className="text-xs text-gray-600 font-medium">
                  Reach out for collaborations or just a friendly hello
                </p>
              </div>

              {/* Social icons grid */}
              <div className="flex flex-wrap gap-3 justify-center">
                {socialConnections.map((link, index) => (
                  <SocialIcon key={link.label} {...link} index={index} />
                ))}
              </div>
            </div>

            {/* Code stats */}
            <motion.div
              className="stats-card bg-white  rounded-2xl p-5 border-2 border-purple-300 text-center"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-sm text-gray-800 font-semibold flex items-center justify-center gap-2">
                <Code className="w-4 h-4 text-purple-600" />
                Building the future, one line at a time
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Copyright section at bottom */}
        <motion.div
          className="mt-12 pt-12 border-t-2 border-rose-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-700 text-center md:text-left">
              © {new Date().getFullYear()} MUAHAMMAD QASIM All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default AnimeFooter
