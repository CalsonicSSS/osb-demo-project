import {
  getCustomerById,
  getCustomerInvoiceRefs,
  getCustomerInvoices,
  getCustomerInvoicesPay,
} from '@/supabase/api'
import { redirect } from 'next/navigation'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import InventoryTable from '@/components/InventoryTable/InventoryTable'
import { Invoice, InvoicePay, InvoiceRef } from '@/typings/invoicing'

const CustomerPage = async ({ params }: { params: { id: string } }) => {
  const [customer, invoices, invoicesPay, invoiceRefs] = await Promise.all([
    getCustomerById(params.id),
    getCustomerInvoices(params.id),
    getCustomerInvoicesPay(params.id),
    getCustomerInvoiceRefs(params.id),
  ])

  if (!customer) redirect('/404')

  const formattedInvoices = formatDataForTable(
    invoices ?? [],
    invoicesPay ?? [],
    invoiceRefs ?? [],
  )

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
            <AccordionContent>
              <InventoryTable invoices={formattedInvoices ?? []} />
            </AccordionContent>
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

const formatDataForTable = (
  invoices: Pick<Invoice, 'currency_value' | 'invoice_bal1' | 'id'>[],
  invoicesPay: Pick<InvoicePay, 'id' | 'trn_value'>[],
  invoiceRefs: Pick<InvoiceRef, 'id' | 'sales_order_id' | 'document_type'>[],
) => {
  return invoices.map((invoice) => {
    const invoicePays = invoicesPay
      .filter((invoicePay) => invoicePay.id === invoice.id)
      .reduce((acc, curr) => acc + curr.trn_value ?? 0, 0)

    const salesOrderId =
      invoiceRefs?.find((invoiceRef) => invoiceRef.id === invoice.id)
        ?.sales_order_id ?? ''

    const documentType =
      invoiceRefs?.find((invoiceRef) => invoiceRef.id === invoice.id)
        ?.document_type ?? ''

    return {
      id: invoice.id,
      invoice_bal1: invoice.invoice_bal1,
      currency_value: invoice.currency_value,
      trn_value: invoicePays,
      sales_order_id: salesOrderId,
      document_type: documentType,
    }
  })
}

export default CustomerPage
