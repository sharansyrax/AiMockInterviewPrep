"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { v4 as uuidv4 } from "uuid"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { LoaderCircle } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useUser } from "@clerk/nextjs"
import moment from "moment"
import { MockInterview } from "@/utils/schema"
import { db } from "@/utils/db.js"
import { useRouter } from "next/navigation"

const AddNewInterview = () => {
  const [openDialog, setOpendialog] = useState(false)
  const [jobPosition, setJobPosition] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [jobExperience, setJobExperience] = useState("")
  const [loading, setloading] = useState(false)
  const [JsonResponse, setJsonResponse] = useState()
  const { user } = useUser()
  const router = useRouter()

  const onSubmit = async (event) => {
    setloading(true)
    event.preventDefault()

    const InputPrompt = `A person is applying for Job with job role ${jobPosition} with tech stacks ${jobDescription} and years of experience is ${jobExperience}. Generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} questions with answers in JSON format. Give us question and answer field on JSON.`

    const res = await fetch("/api/geminiapi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ InputPrompt }),
    })

    const data = await res.json()
    const MockResponse = data.result.replace("```json", "").replace("```", "")
    setJsonResponse(MockResponse)

    if (MockResponse) {
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockResponse,
          jobPosition,
          jobDesc: jobDescription,
          jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createAt: moment().format("DD-MM-YYYY"),
        })
        .returning({ mockId: MockInterview.mockId })

      if (resp) {
        setOpendialog(false)
        router.push("/dashboard/interview/" + resp[0].mockId)
      }
    } else {
      console.log("Error generating mock response")
    }
    setloading(false)
  }

  return (
    <div>
      <div
        onClick={() => setOpendialog(true)}
        className="border rounded-lg p-6 md:p-10 bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all w-full sm:w-auto text-center"
      >
        <h2 className="text-base sm:text-lg">+ Add New</h2>
      </div>

      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl w-full px-4 sm:px-6">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl text-center">
              Tell us more about your Job Interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit} className="mt-4 space-y-6">
                <div>
                  <label className="block font-medium mb-2">
                    Job Description / Tech Stacks Required
                  </label>
                  <Input
                    required
                    placeholder="Ex: Frontend Development"
                    onChange={(e) => setJobPosition(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">
                    Job Role / Position
                  </label>
                  <Textarea
                    required
                    placeholder="Ex: HTML, CSS, JavaScript, React"
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">
                    Years of Experience
                  </label>
                  <Input
                    required
                    type="number"
                    placeholder="Ex: 2"
                    max="30"
                    onChange={(e) => setJobExperience(e.target.value)}
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpendialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <LoaderCircle className="animate-spin" size={16} />
                        Generating from AI...
                      </span>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewInterview
