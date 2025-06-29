"use client"
import React, { useEffect, useState } from "react"
import { db } from "@/utils/db"
import { eq } from "drizzle-orm"
import { UserAnswer } from "@/utils/schema"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const FeedBackPage = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([])
  useEffect(() => {
    GetFeedback()
  }, [])

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId)) // use the correct column name
      .orderBy(UserAnswer.id)
    console.log(result)
    setFeedbackList(result)
  }

  const overallfeedback = () => {
    if (feedbackList.length === 0) return null
    const total = feedbackList.reduce(
      (sum, item) => sum + (item.rating || 0),
      0
    )
    const avg = total / feedbackList.length
    return avg
  }

  return (
    <div>
      <div className="p-10">
        <Link href="/dashboard" className="flex justify-end">
          <Button>Go home</Button>
        </Link>
        <h2 className="text-3xl text-green-500 font-bold">Congrats!!</h2>
        <h2 className="font-bold text-2xl p-2">
          Look at your Interview Feedback
        </h2>
        <h2>
          Your overall rating:{" "}
          <strong>
            {feedbackList?.length === 0 ? (
              <h2 className="font-bold text-xl text-gray-400">
                No interview Taken
              </h2>
            ) : (
              <h2 className="text-3xl text-green-300">
                {overallfeedback()}/10
              </h2>
            )}
          </strong>
        </h2>
        <h2 className="text-sm text-gray-500">
          Find the AI mock answers given for the same questions along with your
          feedback
        </h2>
        {feedbackList &&
          feedbackList.map((item, index) => (
            <Collapsible key={index} className="mt-7">
              <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7">
                {item.question || "No question provided"}
                <ChevronsUpDownIcon className="h-5 w-5"></ChevronsUpDownIcon>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                  <p className="text-red-500 my-2 rounded-lg text-xl">
                    <strong> Rating:</strong> {item.rating}
                  </p>
                  <p className="bg-red-200 text-red-900 rounded-lg p-2">
                    <strong>Your Answer:</strong> {item.userAns}
                  </p>
                  <p className="bg-green-200 text-green-900 rounded-lg p-2">
                    <strong>Ai Answer for reference:</strong> {item.correctAns}
                  </p>

                  <p className="bg-blue-200 text-blue-900 rounded-lg p-2">
                    <strong>Feedback:</strong> {item.feedback}
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
      </div>
    </div>
  )
}

export default FeedBackPage
