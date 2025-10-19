"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { Loader } from "./loader"

export function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    document.body.style.overflow = "hidden"

    const timer = setTimeout(() => {
      setIsLoading(false)
      document.body.style.overflow = "unset"
    }, 6000)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = "unset"
    }
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              y: "-100%",
              scale: 0.8,
              opacity: 0,
              transition: {
                duration: 0.8,
                ease: [0.43, 0.13, 0.23, 0.96],
              },
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          >
            <Loader onComplete={() => setIsLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content hidden while loading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isLoading ? 0 : 1,
          transition: {
            duration: 0.5,
            delay: isLoading ? 0 : 0.3,
          },
        }}
        style={{ visibility: isLoading ? "hidden" : "visible" }}
      >
        {children}
      </motion.div>
    </>
  )
}
