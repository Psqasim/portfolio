"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-blue-50 to-gray-300 dark:from-gray-800 dark:to-gray-900 py-10 px-6"
    >
      {/* Left: Text Section */}
      <div className="text-center md:text-left md:w-1/2 space-y-4">
        <motion.h1
          className="text-5xl font-bold text-gray-800 dark:text-white leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Welcome to <span className="text-blue-500">Muhammad Qasim's</span> Portfolio
        </motion.h1>

        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          I am a passionate web developer specializing in creating stunning user experiences and robust applications.
        </motion.p>

        {/* Buttons Section */}
        <motion.div
          className="flex justify-center md:justify-start space-x-4 mt-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="#contact"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 dark:hover:bg-blue-700 transition duration-300"
          >
            Contact Me
          </a>
          <a
            href="/Muhammad_Qasim_CV.pdf" // Replace with your CV file path
            download
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
          >
            Download CV
          </a>
        </motion.div>
      </div>

      {/* Right: Image Section */}
      <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
        <motion.div
          className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-lg border-4 border-blue-500"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <Image
            src="/qas.jpg" // Replace with your image
            alt="Muhammad Qasim"
            layout="fill"
            objectFit="cover"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
