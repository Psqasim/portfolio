"use client"

import { motion } from "framer-motion"
import { Code, Target, Globe, Rocket, BookOpen, Brain } from "lucide-react"
import { useEffect, useState } from "react"
import { createClient } from "next-sanity"

type Profile = { about?: string }

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  useCdn: true,
})

export function AboutMe() {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await client.fetch<Profile>(`*[_type == "profile"][0]{about}`)
        setProfile(data)
      } catch {
        setProfile(null)
      }
    }
    fetchProfile()
  }, [])

  const aboutText =
    profile?.about ||
    "I'm Muhammad Qasim, a Frontend Developer and Python enthusiast, passionate about Agentic AI, the OpenAI SDK, Prompt and Context Engineering, and Web3 technologies. I craft custom websites, e‑commerce platforms, and AI‑driven solutions tailored to client visions. Skilled in Next.js, Tailwind CSS, Sanity, Stripe, and Streamlit and actively exploring autonomous AI workflows and decentralized applications—I aim to merge modern web development with cutting‑edge AI and Web3 innovations. Open to collaboration, learning, and creating impactful digital experiences."

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center 
      bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
      py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Subtle Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.15] dark:opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-indigo-200 dark:bg-blue-900 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 sm:w-48 h-32 sm:h-48 bg-purple-200 dark:bg-purple-900 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 z-10 relative">
        {/* Left: Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4 sm:space-y-6 self-center"
        >
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 
            bg-clip-text text-transparent 
            bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
            dark:from-indigo-400 dark:via-purple-300 dark:to-pink-400"
          >
            {"About Me"}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
            {aboutText}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              {
                icon: <Code className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />,
                title: "Tech Stack",
                description: "HTML, CSS, JavaScript, TypeScript, Next.js",
              },
              {
                icon: <Target className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" />,
                title: "Goal",
                description: "Full‑stack Developer & Web3 Enthusiast",
              },
              {
                icon: <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />,
                title: "Learning",
                description: "Autonomous AI workflows and DApps",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800/70 
                backdrop-blur-sm 
                rounded-xl 
                shadow-sm
                border border-gray-200 dark:border-gray-700 
                p-3 sm:p-4 text-center space-y-2
                hover:shadow-md hover:scale-105 hover:border-indigo-300 dark:hover:border-indigo-600
                transition-all duration-300"
              >
                <div className="flex justify-center mb-2">{item.icon}</div>
                <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-snug">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Interests and Passions */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center"
        >
          <div className="w-full max-w-md bg-white dark:bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
            <h3
              className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 
            bg-clip-text text-transparent 
            bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
            dark:from-indigo-400 dark:via-purple-300 dark:to-pink-400"
            >
              {"My Interests & Passions"}
            </h3>

            <div className="space-y-3 sm:space-y-4">
              {[
                {
                  icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />,
                  title: "Web3",
                  description: "Exploring decentralized applications",
                },
                {
                  icon: <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />,
                  title: "Agentic AI",
                  description: "Autonomous AI workflows and agents",
                },
                {
                  icon: <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />,
                  title: "Continuous Learning",
                  description: "Always seeking new knowledge and skills",
                },
              ].map((interest, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 sm:space-x-4 
                  bg-gradient-to-r from-gray-50 to-blue-50/50 
                  dark:from-gray-700 dark:to-gray-700
                  p-3 sm:p-4 rounded-lg 
                  border border-gray-200 dark:border-gray-600 
                  hover:shadow-md hover:scale-[1.02] hover:border-indigo-300 dark:hover:border-indigo-600
                  transition-all duration-300"
                >
                  <div className="flex-shrink-0">{interest.icon}</div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-1">
                      {interest.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-snug">
                      {interest.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}