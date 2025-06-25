"use client"
import React, { useEffect, useState } from "react"
import { db } from "@/utils/db"
import { MockInterview } from "@/utils/schema"
import { eq } from "drizzle-orm"
import QuestionSection from "./_components/QuestionSection"
import RecordAnswerSection from "./_components/RecordAnswerSection"
const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState()
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState()
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId))
    const jsonMockResp = JSON.parse(result[0].jsonMockResp)
    setMockInterviewQuestion(jsonMockResp)
    console.log(jsonMockResp)
    setInterviewData(result[0])
  }
  useEffect(() => {
    GetInterviewDetails()
  }, [])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* question section */}
      <QuestionSection
        mockInterviewQuestion={mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}
      ></QuestionSection>
      {/* video recording section */}
      <RecordAnswerSection
        mockInterviewQuestion={mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}
        interviewData={interviewData}
      ></RecordAnswerSection>
    </div>
  )
}

export default StartInterview
