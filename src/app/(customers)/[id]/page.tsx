import { getCustomerById } from '@/supabase/api'
import { redirect } from 'next/navigation'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const CustomerPage = async ({ params }: { params: { id: string } }) => {
  const customerData = await getCustomerById(params.id)

  if (!customerData) redirect('/404')

  return (
    <div className="flex h-full w-full">
      <div className="h-full w-96 bg-muted p-4">
        <h1 className="pb-5">stuff goes here</h1>
      </div>
      <div className="h-full w-full p-4">
        <div className="flex gap-4">
          <div className="h-44 w-full rounded-md bg-muted">card</div>
          <div className="h-44 w-full rounded-md bg-muted">card</div>
          <div className="h-44 w-full rounded-md bg-muted">card</div>
          <div className="h-44 w-full rounded-md bg-muted">card</div>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Invoices</AccordionTrigger>
            <AccordionContent>Mock stuff</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Orders</AccordionTrigger>
            <AccordionContent>Mock stuff</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Other</AccordionTrigger>
            <AccordionContent>Mock stuff</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default CustomerPage
