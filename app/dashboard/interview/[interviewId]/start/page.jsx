"use client"
import React, { useEffect, useState } from "react"
import { db } from "@/utils/db"
import { MockInterview } from "@/utils/schema"
import { eq } from "drizzle-orm"
const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState()
  const [MockInterviewQuestion, setMockInterviewQuestion] = useState()
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
  return <div className="grid grid-cols-1 md:grid-cols-2"></div>
}

export default StartInterview
