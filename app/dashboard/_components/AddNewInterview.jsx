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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Ghost, LoaderCircle } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { ChatSession } from "@google/generative-ai"
import { useUser } from "@clerk/nextjs"
import moment from "moment"

import { MockInterview } from "@/utils/schema"
import { db } from "@/utils/db.js" // adjust path to your actual DB export
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
    console.log(jobDescription, jobExperience, jobPosition)

    const InputPrompt =
      "A person is applying for Job with job role" +
      jobPosition +
      " with tech stacks " +
      jobDescription +
      "and years of experience is " +
      jobExperience +
      " and generate" +
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
      " Questions with answers in JSON format, Give us question and answer field on JSON"
    const url = "/api/geminiapi"

    console.log("🔗 Fetching from URL:", window.location.origin + url)

    const res = await fetch("/api/geminiapi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ InputPrompt }),
    })
    const data = await res.json()
    const MockResponse = data.result.replace("```json", "").replace("```", "")
    console.log(JSON.parse(MockResponse))
    setJsonResponse(MockResponse)

    if (MockResponse) {
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),

          jsonMockResp: MockResponse,
          jobPosition: jobPosition,
          jobDesc: jobDescription,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createAt: moment().format("DD-MM-YYYY"),
        })
        .returning({ mockId: MockInterview.mockId })
      console.log("Inserted id:", resp)
      if (resp) {
        setOpendialog(false)
        router.push("/dashboard/interview/" + resp[0].mockId)
      }
    } else {
      console.log("error")
    }
    setloading(false)
  }
  return (
    <div>
      <div
        onClick={() => setOpendialog(true)}
        className="border rounded-lg p-10 bg-secondary 
      hover:scale-105 hover:shadow-md cursor-pointer transition-all"
      >
        <h2 className=" text-lg text-center">+Add New</h2>
      </div>

      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about yourself Job Interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add details about your Job position /role ,Job description
                    and years of experience
                  </h2>
                  <div className="mt-7 my-4">
                    <label>Job Description/Tech stacks required</label>
                    <Input
                      required
                      className="my-3"
                      placeholder="Enter your job role "
                      onChange={(event) =>
                        setJobDescription(event.target.value)
                      }
                    ></Input>
                  </div>
                  <div className="my-3">
                    <label>Job Role/Job position</label>
                    <Textarea
                      required
                      className="my-3"
                      placeholder="Ex. html/css/js "
                      onChange={(event) => setJobPosition(event.target.value)}
                    ></Textarea>
                  </div>
                  <div className="mt-7 my-4">
                    <label>Years of experience</label>
                    <Input
                      required
                      type="Number"
                      className="my-3"
                      placeholder="Ex. 2yoe "
                      max="30"
                      onChange={(event) => setJobExperience(event.target.value)}
                    ></Input>
                  </div>
                </div>

                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setOpendialog(false)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        'Generating from AI'
                      </>
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
