import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Set up image URL builder
const builder = imageUrlBuilder(client)

// Function to get image URL from Sanity image reference
export function urlFor(source: any) {
  return builder.image(source)
}

// Define the project type for consistency
interface ProjectData {
  _type: string
  title: string
  description: {
    _type: string
    children: {
      _type: string
      text: string
    }[]
    markDefs: never[]
    style: string
  }[]
  github?: string // Make github optional
  isPrivateRepo: boolean
  demo: string
  tags: string[]
  order: number
}

// Initial projects data - note that images need to be uploaded separately in Sanity Studio
const initialProjects: ProjectData[] = [
  {
    _type: "project",
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
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity io"],
    order: 1,
    // Note: You'll need to upload the image separately in the Sanity Studio
  },
  {
    _type: "project",
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
    github: "", // Empty string instead of undefined
    isPrivateRepo: true,
    demo: "https://supramk4-webiste.vercel.app",
    tags: ["HTML", "CSS"],
    order: 2,
    // Note: You'll need to upload the image separately in the Sanity Studio
  },
  {
    _type: "project",
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
    github: "", // Empty string instead of undefined
    isPrivateRepo: true,
    demo: "https://blog-website-psqasim.vercel.app",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity io"],
    order: 3,
    // Note: You'll need to upload the image separately in the Sanity Studio
  },
]

// Function to upload initial projects to Sanity
export async function uploadInitialProjects() {
  try {
    console.log("Starting to upload initial projects...")

    for (const project of initialProjects) {
      console.log(`Creating project: ${project.title}`)
      await client.create(project)
    }

    console.log("All projects uploaded successfully!")
    return { success: true }
  } catch (error) {
    console.error("Error uploading projects:", error)
    return { success: false, error }
  }
}
