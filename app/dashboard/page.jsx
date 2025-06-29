import { UserButton } from "@clerk/nextjs"
import React from "react"
import AddNewInterview from "./_components/AddNewInterview"
import InterviewList from "./_components/InterviewList"

const Dashboard = () => {
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Dashboard</h2>
      <h2 className="text-gray-500">
        Create and start your Ai Mock Interview prep
      </h2>
      <div>
        <AddNewInterview></AddNewInterview>
      </div>

      <InterviewList></InterviewList>
    </div>
  )
}

export default Dashboard
