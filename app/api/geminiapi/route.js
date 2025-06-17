import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(req) {
  const { InputPrompt } = await req.json()

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY)

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  })

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  }

  // ✅ Create a new chat session
  const chatSession = model.startChat({
    generationConfig,
  })

  // ✅ Send user message to Gemini
  const result = await chatSession.sendMessage(InputPrompt)

  // ✅ Extract plain text
  const text = await result.response.text()

  return Response.json({ result: text })
}
