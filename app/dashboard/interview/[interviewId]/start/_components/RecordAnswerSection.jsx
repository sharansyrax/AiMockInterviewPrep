"use client"
import React, { useEffect, useState } from "react"
import Webcam from "react-webcam"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import useSpeechToText from "react-hook-speech-to-text"
import { Mic, Pause } from "lucide-react"
import { toast } from "sonner"
import { UserAnswer } from "@/utils/schema"
import { useUser } from "@clerk/nextjs"
import moment from "moment"
import { Truculenta } from "next/font/google"
import { db } from "@/utils/db"

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("")
  const { user } = useUser()

  const [loadingState, setLoadingState] = useState(false)
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  })

  useEffect(() => {
    const transcript = results.map((result) => result.transcript).join(" ")
    setUserAnswer(transcript)
  }, [results])

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      updateUserAnswerInDb()
    }
    // if (userAnswer?.length < 10) {
    //   setLoadingState(false)
    //   toast.error("Error while saving your answer. Please record again")
    //   return
    // }
  }, [userAnswer])
  const startStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText()
    } else {
      startSpeechToText()
    }
  }

  const updateUserAnswerInDb = async () => {
    console.log(userAnswer)
    setLoadingState(true)
    const feedbackPrompt =
      "Question is " +
      mockInterviewQuestion[activeQuestionIndex]?.question +
      " and users recorded answer is " +
      userAnswer +
      "can you give him a valid usefull feedback rating for answer and area of improvement " +
      " so that he can prepare well for future interviews in 3-5 lines in JSON format with " +
      "rating and feedback field "
    const url = "/api/geminiapi"

    console.log("🔗 Fetching from URL:", window.location.origin + url)

    const res = await fetch("/api/geminiapi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ InputPrompt: feedbackPrompt }),
    })
    const data = await res.json()
    const MockResponse = data.result.replace("```json", "").replace("```", "")

    console.log(data.result)
    console.log(interviewData)
    const JsonFeedbackResp = JSON.parse(MockResponse)

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQuestion[activeQuestionIndex]?.question,
      correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: JsonFeedbackResp?.feedback,
      rating: JsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-YYYY"),
    })
    if (resp) {
      toast("User answer recorded successfully")
      setUserAnswer("")
      setResults([])
    }
    setResults([])
    setLoadingState(false)
  }
  return (
    <div className="flex items-center justify-center  flex-col">
      <div className="flex flex-col justify-center items-center bg-black p-5 mt-20 rounded-lg">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute"
        ></Image>
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        ></Webcam>
      </div>
      <Button
        disable={loadingState}
        variant="outline"
        className="my-10"
        onClick={startStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-500 flex gap-2">
            <Pause></Pause>Stop Recording....
          </h2>
        ) : (
          <h2 className="text-gray flex gap-2">
            <Mic></Mic>Start Recording!!
          </h2>
        )}
      </Button>
      {/* <Button onClick={() => console.log(userAnswer)}>Show</Button> */}
    </div>
  )
}

export default RecordAnswerSection
