"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaMoon, FaSun, FaDesktop, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [theme, setTheme] = useState("system");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "system";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  const applyTheme = (theme: string) => {
    const root = document.documentElement;
    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", prefersDark);
    } else {
      root.classList.toggle("dark", theme === "dark");
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-gray-800 dark:text-white">
          {`<Muhammad Qasim />`}
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 dark:text-gray-300 text-2xl"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:space-x-8 text-lg absolute md:relative top-16 md:top-auto left-0 w-full md:w-auto bg-white dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent shadow-md md:shadow-none z-20`}
        >
          <Link href="#home" className="block md:inline text-gray-700 dark:text-gray-300 hover:text-blue-500 px-4 py-2">
            Home
          </Link>
          <Link href="#about" className="block md:inline text-gray-700 dark:text-gray-300 hover:text-blue-500 px-4 py-2">
            About
          </Link>
          <Link href="#projects" className="block md:inline text-gray-700 dark:text-gray-300 hover:text-blue-500 px-4 py-2">
            Projects
          </Link>
          <Link href="#skills" className="block md:inline text-gray-700 dark:text-gray-300 hover:text-blue-500 px-4 py-2">
            Skills
          </Link>
          <Link href="#contact" className="block md:inline text-gray-700 dark:text-gray-300 hover:text-blue-500 px-4 py-2">
            Contact
          </Link>
        </div>

        {/* Theme Toggle */}
        <div className="relative z-30">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FaMoon className="text-xl text-gray-700 dark:text-gray-300" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-50">
              <button
                onClick={() => toggleTheme("light")}
                className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <FaSun className="mr-2" /> Light Mode
              </button>
              <button
                onClick={() => toggleTheme("dark")}
                className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <FaMoon className="mr-2" /> Dark Mode
              </button>
              <button
                onClick={() => toggleTheme("system")}
                className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <FaDesktop className="mr-2" /> System Mode
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
