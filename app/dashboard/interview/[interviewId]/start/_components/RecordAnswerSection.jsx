import React from "react"
import Webcam from "react-webcam"
import Image from "next/image"
import { Button } from "@/components/ui/button"
const RecordAnswerSection = () => {
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
      <Button variant="outline" className="my-10">
        Record Answer
      </Button>
    </div>
  )
}

export default RecordAnswerSection
