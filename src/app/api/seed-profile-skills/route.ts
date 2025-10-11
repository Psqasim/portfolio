    import { NextResponse } from "next/server"
import { uploadProfileAndSkills } from "../../utils/sanity-helpers"

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader || authHeader !== `Bearer ${process.env.SANITY_SEED_TOKEN}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const result = await uploadProfileAndSkills()
    if (result.success) {
      return NextResponse.json({ message: "Profile and skills seeded successfully" }, { status: 200 })
    }
    return NextResponse.json({ message: "Error seeding", error: result.error }, { status: 500 })
  } catch (error) {
    console.error("Error in seed-profile-skills route:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
