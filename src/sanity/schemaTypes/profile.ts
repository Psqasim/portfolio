import { defineField, defineType } from "sanity"

export default defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortBio",
      title: "Short Bio (Hero)",
      type: "text",
      rows: 3,
      description: "Short intro used in the Hero section.",
    }),
    defineField({
      name: "about",
      title: "About Paragraph",
      type: "text",
      rows: 8,
      description: "Longer paragraph used in the About section.",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "github",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "email" },
  },
})
