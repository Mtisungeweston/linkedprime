import { cookies } from "next/headers"
import type { NextRequest } from "next/server"

export interface AdminUser {
  id: number
  email: string
  username: string
}

// Simple session management using cookies
export async function createSession(user: AdminUser) {
  const cookieStore = await cookies()
  const sessionData = JSON.stringify({
    id: user.id,
    email: user.email,
    username: user.username,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  })

  cookieStore.set("admin_session", sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60, // 24 hours
  })
}

export async function getSession(): Promise<AdminUser | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("admin_session")

  if (!sessionCookie) {
    return null
  }

  try {
    const session = JSON.parse(sessionCookie.value)

    // Check if session is expired
    if (session.expiresAt < Date.now()) {
      await destroySession()
      return null
    }

    return {
      id: session.id,
      email: session.email,
      username: session.username,
    }
  } catch {
    return null
  }
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_session")
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // Simple password verification (in production, use bcrypt)
  // For demo purposes, we'll check if password matches "Admin2025"
  return password === "Admin2025"
}

export function requireAuth(request: NextRequest) {
  const sessionCookie = request.cookies.get("admin_session")

  if (!sessionCookie) {
    return false
  }

  try {
    const session = JSON.parse(sessionCookie.value)
    return session.expiresAt > Date.now()
  } catch {
    return false
  }
}
