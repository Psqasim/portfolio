"use client";

import { motion } from "framer-motion";
import { Code, Target, Globe, Rocket, BookOpen, Brain } from "lucide-react";

export function AboutMe() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center 
      bg-gradient-to-br from-blue-50 via-white to-blue-100 
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
      py-10 px-6 relative overflow-hidden"
    >
      {/* Subtle Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 dark:bg-blue-900 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-200 dark:bg-purple-900 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-8 z-10 relative">
        {/* Left: Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6 self-center"
        >
          <h2
            className="text-4xl font-bold mb-4 
            bg-clip-text text-transparent 
            bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 
            dark:from-indigo-400 dark:via-purple-300 dark:to-pink-400"
          >
            About Me
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            "I am a creative and driven web designer with expertise in HTML,
            CSS, JavaScript, TypeScript, and Tailwind CSS. My goal is to become
            a skilled full-stack developer, with a particular interest in Web
            3.0 and AI-driven robotics. I am dedicated to building
            user-friendly, visually engaging designs and constantly exploring
            innovative technologies to enhance the user experience. Fueled by my
            commitment to continuous learning and growth, I aim to contribute
            meaningfully to cutting-edge projects that push the boundaries of
            web development and artificial intelligence.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: (
                  <Code className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                ),
                title: "Tech Stack",
                description: "HTML, CSS, JavaScript, TypeScript, NextJS",
              },
              {
                icon: (
                  <Target className="w-8 h-8 text-green-600 dark:text-green-400" />
                ),
                title: "Goal",
                description: "Full-stack Developer & Web 3.0 Enthusiast",
              },
              {
                icon: (
                  <Rocket className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                ),
                title: "Learning",
                description:
                  "Continuous growth in AI and emerging technologies",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/70 dark:bg-gray-800/70 
                backdrop-blur-lg 
                rounded-xl 
                shadow-md 
                border border-gray-100 dark:border-gray-700 
                p-4 text-center space-y-2"
              >
                <div className="flex justify-center mb-2">{item.icon}</div>
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
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
          <div className="w-full max-w-md bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-xl shadow-lg p-8">
            <h3
              className="text-2xl font-bold text-center mb-6 
            bg-clip-text text-transparent 
            bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 
            dark:from-indigo-400 dark:via-purple-300 dark:to-pink-400"
            >
              My Interests & Passions
            </h3>

            <div className="space-y-4">
              {[
                {
                  icon: (
                    <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  ),
                  title: "Web 3.0",
                  description: "Exploring decentralized web technologies",
                },
                {
                  icon: (
                    <Brain className="w-6 h-6 text-green-600 dark:text-green-400" />
                  ),
                  title: "AI & Machine Learning",
                  description:
                    "Fascinated by artificial intelligence advancements",
                },
                {
                  icon: (
                    <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  ),
                  title: "Continuous Learning",
                  description: "Always seeking new knowledge and skills",
                },
              ].map((interest, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg"
                >
                  {interest.icon}
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      {interest.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
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
  );
}
