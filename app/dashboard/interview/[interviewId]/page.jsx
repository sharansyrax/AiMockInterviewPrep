"use client"
import { MockInterview } from "@/utils/schema"
import React, { useEffect, useState } from "react"
import { db } from "@/utils/db.js"
import { eq } from "drizzle-orm"
import Webcam from "react-webcam"
import { Lightbulb, WebcamIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Interview = ({ params }) => {
  const [interviewData, setInterviewData] = useState()
  const [webCamEnabled, setwebCamEnabled] = useState(false)

  useEffect(() => {
    console.log(params.interviewId)
    GetInterviewDetails()
  }, [])
  //used to get interview details by mockId
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId))
    console.log(result)
    setInterviewData(result[0])
  }
  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5 ">
          {interviewData ? (
            <div className="flex flex-col gap-5 p-5 rounded-lg border">
              <h2 className="text-lg">
                <strong>Job Role/Job Position: </strong>
                {interviewData.jobPosition}
              </h2>
              <h2 className="text-lg">
                <strong>Job Description: </strong>
                {interviewData.jobDesc}
              </h2>
              <h2 className="text-lg">
                <strong>Years of Experience: </strong>
                {interviewData.jobExperience}
              </h2>
            </div>
          ) : (
            <p>Loading interview details...</p>
          )}

          <div className="p-5 border rounded-lg border-gray-200 bg-gray-200">
            <h2 className="flex gap-2 items-center font-bold  pb-5 text-black-500">
              <Lightbulb></Lightbulb>
              <span>Information</span>
            </h2>
            <h2>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
        </div>
        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setwebCamEnabled(true)}
              onUserMediaError={() => setwebCamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            ></Webcam>
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setwebCamEnabled(true)}
              >
                Enable Web Cam and MicroPhone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  )
}

export default Interview
