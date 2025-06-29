"use client"
import { MockInterview, UserAnswer } from "@/utils/schema"
import React, { useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { db } from "@/utils/db"
import { eq } from "drizzle-orm"
import { useState } from "react"
import { desc } from "drizzle-orm"
import InterviewItemCard from "./InterviewItemCard"
const InterviewList = () => {
  const { user } = useUser()
  const [interviewList, setInterviewList] = useState([])

  useEffect(() => {
    user && getInterviewList()
  }, [user])
  const getInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(
        eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(MockInterview.id))
    console.log(result)
    setInterviewList(result)
  }
  return (
    <div className="">
      <h2 className="font-bold text-xl ">Previous Mock Interviews</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {interviewList &&
          interviewList.map((interview, index) => {
            return (
              <InterviewItemCard
                interview={interview}
                key={index}
              ></InterviewItemCard>
            )
          })}
      </div>
    </div>
  )
}

export default InterviewList
