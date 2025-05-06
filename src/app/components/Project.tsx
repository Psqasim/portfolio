"use client"

import Button from "./Button"
import Card from "./Card"
import { Github, ExternalLink, Lock } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { createClient } from "next-sanity"
import { PortableText, type PortableTextReactComponents } from "@portabletext/react"

// Define the Project type
interface Project {
  _id: string
  title: string
  description: any[] // Portable Text is an array of blocks
  github?: string
  isPrivateRepo?: boolean
  demo: string
  image: {
    asset: {
      _id: string
      url: string
    }
  }
  tags: string[]
}

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  useCdn: true,
})

// Portable Text components
const portableTextComponents: Partial<PortableTextReactComponents> = {
  types: {},
  marks: {},
  block: {
    // @ts-ignore - the type definitions are incorrect but this works
    normal: ({ children }) => <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm">{children}</p>,
  },
}

// Fallback projects in case Sanity data isn't available
const fallbackProjects = [
  {
    _id: "1",
    title: "Project 1",
    description: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "A full-stack web application built with Next.js, TypeScript and Tailwind CSS.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    github: "https://github.com/Psqasim/hackathon-figma.git",
    isPrivateRepo: false,
    demo: "https://hackathon-figma-ecommmerce-psqasim.vercel.app",
    image: {
      asset: {
        _id: "placeholder",
        url: "/ecommrece.png",
      },
    },
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity io"],
  },
  {
    _id: "2",
    title: "Project 2",
    description: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "A simple and responsive car website built using HTML and CSS, showcasing sleek design and optimized for all devices.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    github: "",
    isPrivateRepo: true,
    demo: "https://supramk4-webiste.vercel.app",
    image: {
      asset: {
        _id: "placeholder",
        url: "/car.png",
      },
    },
    tags: ["HTML", "CSS"],
  },
  {
    _id: "3",
    title: "Project 3",
    description: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Developed a dynamic blog website using Next.js, Tailwind CSS, and Sanity.io for seamless content management.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    github: "",
    isPrivateRepo: true,
    demo: "https://blog-website-psqasim.vercel.app",
    image: {
      asset: {
        _id: "placeholder",
        url: "/blogwebsite.png",
      },
    },
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity io"],
  },
]

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await client.fetch<Project[]>(`
          *[_type == "project"] | order(order asc) {
            _id,
            title,
            description,
            github,
            isPrivateRepo,
            demo,
            "image": {
              "asset": {
                "_id": image.asset._id,
                "url": image.asset->url
              }
            },
            tags
          }
        `)

        if (data && data.length > 0) {
          console.log("Fetched projects:", data)
          setProjects(data)
        } else {
          console.log("No projects found, using fallback")
          setProjects(fallbackProjects)
        }
      } catch (error) {
        console.error("Error fetching projects:", error)
        setProjects(fallbackProjects)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

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
          {projects.map((project, index) => {
            // Get the image URL
            const imageUrl = project.image?.asset?.url || `/placeholder.png?text=${encodeURIComponent(project.title)}`

            // Determine if repo is private (either explicitly marked or has no GitHub URL)
            const isPrivate = project.isPrivateRepo || !project.github || project.github === ""

            return (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="h-full flex flex-col overflow-hidden group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <Image
                      src={imageUrl || "/placeholder.png"}
                      alt={project.title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-3">
                        {isPrivate ? (
                          <Button size="sm" variant="secondary" className="flex-1 cursor-default opacity-90">
                            <div className="flex items-center justify-center">
                              <Lock className="mr-2 h-4 w-4" />
                              Code
                            </div>
                          </Button>
                        ) : (
                          <Button size="sm" variant="secondary" asChild className="flex-1">
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center"
                            >
                              <Github className="mr-2 h-4 w-4" />
                              Code
                            </a>
                          </Button>
                        )}
                        <Button size="sm" variant="primary" asChild className="flex-1">
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Demo
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col text-gray-900 dark:text-gray-100">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <div className="mb-4 flex-1">
                      <PortableText value={project.description} components={portableTextComponents} />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.tags &&
                        project.tags.map((tag, tagIndex) => (
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
            )
          })}
        </div>
      </div>
    </section>
  )
}
