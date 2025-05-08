import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "./theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Muhammad Qasim | Web Developer Portfolio",
  description: "I'm Muhammad Qasim, a full-stack developer skilled in Next.js, Tailwind CSS, Sanity.io, and Stripe. Explore my portfolio to see my projects and skills.",
  metadataBase: new URL("https://psqasim-portfolio.vercel.app"),
  openGraph: {
    title: "Muhammad Qasim | Full-stack Web Developer",
    description: "Explore my portfolio built with Next.js, Tailwind CSS, Sanity, and Stripe.",
    url: "https://psqasim-portfolio.vercel.app",
    siteName: "Qasim's Portfolio",
    images: [
      {
        url: "/og-image.png", // Add this image to your public/ folder
        width: 1200,
        height: 630,
        alt: "Portfolio preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Qasim | Portfolio",
    description: "See my latest full-stack development work with modern tools like Next.js and Tailwind.",
    images: ["/og-image.png"], // Same here
  },
  icons: {
    icon: "/qasim.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(
              function() {
                try {
                  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              }
            )();`,
          }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
