import { defineType, defineField } from "sanity"

export default defineType({
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
      description: "Keep it concise and descriptive",
    }),
    defineField({
      name: "description",
      title: "Project Description",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
      description: "Detailed description of the project (2–3 sentences recommended)",
    }),
    defineField({
      name: "image",
      title: "Project Image",
      type: "image",
      options: { hotspot: true, metadata: ["blurhash", "lqip", "palette"] },
      validation: (Rule) => Rule.required(),
      description: "Recommended size: 1200x800px. Use high‑quality images for best results.",
    }),
    defineField({
      name: "tags",
      title: "Technologies/Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      validation: (Rule) => Rule.required().min(1).max(8),
      description: "Add technologies used (e.g., Next.js, TypeScript, Tailwind CSS)",
    }),
    defineField({
      name: "github",
      title: "GitHub Repository URL",
      type: "url",
      description: "Leave empty if the repository is private",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "isPrivateRepo",
      title: "Is Private Repository",
      type: "boolean",
      description: "Check if the GitHub repository is private or unavailable",
      initialValue: false,
      hidden: ({ document }) => !!document?.github,
    }),
    defineField({
      name: "demo",
      title: "Live Demo URL",
      type: "url",
      validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }),
      description: "URL to the live/deployed version of the project",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first (1, 2, 3...)",
      validation: (Rule) => Rule.required().min(1).integer(),
      initialValue: 1,
    }),
    defineField({
      name: "status",
      title: "Project Status",
      type: "string",
      options: {
        list: [
          { title: "Completed", value: "completed" },
          { title: "In Progress", value: "in-progress" },
          { title: "Maintenance", value: "maintenance" },
        ],
        layout: "radio",
      },
      initialValue: "completed",
      description: "Current status of the project",
    }),
    defineField({
      name: "completedDate",
      title: "Completion Date",
      type: "date",
      description: "When was this project completed?",
      options: { dateFormat: "YYYY-MM-DD" },
    }),
    defineField({
      name: "category",
      title: "Project Category",
      type: "string",
      options: {
        list: [
          { title: "Web Application", value: "web-app" },
          { title: "Mobile App", value: "mobile-app" },
          { title: "E-Commerce", value: "ecommerce" },
          { title: "Portfolio/Landing Page", value: "portfolio" },
          { title: "Blog/CMS", value: "blog" },
          { title: "API/Backend", value: "backend" },
          { title: "Other", value: "other" },
        ],
      },
      description: "What type of project is this?",
    }),
  ],
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Newest First", name: "newestFirst", by: [{ field: "_createdAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", media: "image", subtitle: "category", order: "order", status: "status" },
    prepare(selection) {
      const { title, media, subtitle, order, status } = selection
      return {
        title,
        subtitle: `${subtitle || "Uncategorized"} • ${status || "No status"} • Order: ${order}`,
        media,
      }
    },
  },
})
