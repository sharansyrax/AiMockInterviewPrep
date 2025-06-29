"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-6">
      <h1 className="text-4xl font-bold">Welcome to the App</h1>
      <p className="text-lg text-gray-600">
        Please sign in or sign up to continue
      </p>
      <div className="flex gap-4">
        <Link href="/sign-in">
          <Button>Sign In</Button>
        </Link>
        <Link href="/sign-up">
          <Button variant="outline">Sign Up</Button>
        </Link>
      </div>
    </div>
  )
}
