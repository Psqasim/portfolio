"use client"

import { useState } from "react"
import Link from "next/link"
import { FaBars, FaTimes } from "react-icons/fa"
import { ThemeToggle } from "./theme-toggle"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-indigo-50 to-sky-50 dark:bg-gray-900 border-b border-indigo-100 dark:border-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-gray-900 dark:text-white transition-colors duration-300 animate-pulse">
          {`<Muhammad Qasim />`}
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex md:space-x-8 text-lg">
          {["home", "about", "projects", "skills", "contact"].map((link) => (
            <Link
              key={link}
              href={`#${link}`}
              className="relative text-gray-900 dark:text-gray-300 font-medium transition-colors duration-300 hover:text-indigo-600 dark:hover:text-blue-400 group"
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full dark:bg-blue-400"></span>
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-900 dark:text-gray-300 text-2xl transition-colors duration-300 hover:text-indigo-600 dark:hover:text-blue-400"
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
        <div className="md:hidden bg-gradient-to-r from-indigo-50 to-sky-50 dark:bg-gray-900 shadow-lg border-t border-indigo-100 dark:border-gray-800 py-4 transition-colors duration-300">
          {["home", "about", "projects", "skills", "contact"].map((link) => (
            <Link
              key={link}
              href={`#${link}`}
              className="block text-gray-900 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-blue-400 px-6 py-2 font-medium transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
