"use client"

import Button from "./Button"
import Card from "./Card"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

const projects = [
  {
    title: "Project 1",
    description: "A full-stack web application built with Next.js, TypeScript and Tailwind CSS.",
    github: "https://github.com/Psqasim/hackathon-figma.git",
    demo: "https://hackathon-figma-ecommmerce-psqasim.vercel.app",
    image: "/ecommrece.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity io"],
  },
  {
    title: "Project 2",
    description:
      "A simple and responsive car website built using HTML and CSS, showcasing sleek design and optimized for all devices.",
    github: "https://github.com/Psqasim/supramk4-webiste.git",
    demo: "https://supramk4-webiste.vercel.app",
    image: "/car.png",
    tags: ["HTML", "CSS"],
  },
  {
    title: "Project 3",
    description:
      "Developed a dynamic blog website using Next.js, Tailwind CSS, and Sanity.io for seamless content management.",
    github: "https://github.com/Psqasim/Blog-Website.git",
    demo: "https://blog-website-psqasim.vercel.app",
    image: "/blogwebsite.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity io"],
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-16 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800 dark:text-white">Featured Projects</h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="h-full flex flex-col overflow-hidden group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-3">
                      <Button size="sm" variant="secondary" asChild className="flex-1">
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </a>
                      </Button>
                      <Button size="sm" variant="primary" asChild className="flex-1">
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col text-gray-900 dark:text-gray-100">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}