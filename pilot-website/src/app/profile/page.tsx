"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

// This is a redirect page that sends users to their own profile
export default function ProfilePage() {
  const router = useRouter()

  useEffect(() => {
    // In a real app, you'd get the current user's username from auth context
    const currentUsername = "hussain_ak" // Example username
    router.push(`/profile/${currentUsername}`)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse">Redirecting to your profile...</div>
    </div>
  )
}