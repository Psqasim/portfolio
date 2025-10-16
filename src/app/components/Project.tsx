"use client";

import type React from "react";
import Card from "./Card";
import { Github, ExternalLink, Lock, Code2 } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "next-sanity";
import {
  PortableText,
  type PortableTextReactComponents,
} from "@portabletext/react";

type Project = {
  _id: string;
  title: string;
  description: any[];
  github?: string;
  isPrivateRepo?: boolean;
  demo: string;
  image: { asset: { _id: string; url: string } };
  tags: string[];
  order?: number;
  status?: "completed" | "in-progress" | "maintenance";
  category?: string;
};

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  useCdn: false, // fresh data while authoring
});

const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => (
      <p className="text-gray-700 dark:text-gray-400 text-sm sm:text-[15px] leading-relaxed">
        {children}
      </p>
    ),
  },
};

const query = `
*[_type == "project"] | order(order asc) {
  _id, title, description, github, isPrivateRepo, demo, order, status, category,
  "image": { "asset": { "_id": image.asset._id, "url": image.asset->url } },
  tags
}`;

function badgeClasses(kind: "status" | "category", value?: string) {
  if (kind === "status") {
    switch (value) {
      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800";
      case "in-progress":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-800";
      case "maintenance":
        return "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/40 dark:text-sky-300 dark:border-sky-800";
      default:
        return "bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-gray-900/50 dark:text-gray-200 dark:border-gray-700";
    }
  }
  return "bg-white/90 text-zinc-700 border-zinc-200 backdrop-blur-sm dark:bg-gray-900/60 dark:text-gray-200 dark:border-gray-700";
}

function SkeletonCard() {
  return (
    <div className="h-full">
      <Card className="h-full overflow-hidden rounded-xl border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800/90">
        <div className="h-44 sm:h-48 bg-zinc-100 dark:bg-gray-700 animate-pulse" />
        <div className="p-4 sm:p-5 space-y-3">
          <div className="h-5 w-2/3 bg-zinc-100 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-3 w-full bg-zinc-100 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-3 w-5/6 bg-zinc-100 dark:bg-gray-700 rounded animate-pulse" />
          <div className="pt-3 border-t border-zinc-200 dark:border-gray-700 flex gap-2">
            <div className="h-6 w-16 bg-zinc-100 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-6 w-20 bg-zinc-100 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </Card>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [expanded, setExpanded] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const imageUrl =
    project.image?.asset?.url ||
    `/placeholder.png?text=${encodeURIComponent(project.title)}`;
  const isPrivate =
    project.isPrivateRepo || !project.github || project.github === "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      className="h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="relative h-full group"
        style={{ perspective: "1000px" }}
      >
        <Card className="h-full flex flex-col overflow-hidden bg-white dark:bg-gray-800/90 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-zinc-200 dark:border-gray-700 relative">
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
            style={{
              background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99,102,241,0.03), transparent 35%)`,
            }}
          />

          <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transform group-hover:scale-[1.04] transition-transform duration-500 ease-out"
              priority={index < 3}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent dark:from-black/80 dark:via-black/40 dark:to-transparent" />

            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
              <div className="flex gap-2">
                {project.status && (
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium border ${badgeClasses("status", project.status)}`}
                  >
                    {project.status === "in-progress"
                      ? "In progress"
                      : project.status?.charAt(0).toUpperCase() +
                        project.status?.slice(1)}
                  </span>
                )}
                {project.category && (
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium border ${badgeClasses("category")}`}
                  >
                    {project.category}
                  </span>
                )}
              </div>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
              {isPrivate ? (
                <div className="flex-1 px-3 py-1.5 bg-zinc-900/85 dark:bg-gray-700/85 rounded-md text-white text-xs font-medium flex items-center justify-center border border-zinc-800 dark:border-gray-600">
                  <Lock className="mr-1.5 h-4 w-4" />
                  Private
                </div>
              ) : (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-gray-900/90 dark:hover:bg-gray-800 rounded-md text-white text-xs font-medium flex items-center justify-center transition-colors border border-zinc-800 dark:border-gray-700"
                >
                  <Github className="mr-1.5 h-4 w-4" />
                  Code
                </a>
              )}
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-md text-white text-xs font-medium flex items-center justify-center transition-colors shadow-sm"
              >
                <ExternalLink className="mr-1.5 h-4 w-4" />
                Live Demo
              </a>
            </div>
          </div>

          <div className="p-4 sm:p-5 flex-1 flex flex-col">
            <h3 className="text-lg sm:text-xl font-semibold mb-1.5 text-gray-900 dark:text-white">
              {project.title}
            </h3>

            <div className="relative">
              <div
                className={
                  expanded
                    ? "max-h-[1000px] transition-all"
                    : "max-h-16 sm:max-h-20 overflow-hidden transition-all"
                }
              >
                <PortableText
                  value={project.description}
                  components={portableTextComponents}
                />
              </div>
              {!expanded && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-white/0 dark:from-gray-800 dark:to-transparent" />
              )}
            </div>

            <div className="mt-3">
              <button
                onClick={() => setExpanded((v) => !v)}
                className="text-xs font-medium text-indigo-700 hover:text-indigo-800 dark:text-indigo-300 dark:hover:text-indigo-200 underline underline-offset-4"
                aria-expanded={expanded}
              >
                {expanded ? "See less" : "See more"}
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5 border-t border-zinc-200 dark:border-gray-700 pt-3">
              {project.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 text-indigo-700 dark:text-indigo-300 rounded-md text-xs font-medium border border-indigo-200 dark:border-indigo-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const data = await client.fetch<Project[]>(query);
      setProjects(data ?? []);
    } catch {
      setError("Failed to load projects");
    }
  };

  useEffect(() => {
    fetchProjects();
    let sub: { unsubscribe?: () => void } | null = null;
    try {
      // @ts-ignore
      sub = client.listen(query).subscribe(() => fetchProjects());
    } catch {}
    return () => sub?.unsubscribe?.();
  }, []);

  const hasData = (projects?.length ?? 0) > 0;
  const skeletons = useMemo(
    () => Array.from({ length: 6 }, (_, i) => <SkeletonCard key={i} />),
    []
  );

  return (
    <section
      id="projects"
      className="py-12 sm:py-16 md:py-20 px-4 bg-white dark:from-gray-900 dark:via-indigo-950/30 dark:to-purple-950/30 dark:bg-gradient-to-b transition-colors duration-500 relative"
    >
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 mb-3">
            <Code2 className="w-5 h-5" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
            {"My Projects"}
          </h2>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
            {
              "Compact cards with quick actions. Click See more to expand details."
            }
          </p>
        </motion.div>

        {error && (
          <div className="max-w-md mx-auto text-center py-8 px-5 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800 mb-8">
            <p className="text-sm text-red-700 dark:text-red-400 mb-4">
              {error}
            </p>
            <button
              onClick={() => {
                setError(null);
                fetchProjects();
              }}
              className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!hasData && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {skeletons}
          </div>
        )}

        {hasData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects!.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
