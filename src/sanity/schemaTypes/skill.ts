import { defineField, defineType } from "sanity"

export default defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().error("Skill name is required"),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "Brief description shown under the skill name (e.g., 'React framework for production').",
      validation: (Rule) => Rule.max(60).warning("Keep subtitle under 60 characters for best display"),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Organize skills by category for filtering",
      options: {
        list: [
          { title: "Frontend", value: "frontend" },
          { title: "Backend", value: "backend" },
          { title: "DevOps & Tools", value: "tools" },
          { title: "AI & Machine Learning", value: "ai" },
          { title: "Design", value: "design" },
          { title: "Database", value: "database" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required().error("Please select a category"),
    }),
    defineField({
      name: "level",
      title: "Proficiency Level",
      type: "string",
      description: "Your proficiency level with this skill",
      options: {
        list: [
          { title: "Beginner", value: "beginner" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
          { title: "Expert", value: "expert" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required().error("Please select a proficiency level"),
    }),
    defineField({
      name: "proficiencyPercentage",
      title: "Proficiency Percentage",
      type: "number",
      description: "Your proficiency as a percentage (0-100) for visual progress bars",
      validation: (Rule) => Rule.min(0).max(100).integer(),
      initialValue: 75,
    }),
    defineField({
      name: "image",
      title: "Logo",
      type: "image",
      options: { 
        hotspot: true,
        accept: 'image/png,image/svg+xml,image/jpeg,image/webp'
      },
      description: "Upload a logo (PNG/SVG preferred). Transparent backgrounds work best. Recommended: 512x512px",
      validation: (Rule) => Rule.required().error("Please upload a skill logo for better visual consistency"),
    }),
    defineField({
      name: "color",
      title: "Brand Color (Optional)",
      type: "string",
      description: "Primary brand color for this technology (e.g., #61DAFB for React). Used for glow effects and progress bars.",
      validation: (Rule) => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
        name: "hex color",
        invert: false,
      }).warning("Please use hex color format (e.g., #61DAFB)"),
    }),
    defineField({
      name: "yearsOfExperience",
      title: "Years of Experience (Optional)",
      type: "number",
      description: "How many years you've been using this skill",
      validation: (Rule) => Rule.min(0).max(50).precision(1),
    }),
    defineField({
      name: "featured",
      title: "Featured Skill",
      type: "boolean",
      description: "Mark as featured to highlight your core skills with a gold star badge",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Controls display order within category (lower numbers appear first)",
      validation: (Rule) => Rule.min(1).integer(),
      initialValue: 100,
    }),
  ],
  preview: {
    select: { 
      title: "name", 
      subtitle: "category",
      level: "level",
      media: "image",
      featured: "featured"
    },
    prepare({ title, subtitle, level, media, featured }) {
      return {
        title: `${featured ? "⭐ " : ""}${title}`,
        subtitle: `${subtitle || "Uncategorized"} • ${level || "No level set"}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Name A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Category",
      name: "categoryAsc",
      by: [
        { field: "category", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
    {
      title: "Featured First",
      name: "featuredFirst",
      by: [
        { field: "featured", direction: "desc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
})