import { Lightbulb, Volume2 } from "lucide-react"
import React from "react"

const QuestionSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  setActiveQuestionIndex,
}) => {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(speech)
    }
  }

  return (
    mockInterviewQuestion && (
      <div className="my-10 px-3 py-5 border rounded-lg">
        {/* Question bubbles */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestion.map((_, index) => (
            <h2
              key={index}
              className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer
              ${
                activeQuestionIndex === index
                  ? "bg-black text-white"
                  : "bg-secondary"
              }`}
              onClick={() => setActiveQuestionIndex(index)}
            >
              Question - {index + 1}
            </h2>
          ))}
        </div>

        {/* Main question text */}
        <h2 className="my-5 text-md md:text-lg">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>

        {/* Speaker icon */}
        <Volume2
          className="bg-secondary cursor-pointer"
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
          }
        />

        {/* Note Section */}
        <div className="border rounded-lg p-5 bg-black-100 mt-30 bg-secondary">
          <h2 className="flex gap-2 items-center text-black-700">
            <Lightbulb /> <strong>Note:</strong>
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
