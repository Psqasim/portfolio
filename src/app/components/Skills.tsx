"use client"

import { motion } from 'framer-motion';
import { Code, Database, Cloud, GitBranch, Wrench } from 'lucide-react';

const skills = [
  {
    name: "Next.js",
    icon: <Code className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />,
    description: "Modern React framework for production with built-in TypeScript support.",
  },
  {
    name: "TypeScript",
    icon: <Code className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    description: "A statically typed superset of JavaScript that provides type-checking and advanced features.",
  },
  {
    name: "Tailwind CSS",
    icon: <Wrench className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />,
    description: "A utility-first CSS framework for creating custom designs without writing custom CSS.",
  },
  {
    name: "HTML",
    icon: <Database className="h-8 w-8 text-orange-600 dark:text-orange-400" />,
    description: "The standard markup language for documents designed to be displayed in a web browser.",
  },
  {
    name: "Git",
    icon: <GitBranch className="h-8 w-8 text-red-600 dark:text-red-400" />,
    description: "Distributed version control system for tracking code changes across multiple repositories.",
  },
  {
    name: "CSS",
    icon: <Cloud className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
    description: "Style sheet language used for describing the presentation of a document written in HTML or XML.",
  },
];

export function Skills() {
  return (
    <section 
      id="skills" 
      className="py-16 px-4 
      bg-gradient-to-br from-blue-50 via-white to-blue-100 
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
      transition-colors duration-500"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 
          bg-clip-text text-transparent 
          bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 
          dark:from-indigo-400 dark:via-purple-300 dark:to-pink-400">
            My Skills
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Here are the technologies and tools I use to build amazing web experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center p-6 
              bg-white/70 dark:bg-gray-800/70 
              backdrop-blur-lg 
              rounded-2xl 
              shadow-xl 
              border border-gray-100 dark:border-gray-700 
              hover:scale-105 
              transform transition-all duration-300 
              hover:shadow-2xl"
            >
              <div className="mb-4">
                {skill.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {skill.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                {skill.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}