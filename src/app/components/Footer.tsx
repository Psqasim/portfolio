"use client"
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react"
import Button from "./Button"
import { motion } from "framer-motion"
import Link from "next/link"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const socialLinks = [
    {
      href: "https://github.com/Psqasim",
      icon: Github,
      label: "GitHub",
      bgColor: "bg-gray-800 dark:bg-gray-700",
      hoverColor: "hover:bg-gray-700 dark:hover:bg-gray-600",
      borderColor: "border-gray-300 dark:border-gray-600",
    },
    {
      href: "https://www.linkedin.com/in/muhammad-qasim-5bba592b4/",
      icon: Linkedin,
      label: "LinkedIn",
      bgColor: "bg-blue-500 dark:bg-blue-600",
      hoverColor: "hover:bg-blue-600 dark:hover:bg-blue-700",
      borderColor: "border-blue-600 dark:border-blue-700",
    },
    {
      href: "mailto:muhammadqasim0326@gmail.com",
      icon: Mail,
      label: "Email",
      bgColor: "bg-red-500 dark:bg-red-600",
      hoverColor: "hover:bg-red-600 dark:hover:bg-red-700",
      borderColor: "border-red-500 dark:border-red-700",
      isEmail: true,
    },
  ]

  const navLinks = ["home", "about", "skills", "projects", "contact"]

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Left Section: Branding */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-xl md:text-2xl text-gray-800 dark:text-white transition-colors duration-300">
              Muhammad Qasim
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 transition-colors duration-300 mt-1">
              Frontend Developer
            </p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-500 transition-colors duration-300 max-w-xs mx-auto md:mx-0 mt-2 leading-relaxed">
              Building intelligent, scalable, and future‑ready web solutions.
            </p>
          </div>

          {/* Middle Section: Navigation Links */}
          <div className="text-center md:text-left lg:justify-self-center">
            <h4 className="font-semibold text-base md:text-lg text-gray-800 dark:text-white mb-4 md:mb-5">
              Quick Links
            </h4>
            <nav 
              className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-5 text-sm md:text-base"
              aria-label="Footer navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link}
                  href={`#${link}`}
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-blue-400 transition-all duration-300 capitalize font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded"
                >
                  {link}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Section: Social Media */}
          <div className="flex flex-col items-center md:items-end lg:justify-self-end">
            <h4 className="font-semibold text-base md:text-lg text-gray-800 dark:text-white mb-3 md:mb-4">
              Connect
            </h4>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.label}
                  whileHover={{ y: -5 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col items-center gap-2"
                >
                  <Link 
                    href={social.href} 
                    target={social.isEmail ? undefined : "_blank"}
                    rel={social.isEmail ? undefined : "noopener noreferrer"}
                    aria-label={`Visit ${social.label}`}
                  >
                    <Button
                      variant="primary"
                      size="sm"
                      className={`h-11 w-11 md:h-12 md:w-12 p-2.5 md:p-3 ${social.bgColor} ${social.hoverColor} transition-all duration-300 border ${social.borderColor} rounded-xl shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900`}
                    >
                      <social.icon className="h-5 w-5 md:h-6 md:w-6 text-white" aria-hidden="true" />
                    </Button>
                  </Link>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    {social.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Back to Top Button - Centered on all screens */}
        <div className="flex justify-center mt-8 md:mt-10">
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-full shadow-md transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
            <span className="text-sm md:text-base font-medium">Back to Top</span>
          </motion.button>
        </div>

        {/* Copyright Info */}
        <div className="text-center text-sm md:text-base text-gray-600 dark:text-gray-400 transition-colors duration-300 mt-8 md:mt-10 pt-6 md:pt-8">
          <p className="font-medium">
            © {new Date().getFullYear()} Muhammad Qasim. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}