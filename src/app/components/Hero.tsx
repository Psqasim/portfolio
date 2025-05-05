"use client"

import { motion } from "framer-motion"
import { Download, MessageCircle } from "lucide-react"
import Image from "next/image"

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center 
      bg-gradient-to-br from-blue-50 via-white to-blue-100 
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
      py-10 px-6 relative overflow-hidden"
    >
      {/* Subtle Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-300 dark:bg-blue-900 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-300 dark:bg-purple-900 rounded-full blur-3xl"></div>
      </div>

      {/* Left: Text Section */}
      <div className="text-center md:text-left md:w-1/2 space-y-6 z-10 relative">
        <motion.h1
          className="text-5xl font-bold text-gray-800 dark:text-white leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
        >
          Welcome to{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-300 dark:to-pink-400 animate-pulse">
            &apos;Muhammad Qasim&apos;s
          </span>{" "}
          Portfolio
        </motion.h1>

        <motion.p
          className="text-lg text-gray-700 dark:text-gray-300 max-w-md mx-auto md:mx-0"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
        >
          "Passionate full-stack web developer with hands-on experience in building dynamic and responsive websites using HTML, CSS, Tailwind CSS, TypeScript, Next.js, Sanity.io, Stripe, and Clerk."
        </motion.p>

        {/* Buttons Section */}
        <motion.div
          className="flex justify-center md:justify-start space-x-4 mt-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 120 }}
        >
          <a
            href="#contact"
            className="flex items-center gap-2 px-6 py-3 
            bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-md 
            hover:from-blue-700 hover:to-purple-700 
            transition duration-300 ease-in-out transform 
            hover:-translate-y-1 hover:scale-105"
          >
            <MessageCircle size={20} />
            Contact Me
          </a>
          <a
            href="/QasimCv.pdf"
            download
            className="flex items-center gap-2 px-6 py-3 
            bg-gray-100 dark:bg-gray-800 
            text-gray-700 dark:text-gray-300 
            font-semibold rounded-xl shadow-md
            hover:bg-gray-200 dark:hover:bg-gray-700 
            transition duration-300 ease-in-out transform 
            hover:-translate-y-1 hover:scale-105"
          >
            <Download size={20} />
            Download CV
          </a>
        </motion.div>
      </div>

      {/* Right: Image Section */}
      <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
        <motion.div
          className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-xl border-4 border-blue-500 dark:border-blue-600"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <Image src="/qas.jpg" alt="Muhammad Qasim" layout="fill" objectFit="cover" priority />
        </motion.div>
      </div>
    </section>
  )
}
