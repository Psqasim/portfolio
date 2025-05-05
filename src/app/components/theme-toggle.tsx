"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { FaMoon, FaSun, FaDesktop } from "react-icons/fa"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder with the same dimensions to prevent layout shift
    return <div className="w-10 h-10"></div>
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const selectTheme = (newTheme: string) => {
    setTheme(newTheme)
    setIsDropdownOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <FaMoon className="text-xl text-blue-400" />
        ) : theme === "light" ? (
          <FaSun className="text-xl text-yellow-500" />
        ) : (
          <FaDesktop className="text-xl text-gray-700 dark:text-gray-300" />
        )}
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700 overflow-hidden">
          <button
            onClick={() => selectTheme("light")}
            className="flex items-center w-full px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FaSun className="mr-3 text-yellow-500" /> Light Mode
          </button>
          <button
            onClick={() => selectTheme("dark")}
            className="flex items-center w-full px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FaMoon className="mr-3 text-blue-400" /> Dark Mode
          </button>
          <button
            onClick={() => selectTheme("system")}
            className="flex items-center w-full px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FaDesktop className="mr-3 text-gray-600 dark:text-gray-400" /> System Mode
          </button>
        </div>
      )}
    </div>
  )
}
