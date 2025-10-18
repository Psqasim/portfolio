'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'unset';
    }, 6000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              y: '-100%',
              scale: 0.8,
              opacity: 0,
              transition: {
                duration: 0.8,
                ease: [0.43, 0.13, 0.23, 0.96]
              }
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400"
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{
                x: '200%',
                transition: {
                  repeat: Infinity,
                  duration: 2,
                  ease: 'linear'
                }
              }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            />

            <div className="relative z-10 px-6 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.8,
                    delay: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }}
                className="mb-6 text-5xl md:text-7xl font-bold text-white tracking-tight"
                style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}
              >
                <motion.span
                  initial={{ display: 'inline-block' }}
                  animate={{
                    y: [0, -10, 0],
                    transition: {
                      delay: 1.2,
                      duration: 0.6,
                      ease: 'easeInOut'
                    }
                  }}
                >
                  MUHAMMAD QASIM
                </motion.span>
              </motion.h1>

              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{
                  width: '100%',
                  opacity: 1,
                  transition: {
                    duration: 0.8,
                    delay: 1.5,
                    ease: 'easeOut'
                  }
                }}
                className="mx-auto mb-4 h-1 max-w-md bg-white/40 rounded-full overflow-hidden"
              >
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{
                    x: '100%',
                    transition: {
                      duration: 1.5,
                      delay: 2,
                      ease: 'easeInOut'
                    }
                  }}
                  className="h-full w-1/2 bg-white rounded-full"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    duration: 1.2,
                    delay: 2.5,
                    ease: 'easeIn'
                  }
                }}
                className="text-xl md:text-2xl text-white/90 font-light tracking-wide"
                style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}
              >
                {Array.from('Crafting Intelligent Web Experiences').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: {
                        duration: 0.05,
                        delay: 2.5 + index * 0.03
                      }
                    }}
                    className="inline-block"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1.2, 1, 0.8],
                  rotate: [0, 180, 360],
                  transition: {
                    duration: 1.5,
                    delay: 4.2,
                    ease: 'easeInOut'
                  }
                }}
                className="mt-8 mx-auto w-12 h-12 border-4 border-white/30 border-t-white rounded-full"
              />
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{
                scaleX: 1,
                transition: {
                  duration: 5.5,
                  ease: 'easeInOut'
                }
              }}
              className="absolute bottom-0 left-0 h-1 w-full bg-white/50 origin-left"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isLoading ? 0 : 1,
          transition: {
            duration: 0.5,
            delay: isLoading ? 0 : 0.3
          }
        }}
        style={{ visibility: isLoading ? 'hidden' : 'visible' }}
      >
        {children}
      </motion.div>
    </>
  );
}
