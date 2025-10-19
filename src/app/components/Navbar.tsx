"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FaBars, FaTimes } from "react-icons/fa"

type Theme = "light" | "dark" | "system"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<Theme>("system")
  const [showThemeMenu, setShowThemeMenu] = useState(false)

  // Get actual theme (resolve system preference)
  const getActualTheme = (themeValue: Theme): "light" | "dark" => {
    if (themeValue === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    return themeValue
  }

  // Initialize theme
  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as Theme) || "system"
    setTheme(savedTheme)
    
    const actualTheme = getActualTheme(savedTheme)
    document.documentElement.classList.toggle("dark", actualTheme === "dark")

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => {
      if (savedTheme === "system") {
        document.documentElement.classList.toggle("dark", mediaQuery.matches)
      }
    }
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Change theme
  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    
    const actualTheme = getActualTheme(newTheme)
    document.documentElement.classList.toggle("dark", actualTheme === "dark")
    setShowThemeMenu(false)
  }

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
        className={`bg-gradient-to-r from-indigo-50 to-sky-50 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800 border-b border-indigo-100 dark:border-gray-700 sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "shadow-lg" : "shadow-sm"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
          {/* Logo with animation */}
          <Link
            href="#home"
            className="text-lg sm:text-xl md:text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent transition-all duration-300 animate-pulse cursor-pointer hover:scale-105 transform"
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
                className="relative text-gray-900 dark:text-gray-200 font-medium transition-colors duration-300 hover:text-indigo-600 dark:hover:text-blue-400 group py-1"
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-indigo-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Theme Toggle Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="p-2 rounded-lg bg-indigo-100 dark:bg-gray-700 hover:bg-indigo-200 dark:hover:bg-gray-600 transition-all duration-300 active:scale-95"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                  </svg>
                ) : theme === "dark" ? (
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
              </button>

              {/* Theme Dropdown Menu */}
              {showThemeMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 z-50">
                  <button
                    onClick={() => changeTheme("light")}
                    className={`w-full px-4 py-2 text-left text-sm flex items-center space-x-2 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors ${
                      theme === "light" ? "text-indigo-600 dark:text-blue-400 font-medium" : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                    </svg>
                    <span>Light</span>
                  </button>
                  <button
                    onClick={() => changeTheme("dark")}
                    className={`w-full px-4 py-2 text-left text-sm flex items-center space-x-2 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors ${
                      theme === "dark" ? "text-indigo-600 dark:text-blue-400 font-medium" : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                    <span>Dark</span>
                  </button>
                  <button
                    onClick={() => changeTheme("system")}
                    className={`w-full px-4 py-2 text-left text-sm flex items-center space-x-2 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors ${
                      theme === "system" ? "text-indigo-600 dark:text-blue-400 font-medium" : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>System</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-900 dark:text-gray-200 text-xl sm:text-2xl transition-all duration-300 hover:text-indigo-600 dark:hover:text-blue-400 p-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-700 active:scale-95"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 dark:bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu - Slide from Right */}
      <div
        className={`fixed top-0 right-0 h-full w-72 sm:w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 z-50 md:hidden transition-transform duration-300 ease-in-out shadow-2xl ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-700 dark:text-gray-300 text-2xl p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 active:scale-95"
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>

        {/* Menu Links */}
        <div className="px-6 py-4 space-y-2">
          {["home", "about", "projects", "skills", "contact"].map((link, index) => (
            <Link
              key={link}
              href={`#${link}`}
              className="block text-gray-800 dark:text-gray-200 hover:text-white hover:bg-indigo-600 dark:hover:bg-blue-600 px-4 py-3 rounded-lg font-medium transition-all duration-200 text-lg active:scale-95"
              onClick={handleLinkClick}
              style={{
                animationDelay: `${index * 50}ms`,
                animation: isMenuOpen ? "slideInRight 0.3s ease-out forwards" : "none",
              }}
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            © 2025 Muhammad Qasim
          </p>
        </div>
      </div>

      {/* Close theme menu when clicking outside */}
      {showThemeMenu && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowThemeMenu(false)}
        />
      )}

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
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