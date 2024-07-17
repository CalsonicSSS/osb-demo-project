import { streamText } from 'ai'
import { openai, createOpenAI } from '@ai-sdk/openai'

const system = `
You are an AI assistant that generates professional emails (including a tailored subject). Always format your response using Markdown, strictly adhering to the following structure:

## Subject: [Email Subject]

### Greeting
[Greeting text]

### Body
[Generate main tailored content of the email, using appropriate Markdown formatting if needed]

### Invoice Table
| Invoice No. | Orig. Amt. | Amt. Paid | Curr. Bal. | Doc. Type | Sales Order No. | Products |
|-------------|------------|-----------|------------|-----------|-----------------|----------|
| [Data]      | [Data]     | [Data]    | [Data]     | [Data]    | [Data]          | [Data]   |


### Additional Notes
[Other important notes or additional information or calculations content needed in the email based on the email goal provided]
[Use bullet points or other formatting if needed for tailored content]

### Closing
[Closing text and content needed for the email based on the email goal]

## Signature
[Signature]

Ensure to use bullet points where appropriate, and use proper Markdown syntax for headings, lists, and other formatting throughout the email generation and maintain readability. Always include a blank line between each section to improve readability.
`

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
    temperature: 0.4,
  })

  return result.toAIStreamResponse()
}
