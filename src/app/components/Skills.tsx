"use client"

import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { createClient } from "next-sanity"
import {
  Code2,
  Wind,
  GitBranch,
  FileCode2,
  Palette,
  Braces,
  Rocket,
  Share2,
  Zap,
  Package,
  Server,
  Figma,
  Github,
} from "lucide-react"

type SkillDoc = {
  _id: string
  name: string
  level?: string
  order?: number
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  useCdn: true,
})

// CONFIG: orb always orbits at low opacity; gets brighter on hover.
// To switch to hover-only, set ALWAYS_ORBIT to false.
const ALWAYS_ORBIT = true
const ORB_BASE_OPACITY_LIGHT = 0.12
const ORB_BASE_OPACITY_DARK = 0.1

// Show these skills in this exact order
const REQUIRED_SKILLS = ["Python", "Vercel", "Context-API", "FastAPI", "NPM", "NodeJs", "Figma", "GitHub", "Markdown"]

// Fallbacks if Sanity is empty/missing entries
const FALLBACK_SKILLS: SkillDoc[] = REQUIRED_SKILLS.map((name, i) => ({
  _id: `fallback-${i}`,
  name,
  order: i + 1,
}))

function iconFor(name: string) {
  const n = name.toLowerCase()
  if (n === "python") return <Braces className="h-7 w-7 sm:h-8 sm:w-8 text-yellow-600 dark:text-yellow-400" />
  if (n === "vercel") return <Rocket className="h-7 w-7 sm:h-8 sm:w-8 text-gray-900 dark:text-gray-200" />
  if (n.includes("context")) return <Share2 className="h-7 w-7 sm:h-8 sm:w-8 text-cyan-600 dark:text-cyan-400" />
  if (n === "fastapi") return <Zap className="h-7 w-7 sm:h-8 sm:w-8 text-green-600 dark:text-green-400" />
  if (n === "npm") return <Package className="h-7 w-7 sm:h-8 sm:w-8 text-rose-600 dark:text-rose-400" />
  if (n === "nodejs" || n === "node") return <Server className="h-7 w-7 sm:h-8 sm:w-8 text-lime-600 dark:text-lime-400" />
  if (n === "figma") return <Figma className="h-7 w-7 sm:h-8 sm:w-8 text-pink-600 dark:text-pink-400" />
  if (n === "github") return <Github className="h-7 w-7 sm:h-8 sm:w-8 text-gray-900 dark:text-gray-200" />
  if (n === "markdown") return <FileCode2 className="h-7 w-7 sm:h-8 sm:w-8 text-slate-600 dark:text-slate-300" />

  // Safe defaults if extended later
  if (n.includes("tailwind")) return <Wind className="h-7 w-7 sm:h-8 sm:w-8 text-emerald-600 dark:text-emerald-400" />
  if (n.includes("git")) return <GitBranch className="h-7 w-7 sm:h-8 sm:w-8 text-red-600 dark:text-red-400" />
  if (n.includes("css")) return <Palette className="h-7 w-7 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400" />
  return <Code2 className="h-7 w-7 sm:h-8 sm:w-8 text-indigo-600 dark:text-indigo-400" />
}

function isDark(): boolean {
  if (typeof document === "undefined") return false
  // next-themes toggles .dark on <html>
  return document.documentElement.classList.contains("dark")
}

function SkillCard({ name, level }: { name: string; level?: string }) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const surfaceRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const orbRAF = useRef<number | null>(null)
  const lastEventRef = useRef<{ x: number; y: number } | null>(null)
  const orbActiveRef = useRef(false)
  const orbAngleRef = useRef(0) // degrees
  const orbBaseOpacityRef = useRef(ALWAYS_ORBIT ? ORB_BASE_OPACITY_LIGHT : 0)
  const observerRef = useRef<MutationObserver | null>(null)

  // Cursor-driven tilt + shine
  const onMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    lastEventRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }

    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      if (!lastEventRef.current) return
      const { x, y } = lastEventRef.current
      const px = x / rect.width
      const py = y / rect.height
      const rx = (-(py - 0.5) * 14).toFixed(2)
      const ry = ((px - 0.5) * 14).toFixed(2)
      const tx = ((px - 0.5) * 10).toFixed(2)
      const ty = ((py - 0.5) * 10).toFixed(2)

      el.style.setProperty("--rx", `${rx}deg`)
      el.style.setProperty("--ry", `${ry}deg`)
      el.style.setProperty("--tx", `${tx}px`)
      el.style.setProperty("--ty", `${ty}px`)
      el.style.setProperty("--mx", `${x}px`)
      el.style.setProperty("--my", `${y}px`)
    })
  }

  const startOrb = () => {
    const el = cardRef.current
    if (!el || orbActiveRef.current) return
    orbActiveRef.current = true

    // radius based on size
    const rect = el.getBoundingClientRect()
    const r = Math.max(rect.width, rect.height) * 0.55
    el.style.setProperty("--orb-r", `${r.toFixed(2)}px`)

    const step = () => {
      if (!orbActiveRef.current) return
      // Calm orbit speed
      orbAngleRef.current = (orbAngleRef.current + 0.6) % 360
      el.style.setProperty("--orb-rot", `${orbAngleRef.current}deg`)
      orbRAF.current = requestAnimationFrame(step)
    }
    if (orbRAF.current) cancelAnimationFrame(orbRAF.current)
    orbRAF.current = requestAnimationFrame(step)
  }

  const stopOrb = () => {
    orbActiveRef.current = false
    if (orbRAF.current) cancelAnimationFrame(orbRAF.current)
  }

  const applyBaseStyles = () => {
    const el = cardRef.current
    if (!el) return
    el.style.setProperty("--rx", "0deg")
    el.style.setProperty("--ry", "0deg")
    el.style.setProperty("--tx", "0px")
    el.style.setProperty("--ty", "0px")
    el.style.setProperty("--s", "1")
    el.style.setProperty("--shadow", isDark() ? "0.20" : "0.14")
    el.style.setProperty("--shine", "0")
    el.style.setProperty("--glow", "0")
    el.style.setProperty("--orb-o", ALWAYS_ORBIT ? String(orbBaseOpacityRef.current) : "0")
  }

  // Update visuals when theme toggles
  const applyThemeVisuals = () => {
    const el = cardRef.current
    const surface = surfaceRef.current
    if (!el || !surface) return

    // Adjust base orb opacity for theme
    orbBaseOpacityRef.current = ALWAYS_ORBIT ? (isDark() ? ORB_BASE_OPACITY_DARK : ORB_BASE_OPACITY_LIGHT) : 0
    el.style.setProperty("--orb-o", ALWAYS_ORBIT ? String(orbBaseOpacityRef.current) : "0")

    // Light vs Dark background tweaks for the surface
    if (isDark()) {
      surface.style.background =
        "linear-gradient(180deg, rgba(17,24,39,0.32), rgba(17,24,39,0.22) 22%), rgba(17,24,39,0.68)"
      surface.style.borderColor = "rgba(55,65,81,0.6)" // gray-700/60
    } else {
      surface.style.background =
        "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.88) 22%), rgba(255,255,255,0.92)"
      surface.style.borderColor = "rgba(209,213,219,0.8)" // gray-300/80
    }
  }

  const onMouseEnter = () => {
    const el = cardRef.current
    if (!el) return
    el.style.setProperty("--s", "1.03")
    el.style.setProperty("--shadow", "0.32")
    el.style.setProperty("--shine", "0.7")
    el.style.setProperty("--glow", "0.85")
    el.style.setProperty("--orb-o", "1")
    startOrb()
  }

  const onMouseLeave = () => {
    applyBaseStyles()
    if (!ALWAYS_ORBIT) stopOrb()
  }

  useEffect(() => {
    applyBaseStyles()
    applyThemeVisuals()
    if (ALWAYS_ORBIT) startOrb()

    // Watch for theme changes (next-themes toggles the class on <html>)
    const html = document.documentElement
    const observer = new MutationObserver(() => {
      applyThemeVisuals()
    })
    observer.observe(html, { attributes: true, attributeFilter: ["class"] })
    observerRef.current = observer

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (orbRAF.current) cancelAnimationFrame(orbRAF.current)
      observer.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative group" style={{ perspective: "1000px" }}>
      {/* 3D frame with gradient border */}
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="relative rounded-2xl p-[1px] transition-transform duration-200 overflow-visible"
        style={{
          transform:
            "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translate3d(var(--tx, 0), var(--ty, 0), 0) scale(var(--s, 1))",
          willChange: "transform",
          background: "linear-gradient(135deg, rgba(79,70,229,0.18), rgba(147,51,234,0.18), rgba(236,72,153,0.18))",
          boxShadow: "0 10px 20px rgba(0,0,0,var(--shadow,0.14)), 0 6px 6px rgba(0,0,0,var(--shadow,0.14))",
          transformStyle: "preserve-3d",
          borderRadius: "16px",
        }}
      >
        {/* Animated border glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-all duration-300"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, rgba(79,70,229,0.0), rgba(147,51,234,0.25), rgba(236,72,153,0.25), rgba(147,51,234,0.25), rgba(79,70,229,0.0))",
            filter: "blur(10px)",
            opacity: "var(--glow, 0)",
            transform: "translateZ(1px)",
          }}
        />

        {/* ORBITING CIRCLE (ORB) */}
        <div
          className="pointer-events-none absolute inset-0 -m-3 rounded-[1.25rem]"
          style={{ transformStyle: "preserve-3d" }}
          aria-hidden="true"
        >
          <div
            className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full shadow-[0_0_24px_rgba(147,51,234,0.8)]"
            style={{
              transform: "rotate(var(--orb-rot, 0deg)) translateX(var(--orb-r, 120px)) translateZ(40px)",
              background:
                "radial-gradient(circle, rgba(236,72,153,0.98), rgba(147,51,234,0.93) 60%, rgba(79,70,229,0.9))",
              opacity: "var(--orb-o, 0.12)",
              transition: "opacity 200ms ease",
            }}
          />
        </div>

        {/* Card surface */}
        <div
          ref={surfaceRef}
          className="relative rounded-2xl border backdrop-blur-xl transform-gpu shadow-sm"
          style={{
            // these are initialized and updated in applyThemeVisuals()
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.88) 22%), rgba(255,255,255,0.92)",
            borderColor: "rgba(209,213,219,0.8)",
          }}
        >
          {/* Brand-tinted inner gradient to match Home/About */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(79,70,229,0.06), rgba(147,51,234,0.05), rgba(236,72,153,0.05))",
            }}
          />

          {/* Shine following cursor */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-200"
            style={{
              background:
                "radial-gradient(500px circle at var(--mx, -100px) var(--my, -100px), rgba(255,255,255,0.5), rgba(255,255,255,0.08) 40%, transparent 60%)",
              opacity: "var(--shine, 0)",
              mixBlendMode: "overlay",
              transform: "translateZ(5px)",
            }}
          />

          {/* Content */}
          <div
            className="relative flex flex-col items-center text-center p-4 sm:p-6 min-h-[140px] sm:min-h-[160px]"
            style={{ transform: "translateZ(12px)" }}
          >
            <div className="mb-3 sm:mb-4">{iconFor(name)}</div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-1">{name}</h3>
            {level ? (
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{level}</p>
            ) : (
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300/80">{"Modern, scalable development"}</p>
            )}

            {/* Brand accent line */}
            <div
              className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, rgba(79,70,229,0.35), rgba(147,51,234,0.55), rgba(236,72,153,0.35))",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function Skills() {
  const [loaded, setLoaded] = useState<SkillDoc[] | null>(null)

  useEffect(() => {
    let cancelled = false
    async function fetchSkills() {
      try {
        const data = await client.fetch<SkillDoc[]>(`*[_type == "skill"] | order(order asc){ _id, name, level, order }`)
        if (!cancelled) setLoaded(data)
      } catch {
        if (!cancelled) setLoaded(null)
      }
    }
    fetchSkills()
    return () => {
      cancelled = true
    }
  }, [])

  // Assemble final list from Sanity or fallback, but show only REQUIRED_SKILLS in order
  const skillsToShow = useMemo(() => {
    const source = loaded && loaded.length ? loaded : FALLBACK_SKILLS
    const map = new Map(source.map((s) => [s.name.toLowerCase(), s]))
    return REQUIRED_SKILLS.map((label, idx) => map.get(label.toLowerCase()) || { _id: `fb-${idx}`, name: label })
  }, [loaded])

  return (
    <section
      id="skills"
      className="py-12 sm:py-16 px-4 
      bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/40 
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
      transition-colors duration-500"
    >
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 
            bg-clip-text text-transparent 
            bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 
            dark:from-indigo-400 dark:via-purple-300 dark:to-pink-400"
          >
            {"My Skills"}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            {"Here are the technologies and tools I use to build intelligent, scalable web experiences."}
          </p>
        </div>

        {/* 3D interactive card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto">
          {skillsToShow.map((skill) => (
            <SkillCard key={skill._id} name={skill.name} level={skill.level} />
          ))}
        </div>
      </div>
    </section>
  )
}     