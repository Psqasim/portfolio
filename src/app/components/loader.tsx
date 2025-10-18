"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
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
      transition={{ duration: 1, delay: 4 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 overflow-hidden"
    >
      {/* Elegant particle system */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-6xl px-6 sm:px-8 text-center">
        
        {/* Elegant top border decoration */}
        <motion.div
          className="flex items-center justify-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div 
            className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent w-24 sm:w-32"
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
          <motion.div 
            className="mx-4 w-2 h-2 bg-purple-400 rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div 
            className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent w-24 sm:w-32"
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
        </motion.div>

        {/* Main name with elegant animation */}
        <div className="relative mb-8 sm:mb-12">
          {/* Glow effect behind text */}
          <motion.div
            className="absolute inset-0 blur-3xl opacity-40"
            animate={{
              background: [
                "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)",
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Name text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-light tracking-wide">
              {/* First name */}
              <motion.span
                className="inline-block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              >
                Muhammad
              </motion.span>
              
              {/* Elegant spacing */}
              <span className="inline-block w-4 sm:w-6" />
              
              {/* Last name */}
              <motion.span
                className="inline-block bg-gradient-to-r from-white via-pink-200 to-white bg-clip-text text-transparent"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.1, ease: "easeOut" }}
              >
                Qasim
              </motion.span>
            </h1>
          </motion.div>

          {/* Underline decoration */}
          <motion.div
            className="mt-6 sm:mt-8 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ duration: 1.5, delay: 1.6, ease: "easeOut" }}
            />
          </motion.div>
        </div>

        {/* Elegant subtitle */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2, ease: "easeOut" }}
        >
          <p className="text-purple-200/80 text-sm sm:text-base md:text-lg font-light tracking-[0.3em] uppercase">
            Crafting Intelligent Web Experiences
          </p>
        </motion.div>

        {/* Elegant bottom decoration */}
        <motion.div
          className="flex items-center justify-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.3, ease: "easeOut" }}
        >
          <motion.div 
            className="h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent w-20 sm:w-28"
            initial={{ width: 0 }}
            animate={{ width: "7rem" }}
            transition={{ duration: 1.5, delay: 2.5 }}
          />
          <motion.div 
            className="mx-3 flex gap-2"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 bg-purple-400/70 rounded-full"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </motion.div>
          <motion.div 
            className="h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent w-20 sm:w-28"
            initial={{ width: 0 }}
            animate={{ width: "7rem" }}
            transition={{ duration: 1.5, delay: 2.5 }}
          />
        </motion.div>

        {/* Subtle progress indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <motion.div
            className="w-32 sm:w-48 h-0.5 bg-purple-900/30 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, delay: 3, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Corner ornaments */}
      {[
        { position: "top-6 left-6", rotate: 0 },
        { position: "top-6 right-6", rotate: 90 },
        { position: "bottom-6 left-6", rotate: -90 },
        { position: "bottom-6 right-6", rotate: 180 },
      ].map((corner, i) => (
        <motion.div
          key={i}
          className={`absolute ${corner.position} w-8 h-8 sm:w-12 sm:h-12`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
          style={{ rotate: corner.rotate }}
        >
          <svg viewBox="0 0 50 50" className="w-full h-full stroke-purple-400/60" fill="none">
            <path d="M0 0 L20 0 M0 0 L0 20" strokeWidth="1" />
            <circle cx="25" cy="25" r="2" fill="currentColor" className="opacity-50" />
          </svg>
        </motion.div>
      ))}

      {/* Ambient light orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-[100px] opacity-20"
        style={{ background: "radial-gradient(circle, #a855f7, transparent)" }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-[100px] opacity-20"
        style={{ background: "radial-gradient(circle, #ec4899, transparent)" }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

// upper cloud animation

// --------
// "use client";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";

// export default function Loader() {
//   const [show, setShow] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setShow(false), 5000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (!show) return null;

//   return (
//     <motion.div
//       initial={{ opacity: 1, scale: 1 }}
//       animate={{ opacity: 0, scale: 0.97 }}
//       transition={{ duration: 1.1, delay: 4 }}
//       className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-800 overflow-hidden px-4"
//     >
//       {/* Background morph / glow blobs - responsive sizing */}
//       <motion.div
//         aria-hidden
//         className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[450px] md:h-[450px] lg:w-[520px] lg:h-[520px] rounded-full blur-3xl opacity-40"
//         style={{ background: "linear-gradient(90deg,#7c3aed,#ec4899,#06b6d4)" }}
//         animate={{
//           rotate: [0, 120, 240, 360],
//           scale: [1, 1.12, 0.95, 1],
//           opacity: [0.5, 0.35, 0.6, 0.5],
//         }}
//         transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//       />

//       <motion.div
//         initial={{ scale: 0.78, rotateX: -70 }}
//         animate={{ scale: 1, rotateX: 0 }}
//         transition={{ duration: 1.25, ease: "easeOut" }}
//         className="relative text-center z-30 w-full max-w-4xl px-4"
//       >
//         {/* NAME - responsive text with better mobile sizing */}
//         <motion.h1
//           className="relative z-30 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent leading-tight"
//           style={{
//             backgroundImage:
//               "linear-gradient(90deg, rgba(124,58,237,1) 0%, rgba(236,72,153,1) 50%, rgba(59,130,246,1) 100%)",
//             WebkitBackgroundClip: "text",
//           }}
//           initial={{ opacity: 0, y: 28 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 0.75, ease: "easeOut" }}
//         >
//           Muhammad Qasim
//         </motion.h1>

//         {/* Subtle glow - responsive sizing */}
//         <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
//           <div 
//             className="w-[80%] sm:w-[70%] h-[80%] sm:h-[70%] rounded-full blur-[30px] sm:blur-[40px] opacity-30" 
//             style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent 25%)" }} 
//           />
//         </div>

//         {/* Subtitle - better mobile spacing */}
//         <motion.p
//           className="relative z-30 text-gray-300 mt-3 sm:mt-4 tracking-wider sm:tracking-widest uppercase text-[10px] xs:text-xs sm:text-sm px-2"
//           initial={{ opacity: 0, y: 18 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
//         >
//           Crafting intelligent web experiences
//         </motion.p>

//         {/* Thin sweeping light beam */}
//         <motion.div
//           className="absolute left-0 top-1/2 w-full h-[1px] pointer-events-none z-25"
//           initial={{ x: "-110%" }}
//           animate={{ x: "110%" }}
//           transition={{ duration: 2.8, delay: 1, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
//           style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)" }}
//         />

//         {/* Rotating ring - responsive sizing */}
//         <motion.div
//           className="absolute inset-0 -z-10 flex items-center justify-center"
//           aria-hidden
//           animate={{ rotate: 360 }}
//           transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
//         >
//           <div className="w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[360px] md:h-[360px] rounded-full border-[2px] border-white/10 blur-sm" />
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// }

