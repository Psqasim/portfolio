"use client"

import Button from './Button';
import Card from './Card';
import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export function Contact() {
  return (
    <section id="contact" className="py-16 px-4 bg-muted/50 dark:bg-muted/90 transition-colors duration-500">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-muted-foreground dark:text-white">
            Get In Touch
          </h2>
          <p className="text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto">
            Feel free to reach out for collaborations or just a friendly hello!
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="flex flex-col items-center gap-2"
          >
            <Button
              variant="primary"
              size="sm"
              className="h-16 w-16 p-4 hover:bg-gray-800 transition-all duration-300 border border-gray-800 dark:border-white bg-gray-800 dark:bg-gray-800"
            >
              <Github className="h-8 w-8 text-white dark:text-white" />
            </Button>
            <span className="text-sm font-medium text-muted-foreground dark:text-muted-foreground">GitHub</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center gap-2"
          >
            <Button
              variant="primary"
              size="sm"
              className="h-16 w-16 p-4 hover:bg-blue-700 transition-all duration-300 border border-blue-600 bg-blue-600 dark:bg-blue-600"
            >
              <Linkedin className="h-8 w-8 text-white dark:text-white" />
            </Button>
            <span className="text-sm font-medium text-muted-foreground dark:text-muted-foreground">LinkedIn</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-2"
          >
            <Link href="mailto:youremail@example.com">
              <Button
                variant="primary"
                size="sm"
                className="h-16 w-16 p-4 hover:bg-red-600 transition-all duration-300 border border-red-500 bg-red-500 dark:bg-red-500"
              >
                <Mail className="h-8 w-8 text-white dark:text-white" />
              </Button>
            </Link>
            <span className="text-sm font-medium text-muted-foreground dark:text-muted-foreground">Email</span>
          </motion.div>
        </div>

        <Card className="shadow-xl p-6 bg-white dark:bg-gray-800 rounded-lg">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground dark:text-muted-foreground">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-muted/80 dark:border-muted-foreground"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground dark:text-muted-foreground">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-muted/80 dark:border-muted-foreground"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground dark:text-muted-foreground">Message</label>
              <textarea
                className="w-full px-4 py-2 rounded-lg border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-muted/80 dark:border-muted-foreground min-h-[150px]"
                required
              />
            </div>
            <Button size="lg" className="w-full bg-green-600 text-white hover:bg-green-700 transition-all duration-300">
              Send Message
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}