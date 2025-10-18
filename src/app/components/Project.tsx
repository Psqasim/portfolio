"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "next-sanity";
import { Code2, Loader2, ArrowRight, Lock, Github, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  completedDate?: string;
};

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  useCdn: false,
});

const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => (
      <p className="text-sm sm:text-base text-gray-100">{children}</p>
    ),
  },
};

const query = `
*[_type == "project"] | order(order asc) {
  _id, title, description, github, isPrivateRepo, demo, order, status, category, completedDate,
  "image": { "asset": { "_id": image.asset._id, "url": image.asset->url } },
  tags
}`;

function SkeletonCard() {
  return (
    <div className="h-80 sm:h-96 md:h-[450px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl animate-pulse" />
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const imageUrl = project.image?.asset?.url || "/placeholder.svg";

  const statusLabel = {
    completed: "Completed",
    "in-progress": "Building",
    maintenance: "Maintained",
  };

  const statusColor = {
    completed: "from-emerald-500 to-teal-600",
    "in-progress": "from-amber-500 to-orange-600",
    maintenance: "from-blue-500 to-cyan-600",
  };

  const isPrivate =
    project.isPrivateRepo || !project.github || project.github === "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative h-auto min-h-[500px] sm:min-h-[550px] md:min-h-[600px] rounded-2xl overflow-hidden shadow-2xl"
    >
      {/* Background Image with Better Visibility */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className=" brightness-110 group-hover:scale-105 group-hover:brightness-90 transition-all duration-700 ease-out"
          priority={index < 3}
        />

        {/* Improved gradient overlay for better text/image contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent group-hover:from-black group-hover:via-black/60 transition-all duration-500" />
      </div>

      {/* Status Badge - Positioned outside image area */}
      {project.status && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="absolute top-4 left-4 z-30"
        >
          <div
            className={`px-4 py-2 rounded-full text-xs font-bold text-orange-500 uppercase tracking-wider shadow-xl border-2 border-white/50 backdrop-blur-md bg-gradient-to-r
            ${statusColor[project.status as keyof typeof statusColor] || "from-gray-600 to-gray-700"}`}
          >
            {statusLabel[project.status as keyof typeof statusLabel] ||
              "Completed"}
          </div>
        </motion.div>
      )}

      {/* Category Badge - Positioned outside image area */}
      {project.category && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 z-30"
        >
          <div className="px-4 py-2 rounded-full text-xs font-bold text-white bg-black/80 backdrop-blur-md border-2 border-white/50 shadow-xl uppercase tracking-wide">
            {project.category}
          </div>
        </motion.div>
      )}

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-end p-6 sm:p-8 pb-8 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent">
        {/* Bottom Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.2 }}
          className="space-y-4"
        >
          {/* Title */}
          <div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-3 drop-shadow-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:via-purple-400 group-hover:to-pink-400 transition-all duration-300">
              {project.title}
            </h3>
            <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full group-hover:w-20 transition-all duration-300" />
          </div>

          {/* Description with See More/Less */}
          <div className="text-gray-200 text-sm sm:text-base leading-relaxed">
            <div className={isExpanded ? "" : "line-clamp-2"}>
              <PortableText
                value={project.description}
                components={portableTextComponents}
              />
            </div>
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-indigo-400 hover:text-indigo-300 font-semibold text-sm flex items-center gap-1 transition-colors"
            >
              {isExpanded ? (
                <>
                  See Less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  See More <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Tags */}
          <motion.div className="flex flex-wrap gap-2">
            {project.tags?.slice(0, 4).map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 backdrop-blur-md border border-white/30 text-white text-xs font-semibold rounded-full hover:from-indigo-700 hover:to-purple-700 transition-colors duration-200 shadow-md"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Buttons - View Project + Github/Code or Private */}
          <motion.div
            className="pt-4 flex gap-3 items-center"
            initial={false}
            animate={{ opacity: 1 }}
          >
            {/* Left Button - Github or Private */}
            {isPrivate ? (
              <div className="flex-1 px-4 py-3 bg-white/15 backdrop-blur-md rounded-full text-white font-bold text-sm flex items-center justify-center gap-2 border-2 border-white/30 shadow-lg">
                <Lock className="w-5 h-5" />
                <span>Private</span>
              </div>
            ) : (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-3 bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-full text-white font-bold text-sm flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white/50 transition-all duration-200 shadow-lg"
              >
                <Github className="w-5 h-5" />
                <span>Code</span>
              </a>
            )}

            {/* Right Button - View Project */}
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 rounded-full text-white font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-purple-600/50"
            >
              <span>View Project</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await client.fetch<Project[]>(query);
      setProjects(data ?? []);
    } catch (e) {
      console.error("Error fetching projects:", e);
      setError("Failed to load projects");
      setProjects([]);
    } finally {
      setLoading(false);
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
      className="py-16 sm:py-20 md:py-28 px-4 bg-gradient-to-b from-gray-950 via-gray-900 to-black"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
              Featured Projects
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Innovative solutions crafted with modern technologies and deployed
            to production. Hover to explore each project.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-40"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <Loader2 className="w-16 h-16 text-indigo-500" />
            </motion.div>
            <p className="mt-6 text-gray-400 text-lg">Loading projects...</p>
          </motion.div>
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto bg-red-950/50 border border-red-800 rounded-2xl p-8 text-center backdrop-blur-sm"
          >
            <p className="text-red-400 mb-6 text-lg font-semibold">{error}</p>
            <button
              onClick={() => {
                setError(null);
                fetchProjects();
              }}
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl transition-all duration-300"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {/* Projects Grid - With proper spacing between cards */}
        {!loading && !error && hasData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12"
          >
            {projects!.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && !hasData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-40"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 mb-8">
              <Code2 className="w-12 h-12 text-indigo-400" />
            </div>
            <h3 className="text-3xl font-black text-white mb-3">
              No Projects Yet
            </h3>
            <p className="text-gray-400 text-lg">
              Add your projects in Sanity Studio to showcase your work
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}