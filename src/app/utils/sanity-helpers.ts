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
  github?: string // optional to support private repos
  isPrivateRepo: boolean
  demo: string
  tags: string[]
  order: number
}

// Initial projects data
const initialProjects: ProjectData[] = [
  {
    _type: "project",
    title: "Project 1",
    description: [
      {
        _type: "block",
        children: [
          { _type: "span", text: "A full-stack web application built with Next.js, TypeScript and Tailwind CSS." },
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
    github: "",
    isPrivateRepo: true,
    demo: "https://supramk4-webiste.vercel.app",
    tags: ["HTML", "CSS"],
    order: 2,
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
    github: "",
    isPrivateRepo: true,
    demo: "https://blog-website-psqasim.vercel.app",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity io"],
    order: 3,
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

// ---------- New: Profile and Skills seeding ----------

const initialProfile = {
  _id: "profileSingleton",
  _type: "profile",
  name: "Muhammad Qasim",
  shortBio:
    "Frontend Developer and Python Enthusiast exploring Agentic AI, the OpenAI SDK, and Web3. Building intelligent, scalable, and future‑ready web solutions with modern tech.",
  about:
    "I’m Muhammad Qasim, a Frontend Developer and Python enthusiast, passionate about Agentic AI, the OpenAI SDK, Prompt and Context Engineering, and Web3 technologies. I craft custom websites, e‑commerce platforms, and AI‑driven solutions tailored to client visions. Skilled in Next.js, Tailwind CSS, Sanity, Stripe, and Streamlit—and actively exploring autonomous AI workflows and decentralized applications—I aim to merge modern web development with cutting‑edge AI and Web3 innovations. Open to collaboration, learning, and creating impactful digital experiences.",
  email: "muhammadqasim0326@gmail.com",
  github: "https://github.com/Psqasim",
  linkedin: "https://www.linkedin.com/in/muhammad-qasim-5bba592b4/",
}

const initialSkills = [
  { _id: "skill-nextjs", _type: "skill", name: "Next.js", order: 1 },
  { _id: "skill-typescript", _type: "skill", name: "TypeScript", order: 2 },
  { _id: "skill-tailwind", _type: "skill", name: "Tailwind CSS", order: 3 },
  { _id: "skill-html", _type: "skill", name: "HTML", order: 4 },
  { _id: "skill-git", _type: "skill", name: "Git", order: 5 },
  { _id: "skill-css", _type: "skill", name: "CSS", order: 6 },
  // New requested skills
  { _id: "skill-python", _type: "skill", name: "Python", order: 7 },
  { _id: "skill-vercel", _type: "skill", name: "Vercel", order: 8 },
  { _id: "skill-context-api", _type: "skill", name: "Context-API", order: 9 },
  { _id: "skill-fastapi", _type: "skill", name: "FastAPI", order: 10 },
  { _id: "skill-npm", _type: "skill", name: "NPM", order: 11 },
  { _id: "skill-nodejs", _type: "skill", name: "NodeJs", order: 12 },
  { _id: "skill-figma", _type: "skill", name: "Figma", order: 13 },
  { _id: "skill-github", _type: "skill", name: "GitHub", order: 14 },
  { _id: "skill-markdown", _type: "skill", name: "Markdown", order: 15 },
]

export async function uploadProfileAndSkills() {
  try {
    console.log("Seeding profile and skills...")
    // Profile as singleton
    // @ts-ignore - createIfNotExists exists on the Sanity client
    await client.createIfNotExists(initialProfile)

    // Upsert skills by fixed IDs
    for (const s of initialSkills) {
      // @ts-ignore
      await client.createIfNotExists(s)
    }

    return { success: true }
  } catch (error) {
    console.error("Error seeding profile/skills:", error)
    return { success: false, error }
  }
}
