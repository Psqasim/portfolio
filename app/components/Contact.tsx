"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Linkedin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
  };

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
            Have a project in mind? Let&apos;s connect and make something amazing
            together!
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
                icon: (
                  <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400" />
                ),
                title: "Email",
                content: "muhammadqasim0326@gmail.com",
              },
              {
                icon: (
                  <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 dark:text-emerald-400" />
                ),
                title: "Phone",
                content: "+92301-083222-7",
              },
              {
                icon: (
                  <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 dark:text-red-400" />
                ),
                title: "Location",
                content: "Karachi, Pakistan",
              },
              {
                icon: (
                  <Linkedin className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
                ),
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
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                    {contact.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {contact.content}
                  </p>
                  <Link href="https://www.linkedin.com/in/muhammad-qasim-5bba592b4/" className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                   {contact.Link}
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
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
                <label
                  htmlFor="name"
                  className="block text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-2"
                >
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
                  focus:ring-2 focus:ring-purple-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-2"
                >
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
                  focus:ring-2 focus:ring-purple-500"
                  placeholder="Your Email"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-2"
                >
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
                  focus:ring-2 focus:ring-purple-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 
                text-xs sm:text-sm
                bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 
                text-white font-semibold py-2 sm:py-3 rounded-lg sm:rounded-xl 
                hover:from-indigo-700 hover:via-purple-600 hover:to-pink-600 
                transition duration-300 
                transform hover:scale-105"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
