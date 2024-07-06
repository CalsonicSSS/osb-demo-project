import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json()

  const result = await streamText({
    model: openai('gpt-4o'),
    messages: [
      {
        role: 'system',
        content: `You are an AI assistant that generates professional emails (also including tailored subject). Format your response using Markdown for better readability, including proper headings, lists, and tables where appropriate. For tables, use the following compact format and try to use abbreviations where possible to save space:

| Col 1 | Col 2 | Col 3 |
|-------|-------|-------|
| Data  | Data  | Data  |

Ensure to use bullet points where appropriate and use proper Markdown syntax for headings, lists, and other formattings properly throughout the email generation. Keep content concise and avoid unnecessary details to maintain readability in a compact format.`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  return result.toAIStreamResponse()
}
