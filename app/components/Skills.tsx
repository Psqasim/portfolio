"use client"

import { motion } from 'framer-motion';
import { Code, Database, Cloud, GitBranch, Wrench } from 'lucide-react'; // Replaced Tools with Wrench icon

const skills = [
  {
    name: "Next.js",
    icon: <Code className="h-8 w-8 text-blue-600" />,
    description: "Modern React framework for production with built-in TypeScript support.",
  },
  {
    name: "TypeScript",
    icon: <Code className="h-8 w-8 text-blue-500" />,
    description: "A statically typed superset of JavaScript that provides type-checking and advanced features.",
  },
  {
    name: "Tailwind CSS",
    icon: <Wrench className="h-8 w-8 text-teal-500" />, // Updated to Wrench icon
    description: "A utility-first CSS framework for creating custom designs without writing custom CSS.",
  },
  {
    name: "HTML",
    icon: <Database className="h-8 w-8 text-orange-500" />, // Replaced MongoDB with HTML
    description: "The standard markup language for documents designed to be displayed in a web browser.",
  },
  {
    name: "Git",
    icon: <GitBranch className="h-8 w-8 text-orange-500" />,
    description: "Distributed version control system for tracking code changes across multiple repositories.",
  },
  {
    name: "CSS",
    icon: <Cloud className="h-8 w-8 text-yellow-600" />, // Replaced AWS with CSS
    description: "Style sheet language used for describing the presentation of a document written in HTML or XML.",
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-16 px-4 bg-muted/50 dark:bg-muted/90 transition-colors duration-500">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-muted-foreground dark:text-white">
            My Skills
          </h2>
          <p className="text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto">
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
              className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300"
            >
              <div className="mb-4">
                {skill.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{skill.name}</h3>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
