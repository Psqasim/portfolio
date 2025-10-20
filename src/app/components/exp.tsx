// "use client"

// import { useState, useEffect } from "react"
// import Image from "next/image"
// import { PortableText } from "@portabletext/react"
// import { motion, AnimatePresence } from "framer-motion"
// import { createClient } from "@sanity/client"
// import imageUrlBuilder from "@sanity/image-url"
// import { Briefcase, Calendar, MapPin, RefreshCw, AlertCircle, Code2, ChevronRight } from "lucide-react"

// // ============================================
// // SANITY CLIENT SETUP
// // ============================================
// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
//   apiVersion: "2023-05-03",
//   useCdn: false,
// })

// // Image URL Builder
// const builder = imageUrlBuilder(client)
// function urlFor(source: any) {
//   return builder.image(source)
// }

// // ============================================
// // TYPESCRIPT INTERFACES
// // ============================================
// interface ExperienceEntry {
//   _id: string
//   title: string
//   company: string
//   companyLogo?: {
//     asset: {
//       _ref: string
//       _type: string
//     }
//   }
//   location?: string
//   startDate: string
//   endDate?: string
//   description: any[] // Portable Text array
//   technologies?: string[]
//   order: number
// }

// // ============================================
// // PORTABLE TEXT COMPONENTS (Styled)
// // ============================================
// const portableTextComponents = {
//   block: {
//     h1: ({ children }: any) => (
//       <h1 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
//         {children}
//       </h1>
//     ),
//     h2: ({ children }: any) => (
//       <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
//         {children}
//       </h2>
//     ),
//     normal: ({ children }: any) => (
//       <p className="mb-2 leading-relaxed text-gray-700 dark:text-gray-300">
//         {children}
//       </p>
//     ),
//   },
//   list: {
//     bullet: ({ children }: any) => (
//       <ul className="list-disc list-inside mb-2 space-y-1 text-gray-700 dark:text-gray-300">
//         {children}
//       </ul>
//     ),
//   },
//   listItem: {
//     bullet: ({ children }: any) => <li className="ml-4">{children}</li>,
//   },
//   marks: {
//     strong: ({ children }: any) => (
//       <strong className="font-bold text-gray-900 dark:text-white">{children}</strong>
//     ),
//     em: ({ children }: any) => (
//       <em className="italic text-gray-800 dark:text-gray-200">{children}</em>
//     ),
//   },
// }

// // ============================================
// // LOADING SKELETON COMPONENT
// // ============================================
// function ExperienceSkeleton() {
//   return (
//     <div className="relative pl-8 sm:pl-32 py-6 group">
//       <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
//         <div className="flex-shrink-0 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse mb-4 sm:mb-0 sm:mr-6"></div>
//         <div className="flex-1 space-y-2">
//           <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
//           <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
//           <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 animate-pulse"></div>
//         </div>
//       </div>
//       <div className="space-y-2 pl-0 sm:pl-30">
//         <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
//         <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
//         <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
//       </div>
//       <div className="flex flex-wrap gap-2 mt-4 pl-0 sm:pl-30">
//         <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-20 animate-pulse"></div>
//         <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-24 animate-pulse"></div>
//       </div>
//     </div>
//   )
// }

// // ============================================
// // ERROR STATE COMPONENT
// // ============================================
// function ErrorState({ onRetry }: { onRetry: () => void }) {
//   return (
//     <div className="text-center py-20 px-4">
//       <motion.div
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         className="inline-block mb-6"
//       >
//         <AlertCircle className="w-20 h-20 text-red-400 dark:text-red-500" />
//       </motion.div>
//       <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
//         Oops! Experience data is taking a break
//       </h3>
//       <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
//         We couldn't load your experience details right now. Please try again.
//       </p>
//       <button
//         onClick={onRetry}
//         className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
//       >
//         <RefreshCw size={20} />
//         Try Again
//       </button>
//     </div>
//   )
// }

// // ============================================
// // MAIN EXPERIENCE COMPONENT
// // ============================================
// export function Experience() {
//   const [experience, setExperience] = useState<ExperienceEntry[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(false)

//   const fetchExperience = async () => {
//     try {
//       setLoading(true)
//       setError(false)
//       const data = await client.fetch<ExperienceEntry[]>(`
//         *[_type == "experience"] | order(order asc) {
//           _id,
//           title,
//           company,
//           companyLogo,
//           location,
//           startDate,
//           endDate,
//           description,
//           technologies,
//           order
//         }
//       `)
//       setExperience(data)
//     } catch (err) {
//       console.error("Error fetching experience:", err)
//       setError(true)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchExperience()
//   }, [])

//   return (
//     <section id="experience" className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 transition-colors duration-500">
//       <div className="container mx-auto max-w-4xl">
//         <div className="text-center mb-8 sm:mb-10">
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
//             My Experience
//           </h2>
//           <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto px-4">
//             A summary of my professional journey and key roles.
//           </p>
//         </div>

//         {loading && (
//           <div className="space-y-8">
//             {[1, 2].map((i) => (
//               <ExperienceSkeleton key={i} />
//             ))}
//           </div>
//         )}

//         {error && !loading && <ErrorState onRetry={fetchExperience} />}

//         {!loading && !error && experience.length > 0 && (
//           <div className="relative space-y-8 sm:space-y-12">
//             {/* Vertical line for timeline */} 
//             <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700 z-0"></div>

//             <AnimatePresence>
//               {experience.map((exp, index) => (
//                 <motion.div
//                   key={exp._id}
//                   initial={{ opacity: 0, y: 50 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true, amount: 0.3 }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                   className="relative flex flex-col sm:flex-row items-start sm:items-center w-full"
//                 >
//                   {/* Timeline Dot */} 
//                   <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 -translate-y-1/2 top-1/2 w-4 h-4 rounded-full bg-indigo-600 dark:bg-blue-500 z-10 ring-4 ring-white dark:ring-gray-900"></div>

//                   {/* Company Logo / Icon */} 
//                   <div className="flex-shrink-0 w-full sm:w-1/2 flex justify-start sm:justify-end pr-8 sm:pr-16 mb-4 sm:mb-0">
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       whileInView={{ opacity: 1, scale: 1 }}
//                       viewport={{ once: true, amount: 0.5 }}
//                       transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
//                       className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-white dark:bg-gray-800 border-4 border-indigo-200 dark:border-blue-700 shadow-lg flex items-center justify-center"
//                     >
//                       {exp.companyLogo ? (
//                         <Image
//                           src={urlFor(exp.companyLogo).width(100).height(100).url()}
//                           alt={`${exp.company} logo`}
//                           width={100}
//                           height={100}
//                           className="object-contain p-2"
//                         />
//                       ) : (
//                         <Briefcase className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
//                       )}
//                     </motion.div>
//                   </div>

//                   {/* Experience Details Card */} 
//                   <div className="flex-shrink-0 w-full sm:w-1/2 pl-8 sm:pl-16">
//                     <motion.div
//                       initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       viewport={{ once: true, amount: 0.3 }}
//                       transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
//                       className="bg-white dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
//                     >
//                       <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
//                         {exp.title}
//                       </h3>
//                       <p className="text-indigo-700 dark:text-indigo-400 font-semibold text-md sm:text-lg mb-2">
//                         {exp.company}
//                       </p>

//                       <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
//                         <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
//                         <span>
//                           {new Date(exp.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })} -{" "}
//                           {exp.endDate
//                             ? new Date(exp.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
//                             : "Present"}
//                         </span>
//                         {exp.location && (
//                           <>
//                             <MapPin className="w-4 h-4 ml-4 mr-2 flex-shrink-0" />
//                             <span>{exp.location}</span>
//                           </>
//                         )}
//                       </div>

//                       <div className="prose prose-gray dark:prose-invert text-sm mb-4">
//                         <PortableText value={exp.description} components={portableTextComponents} />
//                       </div>

//                       {exp.technologies && exp.technologies.length > 0 && (
//                         <div className="mt-4">
//                           <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
//                             <Code2 className="w-4 h-4" /> Technologies:
//                           </h4>
//                           <div className="flex flex-wrap gap-2">
//                             {exp.technologies.map((tech, techIndex) => (
//                               <span
//                                 key={techIndex}
//                                 className="px-3 py-1 bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 text-xs rounded-full border border-gray-200 dark:border-gray-600"
//                               >
//                                 {tech}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </motion.div>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//         )}

//         {!loading && !error && experience.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-500 dark:text-gray-400 text-lg">
//               No experience entries found. Add some in Sanity Studio! 📝
//             </p>
//           </div>
//         )}
//       </div>
//     </section>
//   )
// }
