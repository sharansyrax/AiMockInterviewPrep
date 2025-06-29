import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const InterviewItemCard = ({ interview }) => {
  return (
    <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[60%] mx-auto mb-4">
      <div className="border shadow-sm rounded-lg p-4 sm:p-5 bg-white">
        <h2 className="font-bold text-primary text-lg sm:text-xl">
          {interview?.jobPosition}
        </h2>
        <p className="text-sm text-gray-700 mt-1">
          {interview?.jobExperience} Years of Experience
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Created at: {interview?.createAt}
        </p>

        <div className="flex flex-col sm:flex-row justify-between mt-4 gap-3">
          <Link
            href={`/dashboard/interview/${interview?.mockId}/feedback`}
            className="w-full sm:w-auto"
          >
            <Button size="sm" variant="outline" className="w-full">
              Feedback
            </Button>
          </Link>
          <Link
            href={`/dashboard/interview/${interview?.mockId}`}
            className="w-full sm:w-auto"
          >
            <Button size="sm" className="w-full">
              Start
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default InterviewItemCard
