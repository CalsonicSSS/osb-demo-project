import { streamText } from 'ai'
import { openai, createOpenAI } from '@ai-sdk/openai'

const system = `
You are an AI assistant that generates professional emails (also including tailored subject). Format your response using Markdown for better readability, including proper headings, lists, and tables where appropriate. For tables, use the following compact format and try to use abbreviations where possible to save space:

| Col 1 | Col 2 | Col 3 |
|-------|-------|-------|
| Data  | Data  | Data  |

Ensure to use bullet points where appropriate, and use proper Markdown syntax for headings, lists, and make sure to seperate email paragaphs / section accordingly, along with other formattings properly throughout the email generation. Keep content concise and avoid unnecessary details to maintain readability in a compact format.`

// for local development & testing, use the following
// const localOpenai = createOpenAI({
//   // custom settings, e.g.
//   compatibility: 'strict', // strict mode, enable when using the OpenAI API
//   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
// })

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json()

  const result = await streamText({
    model: openai('gpt-4o'),
    system,
    prompt,
  })

  return result.toAIStreamResponse()
}
