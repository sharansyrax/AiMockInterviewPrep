// app/page.tsx
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default function Home() {
  const { userId } = auth()

  if (userId) {
    redirect("/dashboard") // Authenticated user
  }

  redirect("/sign-in") // Not signed in
}
