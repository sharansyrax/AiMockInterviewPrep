import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const InterviewItemCard = ({ interview }) => {
  return (
    <div>
      <div className="border shadow-sm rounded-lg p-3">
        <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>
        <h2 className="text-sm text-gray-700">
          {interview?.jobExperience} Years of Experience
        </h2>
        <h2 className="text-xs text-gray-600">
          Created at:{interview?.createAt}
        </h2>
        <div className="flex justify-between md:flex flex-row  mt-2 gap-5">
          <Link
            href={"/dashboard/interview/" + interview?.mockId + "/feedback"}
          >
            <Button size="sm" variant="outline">
              Feedback
            </Button>
          </Link>
          <Link href={"/dashboard/interview/" + interview?.mockId + ""}>
            <Button size="sm">Start</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default InterviewItemCard
