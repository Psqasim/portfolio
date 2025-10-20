// import { defineType, defineField } from "sanity"

// export default defineType({
//   name: "experience",
//   title: "Experience",
//   type: "document",
//   fields: [
//     defineField({
//       name: "title",
//       title: "Job Title",
//       type: "string",
//       validation: (Rule) => Rule.required().max(80),
//       description: "e.g., 'Frontend Developer', 'Software Engineer'",
//     }),
//     defineField({
//       name: "company",
//       title: "Company Name",
//       type: "string",
//       validation: (Rule) => Rule.required().max(80),
//     }),
//     defineField({
//       name: "companyLogo",
//       title: "Company Logo",
//       type: "image",
//       options: { hotspot: true },
//       description: "Optional: Logo of the company",
//     }),
//     defineField({
//       name: "location",
//       title: "Location",
//       type: "string",
//       description: "e.g., 'Karachi, Pakistan', 'Remote'",
//     }),
//     defineField({
//       name: "startDate",
//       title: "Start Date",
//       type: "date",
//       options: { dateFormat: "YYYY-MM-DD" },
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: "endDate",
//       title: "End Date",
//       type: "date",
//       options: { dateFormat: "YYYY-MM-DD" },
//       description: "Leave empty if currently working here",
//     }),
//     defineField({
//       name: "description",
//       title: "Responsibilities/Achievements",
//       type: "array",
//       of: [
//         {
//           type: "block",
//           styles: [{ title: "Normal", value: "normal" }],
//           lists: [{ title: "Bullet", value: "bullet" }],
//           marks: {
//             decorators: [
//               { title: "Strong", value: "strong" },
//               { title: "Emphasis", value: "em" },
//             ],
//           },
//         },
//       ],
//       description: "Key responsibilities and achievements (use bullet points)",
//     }),
//     defineField({
//       name: "technologies",
//       title: "Technologies Used",
//       type: "array",
//       of: [{ type: "string" }],
//       options: { layout: "tags" },
//       description: "Technologies and tools used in this role (e.g., React, Next.js, Python)",
//     }),
//     defineField({
//       name: "order",
//       title: "Display Order",
//       type: "number",
//       description: "Lower numbers appear first (1, 2, 3...)",
//       validation: (Rule) => Rule.required().min(1).integer(),
//       initialValue: 1,
//     }),
//   ],
//   preview: {
//     select: {
//       title: "title",
//       subtitle: "company",
//       media: "companyLogo",
//       startDate: "startDate",
//       endDate: "endDate",
//     },
//     prepare(selection) {
//       const { title, subtitle, media, startDate, endDate } = selection
//       const duration = startDate
//         ? `${new Date(startDate).getFullYear()} – ${endDate ? new Date(endDate).getFullYear() : "Present"}`
//         : ""
//       return {
//         title: title,
//         subtitle: `${subtitle} (${duration})`,
//         media: media,
//       }
//     },
//   },
//   orderings: [
//     {
//       title: "Start Date, Newest First",
//       name: "startDateDesc",
//       by: [{ field: "startDate", direction: "desc" }],
//     },
//     {
//       title: "Display Order",
//       name: "orderAsc",
//       by: [{ field: "order", direction: "asc" }],
//     },
//   ],
// })