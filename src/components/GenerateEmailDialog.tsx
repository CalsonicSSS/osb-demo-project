import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { InvoiceTableRow } from '@/typings/invoicing'
import { useCompletion } from 'ai/react'
import { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type GenerateEmailDialogProps = {
  selectedInvoices: InvoiceTableRow[]
  companyName: string
}

const GenerateEmailDialog = ({
  selectedInvoices,
  companyName,
}: GenerateEmailDialogProps) => {
  const [senderName, setSenderName] = useState('')
  const [receiverName, setReceiverName] = useState('')
  const [emailGoal, setEmailGoal] = useState('')

  const { complete, completion, isLoading } = useCompletion({
    api: '/api/gen-email',
  })

  const handleGenerateEmail = async () => {
    const prompt = `Generate a professional email from ${senderName} to ${receiverName} regarding the following invoices:

${selectedInvoices
  .map(
    (invoice, index) => `
Invoice ${index + 1}:
- Invoice Number: ${invoice.id}
- Current Balance: ${invoice.invoice_bal1}
- Original Invoice Amount: ${invoice.currency_value}
- Amount Paid: ${invoice.trn_value}
- Sales Order Number: ${invoice.sales_order_id}
- Document Type: ${invoice.document_type}
- Products: ${invoice.stock_description}
`,
  )
  .join('\n')}

Customer Company Name: ${companyName}
Email Goal: ${emailGoal}

Email generation requirements:
- The email should be professional and concise. Maintain a tone appropriate for B2B communication in the industrial manufacturing sector. Adjust the tone accordingly. 
- Consider each of the invoice details list above and the "Email Goal" provided, generate a tailored email content. (There could be some simple calculations needed based on the goal of email given).
- The sender is always from company called "OS&B". 

${
  selectedInvoices.length > 1
    ? '- Please include a invoices table summarizing information follow system table formatting instructions.'
    : ''
}
- Remember to strictly follow the Markdown structure provided in the system instructions, including all sections (Subject, Greeting, Body, Invoice Summary, Closing, and Signature).
`

    await complete(prompt)
  }

  const emailContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (emailContentRef.current) {
      emailContentRef.current.scrollTop = emailContentRef.current.scrollHeight
    }
  }, [completion])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Generate Email</Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden p-0 sm:max-w-[800px]">
        <DialogHeader className="border-b px-6 pb-4 pt-6">
          <DialogTitle className="text-2xl font-bold">
            Generate Follow-up Email
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 px-6 py-4">
          <div className="flex space-x-4">
            <Input
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Your Name *"
              className="flex-1"
            />
            <Input
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              placeholder="To (Receiver) *"
              className="flex-1"
            />
          </div>
          <Textarea
            value={emailGoal}
            onChange={(e) => setEmailGoal(e.target.value)}
            placeholder="What's your email goal? *"
            rows={3}
            className="w-full"
          />
          <div className="flex justify-between space-x-2">
            {[
              'Yourself',
              'Professional',
              'Content',
              'Short',
              'English',
              'No emoji',
            ].map((button) => (
              <Button
                key={button}
                variant="outline"
                size="sm"
                className="border-purple-600 text-purple-600"
              >
                {button}
              </Button>
            ))}
          </div>
        </div>
        <DialogFooter className="border-t px-6 py-4">
          <Button
            onClick={handleGenerateEmail}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Generating...' : 'Generate My Email with AI'}
          </Button>
        </DialogFooter>
        {completion && (
          <div
            className="flex-grow space-y-2 overflow-y-auto px-6 py-4 text-sm"
            id="email-content"
            ref={emailContentRef}
          >
            <div className="rounded-lg bg-purple-100 p-4">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  table: ({ node, ...props }) => (
                    <div className="max-w-full overflow-x-auto">
                      <table
                        className="min-w-full divide-y divide-gray-200 text-xs"
                        {...props}
                      />
                    </div>
                  ),
                  thead: ({ node, ...props }) => (
                    <thead className="bg-gray-50" {...props} />
                  ),
                  th: ({ node, ...props }) => (
                    <th
                      className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      {...props}
                    />
                  ),
                  td: ({ node, ...props }) => (
                    <td
                      className="whitespace-normal break-words px-3 py-2"
                      {...props}
                    />
                  ),
                  h1: ({ node, ...props }) => (
                    <h1 className="mb-4 mt-6 text-2xl font-bold" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2
                      className="mb-3 mt-5 text-xl font-semibold"
                      {...props}
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="mb-2 mt-4 text-lg font-medium" {...props} />
                  ),
                  p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                  ul: ({ node, ...props }) => (
                    <ul className="mb-4 list-disc space-y-2 pl-5" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol
                      className="mb-4 list-decimal space-y-2 pl-5"
                      {...props}
                    />
                  ),
                }}
              >
                {completion}
              </ReactMarkdown>
            </div>
            <Button variant="outline" className="w-full">
              Send Email
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default GenerateEmailDialog
