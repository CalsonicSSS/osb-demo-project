'use client'
import { useCompletion } from 'ai/react'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Button } from './ui/button'

type GenerateEmailDialogProps = {
  companyName: string
}

const GenerateEmailDialog = ({ companyName }: GenerateEmailDialogProps) => {
  const { completion, complete } = useCompletion({ api: '/api/gen-email' })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Generate Email</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Email gen test</DialogTitle>
        </DialogHeader>

        <DialogBody>
          <Textarea rows={40} value={completion} />
        </DialogBody>

        <Button
          onClick={async () => {
            await complete(
              `Generate an email to a company named ${companyName} asking for them to pay their invoice.`,
            )
          }}
        >
          Generate
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default GenerateEmailDialog
