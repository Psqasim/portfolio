"use client"
import { Github, Linkedin, Mail } from 'lucide-react';
import Button from './Button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function Footer() {
    return (
      <footer className="border-t bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg text-muted-foreground">Muhammad Qasim</h3>
              <p className="text-sm text-muted-foreground">Full-stack Developer</p>
            </div>
  
            <div className="flex gap-6 justify-center md:justify-start mt-4 md:mt-0">
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
  
            <div className="text-center md:text-right text-sm text-muted-foreground mt-4 md:mt-0">
              <p>© {new Date().getFullYear()} Muhammad Qasim</p>
              <p className="text-xs">All rights reserved</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
