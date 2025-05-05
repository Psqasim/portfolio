export default {
    name: "contact",
    title: "Contact Messages",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Name",
        type: "string",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "email",
        title: "Email",
        type: "string",
        validation: (Rule: any) => Rule.required().email(),
      },
      {
        name: "message",
        title: "Message",
        type: "text",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "receivedAt",
        title: "Received At",
        type: "datetime",
        options: {
          dateFormat: "YYYY-MM-DD",
          timeFormat: "HH:mm",
          timeStep: 15,
          calendarTodayLabel: "Today",
        },
      },
    ],
    preview: {
      select: {
        title: "name",
        subtitle: "email",
      },
    },
  }
  