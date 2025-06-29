"use client"
import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* Left Panel */}
      <div
        className="hidden lg:flex w-1/2 bg-cover bg-center relative items-center justify-center p-10"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/d5/8c/d2/d58cd2377accb8f44ccf9a63ab574ded.jpg')",
        }}
      >
        <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-xl text-white max-w-md text-center border border-white/30">
          <h1 className="text-4xl font-bold mb-4">Welcome Back 👋</h1>
          <p className="text-gray-200">
            Join our community and explore a better way to stay signed in with
            personalized features and secure access.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-black p-6">
        <div className="w-full max-w-md">
          <SignIn
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
            appearance={{
              elements: {
                card: "shadow-none p-0 bg-black text-white",
                formButtonPrimary:
                  "bg-white text-black hover:bg-gray-200 py-2 w-full rounded-md text-sm font-semibold",
                formFieldInput:
                  "border border-white/40 bg-transparent text-white rounded-md px-3 py-2 text-sm placeholder-white/50",
                footerActionText: "text-sm text-gray-400",
                footerActionLink:
                  "text-white hover:underline text-sm font-medium",
              },
              variables: {
                colorPrimary: "#ffffff",
                colorText: "#ffffff",
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
