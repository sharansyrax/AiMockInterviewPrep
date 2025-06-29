"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white px-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold">
          Welcome to InterviewPrep.AI
        </h1>
        <p className="text-lg sm:text-xl text-gray-400">
          Sharpen your skills with AI-generated mock interviews
        </p>
        <Button
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg text-lg transition"
          onClick={() => router.push("/dashboard")}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
}
