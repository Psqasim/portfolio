"use client"

import type React from "react"
import Image from "next/image"
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
  Brain,
  Loader2,
  Star,
  Filter,
  Briefcase,
  TrendingUp,
} from "lucide-react"

type SkillDoc = {
  _id: string
  name: string
  subtitle?: string
  level?: "beginner" | "intermediate" | "advanced" | "expert"
  category?: string
  order?: number
  imageUrl?: string
  color?: string
  featured?: boolean
  proficiencyPercentage?: number
  yearsOfExperience?: number
  usedInProjects?: string
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  useCdn: false,
})

function defaultSubtitle(name: string) {
  const n = name.toLowerCase()
  const map: Record<string, string> = {
    "next.js": "React framework for production",
    typescript: "Typed JavaScript for scale",
    "tailwind css": "Utility‑first styling",
    html: "Semantic markup foundation",
    git: "Version control & collaboration",
    css: "Responsive modern UI",
    python: "Scripting, data and AI workflows",
    vercel: "Fast deploys and edge hosting",
    context_api: "Lightweight React state sharing",
    fastapi: "High‑performance Python APIs",
    npm: "Package management & scripts",
    nodejs: "Server‑side JavaScript runtime",
    figma: "Design & prototyping",
    github: "Code hosting & workflows",
    markdown: "Lightweight documentation",
    open_ai_sdk: "Agentic AI & tool calling",
    openai: "Agentic AI & tool calling",
    web3: "Decentralized applications & blockchain",
  }
  return map[n] || "Modern, scalable development"
}

function iconFor(name: string) {
  const n = name.toLowerCase()
  if (n.includes("open ai") || n.includes("openai"))
    return <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-violet-500" />
  if (n === "python") return <Braces className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-600 dark:text-yellow-400" />
  if (n === "vercel") return <Rocket className="w-8 h-8 sm:w-10 sm:h-10 text-gray-900 dark:text-gray-200" />
  if (n.includes("context")) return <Share2 className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-600 dark:text-cyan-400" />
  if (n === "fastapi") return <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 dark:text-green-400" />
  if (n === "npm") return <Package className="w-8 h-8 sm:w-10 sm:h-10 text-rose-600 dark:text-rose-400" />
  if (n === "nodejs" || n === "node")
    return <Server className="w-8 h-8 sm:w-10 sm:h-10 text-lime-600 dark:text-lime-400" />
  if (n === "figma") return <Figma className="w-8 h-8 sm:w-10 sm:h-10 text-pink-600 dark:text-pink-400" />
  if (n === "github") return <Github className="w-8 h-8 sm:w-10 sm:h-10 text-gray-900 dark:text-gray-200" />
  if (n === "markdown") return <FileCode2 className="w-8 h-8 sm:w-10 sm:h-10 text-slate-600 dark:text-slate-300" />
  if (n.includes("tailwind")) return <Wind className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600 dark:text-emerald-400" />
  if (n.includes("git")) return <GitBranch className="w-8 h-8 sm:w-10 sm:h-10 text-red-600 dark:text-red-400" />
  if (n.includes("css")) return <Palette className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600 dark:text-purple-400" />
  return <Code2 className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600 dark:text-indigo-400" />
}

function isDark(): boolean {
  if (typeof document === "undefined") return false
  return document.documentElement.classList.contains("dark")
}

function adjustColor(hex: string, percent: number): string {
  if (!hex || !hex.startsWith("#")) return hex
  const num = Number.parseInt(hex.slice(1), 16)
  const amt = Math.round(2.55 * percent)
  const R = Math.min(255, Math.max(0, (num >> 16) + amt))
  const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt))
  const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt))
  return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)}`
}

function hexToRgba(hex: string, alpha: number) {
  if (!hex || !hex.startsWith("#")) return `rgba(99,102,241,${alpha})`
  const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return res
    ? `rgba(${Number.parseInt(res[1], 16)},${Number.parseInt(res[2], 16)},${Number.parseInt(res[3], 16)},${alpha})`
    : `rgba(99,102,241,${alpha})`
}

function SkillCard({
  name,
  subtitle,
  imageUrl,
  level,
  featured,
  proficiencyPercentage,
  yearsOfExperience,
  color,
  usedInProjects,
}: {
  name: string
  subtitle?: string
  imageUrl?: string
  level?: SkillDoc["level"]
  featured?: boolean
  proficiencyPercentage?: number
  yearsOfExperience?: number
  color?: string
  usedInProjects?: string
}) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const surfaceRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const orbRAF = useRef<number | null>(null)
  const lastEventRef = useRef<{ x: number; y: number } | null>(null)
  const orbActiveRef = useRef(false)
  const orbAngleRef = useRef(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const onMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    lastEventRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      if (!lastEventRef.current) return
      const { x, y } = lastEventRef.current
      const px = x / r.width
      const py = y / r.height
      const rx = (-(py - 0.5) * 10).toFixed(2)
      const ry = ((px - 0.5) * 10).toFixed(2)
      const tx = ((px - 0.5) * 6).toFixed(2)
      const ty = ((py - 0.5) * 6).toFixed(2)
      el.style.setProperty("--rx", `${rx}deg`)
      el.style.setProperty("--ry", `${ry}deg`)
      el.style.setProperty("--tx", `${tx}px`)
      el.style.setProperty("--ty", `${ty}px`)
      el.style.setProperty("--mx", `${x}px`)
      el.style.setProperty("--my", `${y}px`)
    })
  }

  const startOrb = () => {
    if (isMobile) return
    const el = cardRef.current
    if (!el || orbActiveRef.current) return
    orbActiveRef.current = true
    const rect = el.getBoundingClientRect()
    const radius = Math.max(rect.width, rect.height) * 0.55
    el.style.setProperty("--orb-r", `${radius.toFixed(2)}px`)
    const step = () => {
      if (!orbActiveRef.current) return
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

  const applyBase = () => {
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
    el.style.setProperty("--orb-o", "0")
  }

  const applyThemeSurface = () => {
    const el = cardRef.current
    const surface = surfaceRef.current
    if (!el || !surface) return
    if (isDark()) {
      surface.style.background =
        "linear-gradient(180deg, rgba(17,24,39,0.35), rgba(17,24,39,0.25) 20%), rgba(17,24,39,0.7)"
      surface.style.borderColor = "rgba(55,65,81,0.65)"
    } else {
      surface.style.background =
        "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0) 18%), rgba(255,255,255,0.94)"
      surface.style.borderColor = "rgba(228,228,231,0.9)"
    }
  }

  const onMouseEnter = () => {
    if (isMobile) return
    const el = cardRef.current
    if (!el) return
    el.style.setProperty("--s", featured ? "1.06" : "1.04")
    el.style.setProperty("--shadow", "0.30")
    el.style.setProperty("--shine", "0.75")
    el.style.setProperty("--glow", "0.9")
    el.style.setProperty("--orb-o", "1")
    startOrb()
  }

  const onMouseLeave = () => {
    applyBase()
    stopOrb()
  }

  useEffect(() => {
    applyBase()
    applyThemeSurface()
    const html = document.documentElement
    const obs = new MutationObserver(() => applyThemeSurface())
    obs.observe(html, { attributes: true, attributeFilter: ["class"] })
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (orbRAF.current) cancelAnimationFrame(orbRAF.current)
      obs.disconnect()
    }
  }, [])

  const finalSubtitle = subtitle || defaultSubtitle(name)

  const levelClasses: Record<NonNullable<SkillDoc["level"]>, string> = {
    beginner:
      "from-indigo-500/15 to-cyan-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-300/30 dark:border-indigo-500/30",
    intermediate:
      "from-emerald-500/15 to-green-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-300/30 dark:border-emerald-500/30",
    advanced:
      "from-purple-500/15 to-fuchsia-500/15 text-purple-700 dark:text-purple-300 border-purple-300/30 dark:border-purple-500/30",
    expert:
      "from-amber-500/15 to-orange-500/15 text-amber-700 dark:text-amber-300 border-amber-300/30 dark:border-amber-500/30",
  }

  return (
    <div className="relative group h-full touch-manipulation" style={{ perspective: isMobile ? "none" : "1200px" }}>
      {featured && (
        <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 z-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full p-1.5 sm:p-2 shadow-lg animate-pulse">
          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-white" />
        </div>
      )}

      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="relative rounded-xl sm:rounded-2xl p-[1px] transition-transform duration-200 overflow-visible h-full"
        style={{
          transform: isMobile
            ? "scale(var(--s, 1))"
            : "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translate3d(var(--tx, 0), var(--ty, 0), 0) scale(var(--s, 1))",
          willChange: "transform",
          background: featured
            ? "linear-gradient(135deg, rgba(251,191,36,0.25), rgba(245,158,11,0.25), rgba(217,119,6,0.25))"
            : color
              ? `linear-gradient(135deg, ${hexToRgba(
                  color,
                  0.18,
                )}, ${hexToRgba(adjustColor(color, -10), 0.18)}, ${hexToRgba(adjustColor(color, -20), 0.16)})`
              : "linear-gradient(135deg, rgba(99,102,241,0.18), rgba(147,51,234,0.18), rgba(236,72,153,0.18))",
          boxShadow: featured
            ? "0 12px 28px rgba(251,191,36,0.22), 0 8px 8px rgba(245,158,11,0.18)"
            : "0 10px 20px rgba(0,0,0,var(--shadow,0.14)), 0 6px 6px rgba(0,0,0,var(--shadow,0.14))",
          transformStyle: isMobile ? "flat" : "preserve-3d",
          borderRadius: "16px",
        }}
      >
        {!isMobile && (
          <div
            className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl transition-all duration-300"
            style={{
              background: featured
                ? "conic-gradient(from 180deg at 50% 50%, rgba(251,191,36,0.0), rgba(245,158,11,0.35), rgba(217,119,6,0.35), rgba(245,158,11,0.35), rgba(251,191,36,0.0))"
                : color
                  ? `conic-gradient(from 180deg at 50% 50%, ${hexToRgba(
                      color,
                      0,
                    )}, ${hexToRgba(color, 0.28)}, ${hexToRgba(
                      adjustColor(color, -10),
                      0.28,
                    )}, ${hexToRgba(color, 0.28)}, ${hexToRgba(color, 0)})`
                  : "conic-gradient(from 180deg at 50% 50%, rgba(99,102,241,0.0), rgba(147,51,234,0.28), rgba(236,72,153,0.28), rgba(147,51,234,0.28), rgba(99,102,241,0.0))",
              filter: "blur(10px)",
              opacity: "var(--glow, 0)",
              transform: "translateZ(1px)",
            }}
          />
        )}

        {!isMobile && (
          <div
            className="pointer-events-none absolute inset-0 -m-3 rounded-[1.25rem]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="absolute left-1/2 top-1/2 h-3 w-3 rounded-full"
              style={{
                transform: "rotate(var(--orb-rot, 0deg)) translateX(var(--orb-r, 120px)) translateZ(40px)",
                background: color
                  ? `radial-gradient(circle, ${color}, ${hexToRgba(color, 0.95)} 60%, ${hexToRgba(color, 0.85)})`
                  : featured
                    ? "radial-gradient(circle, rgba(251,191,36,1), rgba(245,158,11,0.95) 60%, rgba(217,119,6,0.9))"
                    : "radial-gradient(circle, rgba(236,72,153,1), rgba(147,51,234,0.95) 60%, rgba(99,102,241,0.92))",
                opacity: "var(--orb-o, 0)",
                transition: "opacity 240ms ease",
                boxShadow: color
                  ? `0 0 26px ${hexToRgba(color, 0.82)}`
                  : featured
                    ? "0 0 26px rgba(251,191,36,0.82)"
                    : "0 0 26px rgba(147,51,234,0.82)",
              }}
            />
          </div>
        )}

        <div
          ref={surfaceRef}
          className="relative rounded-xl sm:rounded-2xl border backdrop-blur-xl transform-gpu h-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0) 18%), rgba(255,255,255,0.94)",
            borderColor: "rgba(228,228,231,0.9)",
          }}
        >
          <div
            className="absolute inset-0 rounded-xl sm:rounded-2xl pointer-events-none"
            style={{
              background: color
                ? `linear-gradient(135deg, ${hexToRgba(color, 0.07)}, ${hexToRgba(color, 0.06)}, ${hexToRgba(
                    color,
                    0.05,
                  )})`
                : "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(147,51,234,0.05), rgba(236,72,153,0.05))",
            }}
          />

          {!isMobile && (
            <div
              className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl transition-opacity duration-200"
              style={{
                background:
                  "radial-gradient(520px circle at var(--mx, -100px) var(--my, -100px), rgba(255,255,255,0.5), rgba(255,255,255,0.1) 40%, transparent 65%)",
                opacity: "var(--shine, 0)",
                mixBlendMode: "overlay",
                transform: "translateZ(5px)",
              }}
            />
          )}

          <div
            className="relative flex flex-col items-center text-center p-4 sm:p-5 h-full justify-between"
            style={{
              transform: isMobile ? "none" : "translateZ(12px)",
              minHeight: "200px",
            }}
          >
            <div className="flex flex-col items-center flex-1 justify-center w-full">
              <div className="mb-2 sm:mb-3 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10">
                {imageUrl ? (
                  <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                    <Image
                      src={imageUrl || "/placeholder.svg"}
                      alt={`${name} logo`}
                      width={40}
                      height={40}
                      className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                    />
                  </div>
                ) : (
                  iconFor(name)
                )}
              </div>

              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-1.5 tracking-tight">
                {name}
              </h3>

              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-400 leading-snug px-1 mb-2 line-clamp-2">
                {finalSubtitle}
              </p>
            </div>

            <div className="w-full space-y-1.5 sm:space-y-2">
              {/* Level Badge with Confidence Indicator */}
              {level && (
                <div className="flex items-center justify-center gap-2">
                  <div
                    className={`px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${levelClasses[level]} border capitalize flex items-center gap-1`}
                  >
                    <span>{level}</span>
                    <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                </div>
              )}

              {/* Experience + Credibility */}
              {yearsOfExperience !== undefined && yearsOfExperience > 0 && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-gray-600 dark:text-gray-500">
                  <Briefcase className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="font-medium">
                    {yearsOfExperience} {yearsOfExperience === 1 ? "year" : "years"} exp.
                  </span>
                </div>
              )}

              {/* Project Reference (grounded credibility) */}
              {usedInProjects && (
                <p className="text-xs text-gray-500 dark:text-gray-600 italic line-clamp-1 px-1">
                  {`Used in: ${usedInProjects}`}
                </p>
              )}

              {/* Proficiency Bar */}
              {proficiencyPercentage !== undefined && proficiencyPercentage > 0 && (
                <div className="w-full px-1 sm:px-2 pt-1">
                  <div className="h-1.5 bg-zinc-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${proficiencyPercentage}%`,
                        background: color
                          ? `linear-gradient(90deg, ${color}, ${adjustColor(color, 18)})`
                          : "linear-gradient(90deg, rgb(99,102,241), rgb(168,85,247))",
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-600 mt-0.5 text-center">
                    {proficiencyPercentage}%
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CATEGORIES = [
  { value: "all", label: "All Skills" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "tools", label: "DevOps & Tools" },
  { value: "ai", label: "AI & ML" },
  { value: "design", label: "Design" },
  { value: "database", label: "Database" },
]

export function Skills() {
  const [skills, setSkills] = useState<SkillDoc[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const query = `*[_type == "skill"] | order(featured desc, coalesce(order, 999999) asc, name asc){
    _id, name, subtitle, level, category, order, featured, proficiencyPercentage, yearsOfExperience, color, usedInProjects,
    "imageUrl": image.asset->url
  }`

  async function fetchSkills() {
    try {
      setLoading(true)
      setError(null)
      const data = await client.fetch<SkillDoc[]>(query, {})
      const seen = new Set<string>()
      const unique = data.filter((s) => {
        const key = s.name.trim().toLowerCase()
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
      setSkills(unique)
    } catch (e) {
      console.error("Error fetching skills:", e)
      setError("Failed to load skills. Please try again.")
      setSkills([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSkills()
    let sub: { unsubscribe?: () => void } | null = null
    try {
      // @ts-ignore
      sub = client.listen(query).subscribe(() => {
        fetchSkills()
      })
    } catch {
      // ignore
    }
    return () => {
      sub?.unsubscribe?.()
    }
  }, [])

  const filteredSkills = useMemo(() => {
    if (!skills) return []
    if (selectedCategory === "all") return skills
    return skills.filter((s) => s.category === selectedCategory)
  }, [skills, selectedCategory])

  const featuredSkills = useMemo(() => skills?.filter((s) => s.featured) || [], [skills])

  return (
    <section
      id="skills"
      className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 transition-colors duration-500"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
            {"My Skills"}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto px-4">
            {"Technologies and tools I use to build intelligent, scalable, and future‑ready experiences."}
          </p>
        </div>

        {/* Category Filter */}
        {!loading && !error && skills && skills.length > 0 && (
          <div className="flex items-center justify-center gap-2 mb-8 sm:mb-12 flex-wrap px-2">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400 hidden sm:block" />
            {CATEGORIES.map((cat) => {
              const count = cat.value === "all" ? skills.length : skills.filter((s) => s.category === cat.value).length

              if (count === 0 && cat.value !== "all") return null

              const isActive = selectedCategory === cat.value

              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={[
                    "px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border",
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-105 border-transparent"
                      : "bg-white/90 text-zinc-700 hover:bg-white border-zinc-200 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-800 dark:border-gray-700",
                  ].join(" ")}
                >
                  <span className="hidden sm:inline">{cat.label}</span>
                  <span className="sm:hidden">{cat.label.split(" ")[0]}</span>
                  {count > 0 && ` (${count})`}
                </button>
              )
            })}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20">
            <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 animate-spin text-indigo-600 dark:text-indigo-400 mb-4" />
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400">{"Loading skills..."}</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="max-w-md mx-auto text-center py-8 sm:py-12 px-4 sm:px-6 bg-red-50 dark:bg-red-900/20 rounded-xl sm:rounded-2xl border border-red-200 dark:border-red-800">
            <p className="text-sm sm:text-base text-red-700 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchSkills}
              className="px-4 py-2 text-sm sm:text-base bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              {"Try Again"}
            </button>
          </div>
        )}

        {/* Skills */}
        {!loading && !error && filteredSkills.length > 0 && (
          <>
            {selectedCategory === "all" && featuredSkills.length > 0 && (
              <div className="mb-12 sm:mb-16">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2 px-2">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 fill-amber-500" />
                  {"Featured Skills"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                  {featuredSkills.map((s) => (
                    <SkillCard
                      key={s._id}
                      name={s.name}
                      subtitle={s.subtitle}
                      imageUrl={s.imageUrl}
                      level={s.level}
                      featured={s.featured}
                      proficiencyPercentage={s.proficiencyPercentage}
                      yearsOfExperience={s.yearsOfExperience}
                      color={s.color}
                      usedInProjects={s.usedInProjects}
                    />
                  ))}
                </div>
              </div>
            )}

            <div
              className={
                selectedCategory === "all" && featuredSkills.length > 0
                  ? "pt-6 sm:pt-8 border-t border-zinc-200 dark:border-gray-700"
                  : ""
              }
            >
              {selectedCategory === "all" && featuredSkills.length > 0 && (
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 px-2">
                  {"All Skills"}
                </h3>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                {filteredSkills
                  .filter((s) => !s.featured || selectedCategory !== "all")
                  .map((s) => (
                    <SkillCard
                      key={s._id}
                      name={s.name}
                      subtitle={s.subtitle}
                      imageUrl={s.imageUrl}
                      level={s.level}
                      featured={s.featured}
                      proficiencyPercentage={s.proficiencyPercentage}
                      yearsOfExperience={s.yearsOfExperience}
                      color={s.color}
                      usedInProjects={s.usedInProjects}
                    />
                  ))}
              </div>
            </div>
          </>
        )}

        {/* Empty (filtered) */}
        {!loading && !error && filteredSkills.length === 0 && skills && skills.length > 0 && (
          <div className="text-center py-8 sm:py-12 px-4">
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400">
              {"No skills found in this category."}
            </p>
          </div>
        )}

        {/* Empty (no skills) */}
        {!loading && !error && (!skills || skills.length === 0) && (
          <div className="text-center py-12 sm:py-16 px-4 sm:px-6 max-w-lg mx-auto">
            <div className="mb-4 sm:mb-6 inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30">
              <Code2 className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {"No skills added yet"}
            </h3>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400 mb-4 sm:mb-6">
              {"Head over to your Sanity Studio and publish some skills to showcase your expertise."}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
