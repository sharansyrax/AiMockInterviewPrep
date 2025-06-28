"use client"
import React, { useEffect, useState } from "react"
import { db } from "@/utils/db"
import { MockInterview } from "@/utils/schema"
import { eq } from "drizzle-orm"
import QuestionSection from "./_components/QuestionSection"
import RecordAnswerSection from "./_components/RecordAnswerSection"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState()
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([])
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId))

    const jsonMockResp = JSON.parse(result[0].jsonMockResp)
    setMockInterviewQuestion(jsonMockResp)
    setInterviewData(result[0])
    console.log("Questions Array:", jsonMockResp)
  }

  useEffect(() => {
    GetInterviewDetails()
  }, [])

  useEffect(() => {
    console.log("Active Question Index:", activeQuestionIndex)
    console.log("Mock ID for link:", interviewData?.mockId)
  }, [activeQuestionIndex])

  const handlePrevious = () => {
    setActiveQuestionIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleNext = () => {
    if (
      mockInterviewQuestion &&
      activeQuestionIndex < mockInterviewQuestion.length - 1
    ) {
      setActiveQuestionIndex((prev) => prev + 1)
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Question Section */}
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex} // ✅ add this line
        />

        {/* Video Recording Section */}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-6 justify-end mb-10">
        {activeQuestionIndex > 0 && (
          <Button onClick={handlePrevious}>Previous Question</Button>
        )}
        <Button
          onClick={handleNext}
          disabled={activeQuestionIndex >= mockInterviewQuestion.length - 1}
        >
          Next Question
        </Button>
        {interviewData?.mockId && (
          <Link href={`/dashboard/interview/${interviewData.mockId}/feedback`}>
            <Button variant="destructive">End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default StartInterview
