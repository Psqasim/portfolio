"use client";

import Button from './Button';
import Card from './Card';
import { Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const projects = [
    {
      title: "Project 1",
      description: "A full-stack web application built with Next.js,TypeScript and Tailwind Css.",
      github: "https://github.com/Psqasim/hackathon-figma.git",
      demo: "https://hackathon-figma-ecommmerce.vercel.app",
      image: "/ecommrece.png",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"]
    },
    {
      title: "Project 2",
      description: "A simple and responsive car website built using HTML and CSS, showcasing sleek design and optimized for all devices.",
      github: "https://github.com/Psqasim/supramk4-webiste.git",
      demo: "https://supramk4-webiste.vercel.app",
      image: "/car.png",
      tags: ["HTML","CSS"]
    },
    {
      title: "Project 3",
      description: "A responsive resume builder created with HTML and CSS, offering a seamless and modern user experience.",
      github: "https://github.com/Psqasim/resume-builder.git",
      demo: "https://resume-builder-lake-nine.vercel.app",
      image: "/resume.png",
      tags:  ["HTML","CSS"]
    }
  ];
  
  export function Projects() {
    return (
      <section id="projects" className="py-16 px-4 bg-gradient-to-r from-blue-[10] to-gray-[140] dark:from-gray-600 dark:to-gray-900 transition-colors duration-500">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-muted-foreground dark:text-white ">
              Featured Projects
            </h2>
            <p className="text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto dark:text-white ">
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
                <Card className="h-full flex flex-col overflow-hidden group bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-300">
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center gap-4">
                      <Button size="sm" variant="secondary" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4 text-white" />
                          Code
                        </a>
                      </Button>
                      <Button size="sm" variant="secondary" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4 text-white" />
                          Demo
                        </a>
                      </Button>
                    </div>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col text-gray-900 dark:text-gray-100">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground dark:text-muted-foreground mb-4 flex-1">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium dark:bg-blue-600 dark:text-white"
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
    );
  }