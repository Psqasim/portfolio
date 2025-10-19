// "use client"

// import type React from "react"
// import { ThemeProvider } from "./theme-provider"
// import { LoaderWrapper } from "./components/LoaderWrappper"
// import { AnimatePresence } from "framer-motion"
// import type { Geist } from "next/font/google"
// import { NextFontWithVariable } from "next/dist/compiled/@next/font"
// interface RootLayoutClientProps {
//   children: React.ReactNode
//   inter: ReturnType<typeof Geist>
//   geistSans: NextFontWithVariable
//   geistMono: NextFontWithVariable
// }


// export function RootLayoutClient({ children, inter, geistSans, geistMono }: RootLayoutClientProps) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${inter.className} ${geistSans.variable} ${geistMono.variable}`}>
//         <ThemeProvider attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange>
//           <LoaderWrapper>
//             <AnimatePresence mode="wait">{children}</AnimatePresence>
//           </LoaderWrapper>
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }
