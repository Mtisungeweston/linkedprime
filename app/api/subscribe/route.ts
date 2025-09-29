import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    // Check if email already exists
    const existing = await query("SELECT id, is_active FROM subscribers WHERE email = $1", [email])

    if (existing.rows.length > 0) {
      if (existing.rows[0].is_active) {
        return NextResponse.json({ error: "This email is already subscribed" }, { status: 400 })
      } else {
        // Reactivate subscription
        await query("UPDATE subscribers SET is_active = true, subscribed_at = CURRENT_TIMESTAMP WHERE email = $1", [
          email,
        ])
        return NextResponse.json({ success: true, message: "Subscription reactivated" })
      }
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex")

    // Insert new subscriber
    await query("INSERT INTO subscribers (email, verification_token) VALUES ($1, $2)", [email, verificationToken])

    // In production, send verification email here
    // For now, we'll auto-verify
    await query("UPDATE subscribers SET verified_at = CURRENT_TIMESTAMP WHERE email = $1", [email])

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter",
    })
  } catch (error) {
    console.error("Subscription error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
