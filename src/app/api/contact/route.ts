import { NextResponse } from "next/server"
import { createClient } from "next-sanity"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message, receivedAt } = body

    // Validate the required fields
    if (!name || !email || !message) {
      return NextResponse.json({ message: "Name, email, and message are required" }, { status: 400 })
    }

    // Create a new document in Sanity
    const result = await client.create({
      _type: "contact",
      name,
      email,
      message,
      receivedAt: receivedAt || new Date().toISOString(),
    })

    return NextResponse.json({ message: "Message sent successfully", id: result._id }, { status: 201 })
  } catch (error) {
    console.error("Error saving contact message:", error)
    return NextResponse.json({ message: "Error saving message" }, { status: 500 })
  }
}
