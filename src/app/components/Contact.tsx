"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Linkedin } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({})

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          receivedAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit the form")
      }

      setSubmitStatus({
        success: true,
        message: "Thank you! Your message has been sent successfully.",
      })

      // Clear the form after submission
      setFormData({
        name: "",
        email: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus({
        success: false,
        message: "Sorry, there was an error sending your message. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 px-4 
      bg-gradient-to-br from-blue-50 via-white to-blue-100 
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
      transition-colors duration-500"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2
            className="text-2xl sm:text-4xl font-bold mb-4 
          bg-clip-text text-transparent 
          bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 
          dark:from-indigo-400 dark:via-purple-300 dark:to-pink-400"
          >
            Contact Me
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Have a project in mind? Let&apos;s connect and make something amazing together!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6"
          >
            {[
              {
                icon: <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400" />,
                title: "Email",
                content: "muhammadqasim0326@gmail.com",
              },
              {
                icon: <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 dark:text-emerald-400" />,
                title: "Phone",
                content: "+92301-083222-7",
              },
              {
                icon: <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 dark:text-red-400" />,
                title: "Location",
                content: "Karachi, Pakistan",
              },
              {
                icon: <Linkedin className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />,
                title: "LinkedIn",
                Link: "Connect with Me on LinkedIn",
              },
            ].map((contact, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 sm:space-x-4 
                bg-white/70 dark:bg-gray-800/70 
                backdrop-blur-lg 
                rounded-xl sm:rounded-2xl 
                shadow-md sm:shadow-xl 
                border border-gray-100 dark:border-gray-700 
                p-4 sm:p-6"
              >
                {contact.icon}
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">{contact.title}</h3>
                  {contact.content && (
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{contact.content}</p>
                  )}
                  {contact.Link && (
                    <Link
                      href="https://www.linkedin.com/in/muhammad-qasim-5bba592b4/"
                      className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contact.Link}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <form
              onSubmit={handleSubmit}
              className="bg-white/70 dark:bg-gray-800/70 
              backdrop-blur-lg 
              rounded-xl sm:rounded-2xl 
              shadow-md sm:shadow-xl 
              border border-gray-100 dark:border-gray-700 
              p-5 sm:p-8 space-y-4 sm:space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 
                  text-xs sm:text-sm
                  bg-gray-100 dark:bg-gray-700 
                  border border-gray-200 dark:border-gray-600 
                  rounded-lg sm:rounded-xl 
                  focus:outline-none 
                  focus:ring-2 focus:ring-purple-500
                  text-gray-900 dark:text-white"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 
                  text-xs sm:text-sm
                  bg-gray-100 dark:bg-gray-700 
                  border border-gray-200 dark:border-gray-600 
                  rounded-lg sm:rounded-xl 
                  focus:outline-none 
                  focus:ring-2 focus:ring-purple-500
                  text-gray-900 dark:text-white"
                  placeholder="Your Email"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 
                  text-xs sm:text-sm
                  bg-gray-100 dark:bg-gray-700 
                  border border-gray-200 dark:border-gray-600 
                  rounded-lg sm:rounded-xl 
                  focus:outline-none 
                  focus:ring-2 focus:ring-purple-500
                  text-gray-900 dark:text-white"
                  placeholder="Your message"
                ></textarea>
              </div>

              {submitStatus.message && (
                <div
                  className={`p-3 rounded-lg text-sm ${submitStatus.success ? "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400" : "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-400"}`}
                >
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 
                text-xs sm:text-sm
                bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 
                text-white font-semibold py-2 sm:py-3 rounded-lg sm:rounded-xl 
                hover:from-indigo-700 hover:via-purple-600 hover:to-pink-600 
                transition duration-300 
                transform hover:scale-105
                disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
