"use client"
import { Github, Linkedin, Mail } from "lucide-react"
import Button from "./Button"
import { motion } from "framer-motion"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white transition-colors duration-300">
              Muhammad Qasim
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
              Frontend Developer
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 transition-colors duration-300">
              Building intelligent, scalable, and future‑ready web solutions.
            </p>
          </div>

          <div className="flex gap-6 justify-center md:justify-start mt-4 md:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center gap-2"
            >
              <Link href="https://github.com/Psqasim" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="primary"
                  size="sm"
                  className="h-16 w-16 p-4 hover:bg-gray-700 transition-all duration-300 border border-gray-300 bg-gray-800 dark:bg-gray-700 dark:border-gray-600 rounded-xl"
                >
                  <Github className="h-8 w-8 text-white" />
                </Button>
              </Link>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                GitHub
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center gap-2"
            >
              <Link
                href="https://www.linkedin.com/in/muhammad-qasim-5bba592b4/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="primary"
                  size="sm"
                  className="h-16 w-16 p-4 hover:bg-blue-600 transition-all duration-300 border border-blue-600 bg-blue-500 dark:bg-blue-600 dark:border-blue-700 rounded-xl"
                >
                  <Linkedin className="h-8 w-8 text-white" />
                </Button>
              </Link>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                LinkedIn
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center gap-2"
            >
              <Link href="mailto:muhammadqasim0326@gmail.com" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="primary"
                  size="sm"
                  className="h-16 w-16 p-4 hover:bg-red-600 transition-all duration-300 border border-red-500 bg-red-500 dark:bg-red-600 dark:border-red-700 rounded-xl"
                >
                  <Mail className="h-8 w-8 text-white" />
                </Button>
              </Link>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                Email
              </span>
            </motion.div>
          </div>

          <div className="text-center md:text-right text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300 mt-4 md:mt-0">
            <p>© {new Date().getFullYear()} Muhammad Qasim</p>
            <p className="text-xs">All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
