export default {
    name: "project",
    title: "Projects",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "description",
        title: "Description",
        type: "array",
        of: [{ type: "block" }],
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "github",
        title: "GitHub URL",
        type: "url",
        description: "Leave empty if the repository is private",
      },
      {
        name: "isPrivateRepo",
        title: "Is Private Repository",
        type: "boolean",
        description: "Check if the GitHub repository is private",
        initialValue: false,
      },
      {
        name: "demo",
        title: "Demo URL",
        type: "url",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "image",
        title: "Project Image",
        type: "image",
        options: {
          hotspot: true,
        },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "tags",
        title: "Tags",
        type: "array",
        of: [{ type: "string" }],
        options: {
          layout: "tags",
        },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "order",
        title: "Order",
        type: "number",
        description: "Order to display projects (lower numbers appear first)",
        validation: (Rule: any) => Rule.required().min(1),
      },
    ],
    preview: {
      select: {
        title: "title",
        media: "image",
      },
    },
  }
  