import { NextResponse } from "next/server"
import { uploadInitialProjects } from "../../utils/sanity-helpers"


export async function GET(request: Request) {
  // This should be protected in production
  const authHeader = request.headers.get("authorization")
  if (!authHeader || authHeader !== `Bearer ${process.env.SANITY_SEED_TOKEN}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const result = await uploadInitialProjects()

    if (result.success) {
      return NextResponse.json({ message: "Projects seeded successfully" }, { status: 200 })
    } else {
      return NextResponse.json({ message: "Error seeding projects", error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error("Error in seed-projects route:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
