"use client";

import Button from './Button';
import Card from './Card';
import { Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const projects = [
    {
      title: "Project 1",
      description: "A full-stack web application built with Next.js and TypeScript.",
      github: "https://github.com",
      demo: "https://demo.com",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"]
    },
    {
      title: "Project 2",
      description: "An e-commerce platform with real-time updates and cart functionality.",
      github: "https://github.com",
      demo: "https://demo.com",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
      tags: ["React", "Node.js", "MongoDB"]
    },
    {
      title: "Project 3",
      description: "A responsive dashboard with data visualization and analytics.",
      github: "https://github.com",
      demo: "https://demo.com",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      tags: ["Vue.js", "D3.js", "Firebase"]
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