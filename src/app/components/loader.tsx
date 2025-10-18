
// --------
"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 1.1, delay: 4 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-800 overflow-hidden px-4"
    >
      {/* Background morph / glow blobs - responsive sizing */}
      <motion.div
        aria-hidden
        className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[450px] md:h-[450px] lg:w-[520px] lg:h-[520px] rounded-full blur-3xl opacity-40"
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
        className="relative text-center z-30 w-full max-w-4xl px-4"
      >
        {/* NAME - responsive text with better mobile sizing */}
        <motion.h1
          className="relative z-30 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent leading-tight"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(124,58,237,1) 0%, rgba(236,72,153,1) 50%, rgba(59,130,246,1) 100%)",
            WebkitBackgroundClip: "text",
          }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75, ease: "easeOut" }}
        >
          Muhammad Qasim
        </motion.h1>

        {/* Subtle glow - responsive sizing */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div 
            className="w-[80%] sm:w-[70%] h-[80%] sm:h-[70%] rounded-full blur-[30px] sm:blur-[40px] opacity-30" 
            style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent 25%)" }} 
          />
        </div>

        {/* Subtitle - better mobile spacing */}
        <motion.p
          className="relative z-30 text-gray-300 mt-3 sm:mt-4 tracking-wider sm:tracking-widest uppercase text-[10px] xs:text-xs sm:text-sm px-2"
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

        {/* Rotating ring - responsive sizing */}
        <motion.div
          className="absolute inset-0 -z-10 flex items-center justify-center"
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        >
          <div className="w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[360px] md:h-[360px] rounded-full border-[2px] border-white/10 blur-sm" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

