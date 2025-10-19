"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface LoaderProps {
  onComplete: () => void
}

// Glitch effect component
function GlitchText({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="relative"
    >
      {/* Main Text */}
      <motion.div
        className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay, duration: 0.6, ease: "easeOut" }}
      >
        <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          {text}
        </span>
      </motion.div>

      {/* Glitch Effect Layer 1 */}
      <motion.div
        className="absolute inset-0 text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-cyan-400 mix-blend-multiply"
        initial={{ opacity: 0, x: 4, y: -4 }}
        animate={{ opacity: [0, 1, 0], x: [4, -2, 4], y: [-4, 2, -4] }}
        transition={{
          delay: delay + 0.3,
          duration: 0.4,
          times: [0, 0.5, 1],
        }}
      >
        {text}
      </motion.div>

      {/* Glitch Effect Layer 2 */}
      <motion.div
        className="absolute inset-0 text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-pink-400 mix-blend-screen"
        initial={{ opacity: 0, x: -4, y: 4 }}
        animate={{ opacity: [0, 0.8, 0], x: [-4, 3, -4], y: [4, -2, 4] }}
        transition={{
          delay: delay + 0.35,
          duration: 0.4,
          times: [0, 0.5, 1],
        }}
      >
        {text}
      </motion.div>

      {/* Scan Line Effect */}
      <motion.div
        className="absolute inset-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        animate={{ y: ["-100%", "100%"] }}
        transition={{
          delay: delay + 0.2,
          duration: 1.2,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  )
}

// Particle component
function Particle() {
  const randomDelay = Math.random() * 2
  const randomDuration = 2 + Math.random() * 2
  const randomX = -50 + Math.random() * 100
  const randomY = -50 + Math.random() * 50

  return (
    <motion.div
      className="absolute w-1 h-1 bg-cyan-400 rounded-full"
      initial={{
        x: randomX,
        y: randomY,
        opacity: 1,
      }}
      animate={{
        x: randomX + (Math.random() - 0.5) * 200,
        y: randomY + Math.random() * 300,
        opacity: 0,
      }}
      transition={{
        delay: randomDelay,
        duration: randomDuration,
        ease: "easeOut",
      }}
    />
  )
}

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 18
        return Math.min(next, 95) // Cap at 95, not beyond
      })
    }, 250)

    const completeTimer = setTimeout(() => {
      setProgress(100) // Only set to exactly 100
      setIsExiting(true)
    }, 5500)

    const exitTimer = setTimeout(() => {
      onComplete()
    }, 6000)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(completeTimer)
      clearTimeout(exitTimer)
    }
  }, [onComplete])

  useEffect(() => {
    if (isExiting) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gain = audioContext.createGain()

        oscillator.connect(gain)
        gain.connect(audioContext.destination)

        oscillator.frequency.setValueAtTime(300, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1)

        gain.gain.setValueAtTime(0.2, audioContext.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.2)
      } catch {
        // Silent fallback
      }
    }
  }, [isExiting])

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.95,
            y: -200,
            transition: { duration: 0.7, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        >
          {/* Anime-Inspired Background */}
          <div className="absolute inset-0 bg-black">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-black" />

            {/* Animated Grid Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-10">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" className="text-cyan-400" />
            </svg>

            {/* Animated Gradient Orbs */}
            <motion.div
              className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full blur-3xl opacity-20"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-3xl opacity-20"
              animate={{
                scale: [1.3, 1, 1.3],
                opacity: [0.2, 0.15, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Particle System */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 12 }).map((_, i) => (
                <Particle key={i} />
              ))}
            </div>

            {/* Scan Lines */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                backgroundPosition: ["0px 0px", "0px 10px"],
              }}
              transition={{
                duration: 0.1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(0,255,255,0.08) 0px, rgba(0,255,255,0.08) 2px, transparent 2px, transparent 4px)",
              }}
            />
          </div>

          {/* Main Content */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center space-y-8 px-4 sm:px-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative Top Element */}
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            />

            {/* Name with Glitch Effect */}
            <div className="space-y-2">
              <GlitchText text="MUHAMMAD" delay={0.3} />
              <GlitchText text="QASIM" delay={0.8} />
            </div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.7, ease: "easeOut" }}
              className="space-y-3 pt-4"
            >
              <p className="text-sm sm:text-base md:text-lg font-light text-cyan-300/80 tracking-widest uppercase">
                Frontend Developer
              </p>
              <p className="text-xs sm:text-sm md:text-base text-purple-300/70 font-light tracking-wide">
                Crafting Intelligent Web Experiences
              </p>
            </motion.div>

            {/* Progress Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.7, ease: "easeOut" }}
              className="w-full max-w-xs pt-8 space-y-4"
            >
              {/* Animated Progress Bar */}
              <div className="relative h-1 bg-slate-800 rounded-full overflow-hidden border border-cyan-400/30">
                <motion.div
                  className="absolute inset-y-0 left-0 h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 shadow-lg shadow-cyan-400/50"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ ease: "easeOut", duration: 0.3 }}
                />

                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
              </div>

              {/* Progress Text with Japanese */}
              <div className="flex justify-between items-center px-1">
                <p className="text-xs text-cyan-400/70 font-mono tracking-widest">システム初期化</p>
                <p className="text-xs text-purple-400/70 font-mono tracking-widest">
                  {Math.min(Math.round(progress), 100)}%
                </p>
              </div>

              {/* Japanese Loading Text */}
              <motion.p
                className="text-xs text-pink-400/60 font-light tracking-widest text-center pt-2"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                ポートフォリオ読込中...
              </motion.p>
            </motion.div>

            {/* Loading Dots */}
            <motion.div
              className="flex space-x-2 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    delay: 2.5 + i * 0.15,
                    duration: 1.2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>

            {/* Bottom Accent - Japanese */}
            <motion.div
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-xs text-cyan-400/50 font-mono tracking-widest"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              [ポートフォリオ起動中]
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
