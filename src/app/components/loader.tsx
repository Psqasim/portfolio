"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Loader: React.FC = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 5 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950 overflow-hidden"
    >
      {/* Animated particles */}
      {[...Array(25)].map((_, i) => {
        const left = (i * 7.3) % 100;
        const top = (i * 5.9) % 100;
        return (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-white pointer-events-none"
            style={{ left: `${left}%`, top: `${top}%` }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
            transition={{
              duration: 1.5 + (i % 3),
              repeat: Infinity,
              delay: (i % 5) * 0.3,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Background glow orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 rounded-full blur-3xl opacity-20 pointer-events-none z-10"
        style={{ background: "radial-gradient(circle,#a855f7,transparent)" }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 rounded-full blur-3xl opacity-20 pointer-events-none z-10"
        style={{ background: "radial-gradient(circle,#ec4899,transparent)" }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main content */}
      <div className="relative z-50 flex flex-col items-center justify-center text-center w-full max-w-4xl px-6 min-h-screen py-12">
        {/* Top decoration */}
        <motion.div
          className="flex items-center justify-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent w-14" />
          <div className="mx-2 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
          <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent w-14" />
        </motion.div>
 <motion.p
          className="mt-4 text-purple-200/80 text-xs sm:text-sm md:text-base font-light tracking-widest uppercase px-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.9 }}
        >
          MUHAMMAD QASIM
        </motion.p>

        {/* Underline */}
        <motion.div
          className="mt-4 flex justify-center w-full max-w-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent w-full" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="mt-4 text-purple-200/80 text-xs sm:text-sm md:text-base font-light tracking-widest uppercase px-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.9 }}
        >
          Crafting Intelligent Web Experiences
        </motion.p>

        {/* Bottom progress bar */}
        <motion.div
          className="mt-6 w-40 sm:w-56 h-0.5 bg-purple-900/20 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
        >
          <motion.div
            className="h-full"
            style={{ background: "linear-gradient(90deg, #805ad5,#ec4899)" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, delay: 2.6, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader;
