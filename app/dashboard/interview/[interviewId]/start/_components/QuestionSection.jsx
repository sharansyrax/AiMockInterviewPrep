import { Lightbulb } from "lucide-react"
import React, { useState } from "react"
import { Volume2 } from "lucide-react"

const QuestionSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  const [activequestion, setactiveQuestion] = useState(activeQuestionIndex || 1)
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(speech)
    }
  }

  console.log("the questions", mockInterviewQuestion)
  return (
    mockInterviewQuestion && (
      <div className="my-10 px-3 py-5 border rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestion &&
            mockInterviewQuestion.map((question, index) => {
              return (
                <h2
                  className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer 
                 ${
                   activequestion === index + 1
                     ? "bg-black text-white"
                     : "bg-secondary"
                 }`}
                  onClick={() => setactiveQuestion(index + 1)}
                >
                  Question - {index + 1}
                </h2>
              )
            })}
        </div>
        <h2 className="my-5 text-md md:text-lg">
          {mockInterviewQuestion[activequestion - 1]?.question}
        </h2>
        <Volume2
          className="bg-secondary"
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activequestion - 1]?.question)
          }
        ></Volume2>

        <div className="border rounded-lg p-5 bg-black-100 mt-30 bg-secondary">
          <h2 className="flex gap-2 items-center text-black-700">
            <Lightbulb></Lightbulb> <strong>Note:</strong>
          </h2>
          <h2 className="text-sm text-primary my-2">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE}
          </h2>
        </div>
      </div>
    )
  )
}

export default QuestionSection
