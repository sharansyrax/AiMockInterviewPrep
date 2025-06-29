"use client"
import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div
        className="hidden lg:flex w-1/2 bg-cover bg-center relative items-center justify-center p-10"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/d5/8c/d2/d58cd2377accb8f44ccf9a63ab574ded.jpg')",
        }}
      >
        <div className="bg-blue-100 bg-opacity-50 p-8 rounded-xl text-black max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4 bg-opacity-100 ">
            Welcome Back 👋
          </h1>
          <p className=" text-black">
            Join our community and explore a better way to stay signed in with
            personalized features and secure access.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white text-gray-900 p-6">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6"></div>

          <SignIn
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
            appearance={{
              elements: {
                card: "shadow-none p-0",
                formButtonPrimary:
                  "bg-blue-600 hover:bg-blue-700 text-white py-2 w-full rounded-md text-sm font-semibold",
                formFieldInput:
                  "border border-gray-300 rounded-md px-3 py-2 text-sm",
                footerActionText: "text-sm text-gray-600",
                footerActionLink:
                  "text-blue-600 hover:underline text-sm font-medium",
              },
              variables: {
                colorPrimary: "#2563eb",
                colorText: "#111827",
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
