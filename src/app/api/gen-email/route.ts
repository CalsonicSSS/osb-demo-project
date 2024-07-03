import { streamText } from 'ai'
import { google } from '@ai-sdk/google'

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json()

  const result = await streamText({
    model: google('models/gemini-1.5-pro-latest'),
    system: 'You are an email generator.',
    prompt,
  })

  return result.toAIStreamResponse()
}
