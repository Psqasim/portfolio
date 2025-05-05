"use client"

import { useState } from "react"
import Link from "next/link"
import { FaBars, FaTimes } from "react-icons/fa"
import { ThemeToggle } from "./theme-toggle"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-gray-800 dark:text-white transition-colors duration-300 animate-pulse">
          {`<Muhammad Qasim />`}
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex md:space-x-8 text-lg">
          <Link
            href="#home"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="#about"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
          >
            About
          </Link>
          <Link
            href="#projects"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
          >
            Projects
          </Link>
          <Link
            href="#skills"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
          >
            Skills
          </Link>
          <Link
            href="#contact"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300 text-2xl transition-colors duration-300"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md py-4 transition-colors duration-300">
          <Link
            href="#home"
            className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 px-6 py-2 transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="#about"
            className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 px-6 py-2 transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="#projects"
            className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 px-6 py-2 transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
          </Link>
          <Link
            href="#skills"
            className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 px-6 py-2 transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Skills
          </Link>
          <Link
            href="#contact"
            className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 px-6 py-2 transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  )
}
