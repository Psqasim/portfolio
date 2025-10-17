"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FaBars, FaTimes } from "react-icons/fa"
import { ThemeToggle } from "./theme-toggle"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <nav
        className={`bg-gradient-to-r from-indigo-50 to-sky-50 dark:bg-gray-900 border-b border-indigo-100 dark:border-gray-800 sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "shadow-lg" : "shadow-sm"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="#home"
            className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white transition-colors duration-300 animate-pulse cursor-pointer hover:scale-105 transform"
            onClick={() => setIsMenuOpen(false)}
          >
            {`<Muhammad Qasim />`}
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:space-x-4 lg:space-x-8 text-sm lg:text-base xl:text-lg">
            {["home", "about", "projects", "skills", "contact"].map((link) => (
              <Link
                key={link}
                href={`#${link}`}
                className="relative text-gray-900 dark:text-gray-300 font-medium transition-colors duration-300 hover:text-indigo-600 dark:hover:text-blue-400 group py-1"
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full dark:bg-blue-400"></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-900 dark:text-gray-300 text-xl sm:text-2xl transition-all duration-300 hover:text-indigo-600 dark:hover:text-blue-400 p-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-800 active:scale-95"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown - Smooth transition */}
        <div
          className={`md:hidden bg-gradient-to-r from-indigo-50 to-sky-50 dark:bg-gray-900 border-t border-indigo-100 dark:border-gray-800 transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-2 sm:py-4 px-4 sm:px-6 space-y-1">
            {["home", "about", "projects", "skills", "contact"].map((link, index) => (
              <Link
                key={link}
                href={`#${link}`}
                className="block text-gray-900 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-blue-400 hover:bg-indigo-100 dark:hover:bg-gray-800 px-4 py-3 rounded-lg font-medium transition-all duration-200 text-base sm:text-lg active:scale-95"
                onClick={handleLinkClick}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: isMenuOpen ? "slideIn 0.3s ease-out forwards" : "none",
                }}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu - Prevents interaction with content below */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  )
}