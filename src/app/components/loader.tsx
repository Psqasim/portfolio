"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5000); // hide after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 1.1, delay: 4 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-800 overflow-hidden"
    >
      {/* Background morph / glow blobs (behind text) */}
      <motion.div
        aria-hidden
        className="absolute w-[520px] h-[520px] rounded-full blur-3xl opacity-40"
        style={{ background: "linear-gradient(90deg,#7c3aed,#ec4899,#06b6d4)" }}
        animate={{
          rotate: [0, 120, 240, 360],
          scale: [1, 1.12, 0.95, 1],
          opacity: [0.5, 0.35, 0.6, 0.5],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ scale: 0.78, rotateX: -70 }}
        animate={{ scale: 1, rotateX: 0 }}
        transition={{ duration: 1.25, ease: "easeOut" }}
        className="relative text-center z-30"
      >
        {/* NAME - ensure it sits on top (z-30) and uses bg-clip-text */}
        <motion.h1
          className="relative z-30 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(124,58,237,1) 0%, rgba(236,72,153,1) 50%, rgba(59,130,246,1) 100%)",
            WebkitBackgroundClip: "text", // defensive inline style for cross-compatibility
          }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75, ease: "easeOut" }}
        >
          Muhammad Qasim
        </motion.h1>

        {/* subtle glow using pseudo-like div behind the text for extra legibility */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="w-[70%] h-[70%] rounded-full blur-[40px] opacity-30" style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent 25%)" }} />
        </div>

        {/* Subtitle */}
        <motion.p
          className="relative z-30 text-gray-300 mt-4 tracking-widest uppercase text-xs sm:text-sm"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
        >
          Crafting intelligent web experiences
        </motion.p>

        {/* Thin sweeping light beam */}
        <motion.div
          className="absolute left-0 top-1/2 w-full h-[1px] pointer-events-none z-25"
          initial={{ x: "-110%" }}
          animate={{ x: "110%" }}
          transition={{ duration: 2.8, delay: 1, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)" }}
        />

        {/* rotating ring behind text but below text (z-10) */}
        <motion.div
          className="absolute inset-0 -z-10 flex items-center justify-center"
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        >
          <div className="w-[360px] h-[360px] rounded-full border-[2px] border-white/10 blur-sm" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
