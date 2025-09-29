import { type NextRequest, NextResponse } from "next/server"
import { createSession, verifyPassword } from "@/lib/auth"
import { query } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Query admin user
    const result = await query("SELECT id, email, username, password_hash FROM admin_users WHERE email = $1", [email])

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const user = result.rows[0]

    // Verify password
    const isValid = await verifyPassword(password, user.password_hash)

    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create session
    await createSession({
      id: user.id,
      email: user.email,
      username: user.username,
    })

    // Update last login
    await query("UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = $1", [user.id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
