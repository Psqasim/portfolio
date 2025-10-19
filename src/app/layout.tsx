import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter } from "next/font/google"
// @ts-ignore: CSS side-effect import has no type declarations
import "./globals.css"
import { RootLayoutClient } from "./RootLayoutClient"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Muhammad Qasim — Frontend Developer",
  description:
    "I'm Muhammad Qasim, a Frontend Developer and Python enthusiast exploring Agentic AI, the OpenAI SDK, Prompt & Context Engineering, and Web3. I craft custom websites, e-commerce platforms, and AI-driven solutions with Next.js, Tailwind CSS, Sanity, Stripe, and Streamlit.",
  metadataBase: new URL("https://psqasim-portfolio.vercel.app"),
  alternates: {
    canonical: "https://psqasim-portfolio.vercel.app",
  },
  openGraph: {
    title: "Muhammad Qasim — Frontend Developer",
    description:
      "Portfolio of Muhammad Qasim. Building intelligent, scalable, future-ready web solutions using Next.js, Tailwind CSS, Sanity, Stripe, Streamlit, and more.",
    url: "https://psqasim-portfolio.vercel.app",
    siteName: "Qasim's Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Qasim — Portfolio preview",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Qasim — Frontend Developer",
    description:
      "Agentic AI, OpenAI SDK, Web3. Explore my projects built with Next.js, Tailwind CSS, Sanity, Stripe, and Streamlit.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/qas.jpg",
  },
  keywords: [
    "Muhammad Qasim",
    "Frontend Developer",
    "Python",
    "Agentic AI",
    "OpenAI SDK",
    "Prompt Engineering",
    "Context Engineering",
    "Web3",
    "Next.js",
    "Tailwind CSS",
    "Sanity",
    "Stripe",
    "Streamlit",
    "Karachi",
    "Pakistan",
    "Portfolio",
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayoutClient inter={inter} geistSans={geistSans} geistMono={geistMono}>
      {children}
    </RootLayoutClient>
  )
}
