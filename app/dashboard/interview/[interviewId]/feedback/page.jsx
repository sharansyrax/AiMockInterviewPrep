"use client"
import React, { useEffect, useState } from "react"
import { db } from "@/utils/db"
import { eq } from "drizzle-orm"
import { UserAnswer } from "@/utils/schema"

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
  }

  return (
    <div>
      <div className="p-10">
        <h2 className="text-3xl text-green-500 font-bold">Congrats!!</h2>
        <h2 className="font-bold text-2xl p-2">
          Look at your Interview Feedback
        </h2>
        <h2>
          Your overall rating: <strong></strong>
        </h2>
        <h2 className="text-sm text-gray-500">
          Find the AI mock answers given for the same questions along with your
          feedback
        </h2>
      </div>
    </div>
  )
}

export default FeedBackPage
