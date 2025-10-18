"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Calendar, X, RefreshCw, AlertCircle, Eclipse, Eye, Telescope } from "lucide-react";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { FiExternalLink } from "react-icons/fi";

// ============================================
// SANITY CLIENT SETUP
// ============================================
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  useCdn: false,
});

// Image URL Builder
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

// ============================================
// TYPESCRIPT INTERFACES
// ============================================
interface Project {
  _id: string;
  title: string;
  description: any[]; // Portable Text array
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
    hotspot?: any;
  };
  tags: string[];
  github?: string;
  isPrivateRepo?: boolean;
  demo: string;
  order: number;
  status: "completed" | "in-progress" | "maintenance";
  completedDate?: string;
  category?: string;
}

// ============================================
// PORTABLE TEXT COMPONENTS (Styled)
// ============================================
const portableTextComponents = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="ml-4">{children}</li>,
    number: ({ children }: any) => <li className="ml-4">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-gray-900 dark:text-white">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-gray-800 dark:text-gray-200">{children}</em>
    ),
    link: ({ value, children }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-600 dark:text-blue-400 hover:underline"
      >
        {children}
      </a>
    ),
  },
};

// ============================================
// LOADING SKELETON COMPONENT
// ============================================
function ProjectSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="flex gap-2">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// ERROR STATE COMPONENT
// ============================================
function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="text-center py-20 px-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="inline-block mb-6"
      >
        <AlertCircle className="w-20 h-20 text-red-400 dark:text-red-500" />
      </motion.div>
      <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
        Oops! Projects are taking a break
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
        We couldn't load the projects right now. Don't worry, they'll be back soon!
      </p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
      >
        <RefreshCw size={20} />
        Try Again
      </button>
    </div>
  );
}

// ============================================
// MAIN PROJECTS COMPONENT
// ============================================
export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // ============================================
  // FETCH PROJECTS FROM SANITY
  // ============================================
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await client.fetch<Project[]>(`
        *[_type == "project"] | order(order asc) {
          _id, 
          title, 
          description, 
          image, 
          tags, 
          github, 
          isPrivateRepo, 
          demo, 
          order, 
          status, 
          completedDate, 
          category
        }
      `);
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ============================================
  // FILTER LOGIC
  // ============================================
  const categories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return ["all", ...Array.from(cats)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "all" || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchTerm]);

  // ============================================
  // HELPER FUNCTIONS
  // ============================================
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-300 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30";
      case "in-progress":
        return "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30";
      case "maintenance":
        return "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/30";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-500/20 dark:text-gray-400 dark:border-gray-500/30";
    }
  };

  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      "web-app": "Web Application",
      "mobile-app": "Mobile App",
      ecommerce: "E-Commerce",
      portfolio: "Portfolio",
      blog: "Blog/CMS",
      backend: "API/Backend",
      other: "Other",
    };
    return labels[cat] || cat;
  };

  // ============================================
  // RENDER: LOADING STATE
  // ============================================
  if (loading) {
    return (
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-blue-500 dark:to-purple-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore my latest work and side projects
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ProjectSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  // ============================================
  // RENDER: ERROR STATE
  // ============================================
  if (error) {
    return (
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ErrorState onRetry={fetchProjects} />
      </section>
    );
  }

  // ============================================
  // RENDER: MAIN CONTENT
  // ============================================
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-blue-500 dark:to-purple-600 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore my latest work and side projects
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search projects or technologies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-indigo-600 dark:bg-blue-500 text-white shadow-lg scale-105"
                  : "bg-white dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700"
              }`}
            >
              {cat === "all" ? "All Projects" : getCategoryLabel(cat)}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              // here is cut and paste in see more 
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer bg-white dark:bg-gray-800/30 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:border-indigo-400 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-200/20 dark:hover:shadow-blue-500/10 hover:-translate-y-1"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-900">
                <Image
                  src={urlFor(project.image).width(600).height(400).url()}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status.replace("-", " ")}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                {/* Description Preview */}
                <div className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  <PortableText
                    
                    value={project.description}
                    
                    components={portableTextComponents}
                  />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    aria-label={`See more about ${project.title}`}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-medium rounded-md shadow-md transition-transform transform hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-blue-400"
                  >
                    See more
                    <Telescope size={14} />
                  </button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 text-xs rounded-md border border-gray-200 dark:border-gray-600"
                    >
                      {tag}

                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-2 py-1 text-gray-500 dark:text-gray-400 text-xs">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.github && !project.isPrivateRepo && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <Github size={16} />
                      Code
                    </a>
                  )}
                  {project.isPrivateRepo && (
                    <span className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
                      <Github size={16} />
                      Private
                    </span>
                  )}
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 text-sm text-indigo-600 dark:text-blue-400 hover:text-indigo-800 dark:hover:text-blue-300 transition-colors font-medium"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* No Results */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No projects found. Try adjusting your filters! 🔍
          </p>
        </div>
      )}

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-orange-50 to-pink-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal Image */}
              <div className="relative h-64 sm:h-96">
                <Image
                  src={urlFor(selectedProject.image)
                    .width(1200)
                    .height(800)
                    .url()}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 896px) 100vw, 896px"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

                {/* Modal Content */}
                <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                  <h2 className="text-3xl font-bold text-cyan-600 dark:text-cyan-300 mb-2">
                    {selectedProject.title}
                  </h2>
                  {selectedProject.category && (
                    <p className="text-emerald-500 dark:text-emerald-300">
                    {getCategoryLabel(selectedProject.category)}
                    </p>
                  )}
                  </div>
                  <span
                  className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                    selectedProject.status
                  )}`}
                  >
                  {selectedProject.status.replace("-", " ")}
                  </span>
                </div>

                {/* Full Description */}
                <div className="mb-6 prose prose-gray dark:prose-invert prose-p:dark:text-gray-200 max-w-none">
                  <PortableText
                  value={selectedProject.description}
                  components={{
                    ...portableTextComponents,
                    block: {
                    ...portableTextComponents.block,
                    normal: ({ children }: any) => (
                      <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-200">
                      {children}
                      </p>
                    ),
                    }
                  }}
                  />
                </div>

                {/* Completion Date */}
                {selectedProject.completedDate && (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-6">
                    <Calendar size={16} />
                    <span className="text-sm">
                      Completed:{" "}
                      {new Date(
                        selectedProject.completedDate
                      ).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}

                {/* All Tags */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-300 mb-3">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-lg border border-gray-300 dark:border-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {selectedProject.github && !selectedProject.isPrivateRepo ? (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 text-white rounded-lg transition-all hover:scale-105 active:scale-95 shadow-lg"
                  >
                    <Github size={20} />
                    View Source Code
                  </a>
                  ) : (
                  <button
                    disabled
                    className="flex items-center gap-2 px-6 py-3 bg-gray-500 dark:bg-gray-700 text-white rounded-lg cursor-not-allowed opacity-75"
                  >
                    <Github size={20} />
                    Private Repository
                    <span className="ml-1 bg-gray-600 dark:bg-gray-600 px-2 py-0.5 rounded-md text-xs">
                    Protected
                    </span>
                  </button>
                  )}
                  <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-all hover:scale-105 active:scale-95 shadow-lg"
                  >
                  <ExternalLink size={20} />
                  Visit Live Site
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}