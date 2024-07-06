import {
  getCustomerById,
  getCustomerInvoicesWithProducts,
  getCustomerInvoiceRefs,
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Invoice, InvoicePay, InvoiceRef } from '@/typings/invoicing'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CustomerCharts from '@/components/CustomerCharts'

const CustomerPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params

  const [customer, invoices, invoicesPay, invoiceRefs] = await Promise.all([
    getCustomerById(id),
    getCustomerInvoicesWithProducts(id),
    getCustomerInvoicesPay(id),
    getCustomerInvoiceRefs(id),
  ])

  if (!customer) redirect('/404')

  const { name } = customer

  const invoiceCount = invoices?.length ?? 0

  const totalAmountDue =
    invoices?.reduce((acc, curr) => acc + curr.invoice_bal1, 0) ?? 0

  const invoiceOutstanding =
    invoices?.reduce((acc, curr) => {
      if (curr.invoice_bal1 > 0) {
        return acc + curr.invoice_bal1
      }
      return acc
    }, 0) ?? 0

  const avgInvoiceValue = invoiceCount > 0 ? totalAmountDue / invoiceCount : 0

  const { totalUnitPriceSum, totalCountOfProducts, totalUnitPriceCost } =
    invoices?.reduce(
      (acc, curr) => {
        const products = curr?.products ?? []
        const productUnitPriceSum = products.reduce((acc, product) => {
          return acc + (product?.price ?? 0)
        }, 0)

        const totalCost = products.reduce((acc, product) => {
          return acc + product?.unit_cost
        }, 0)

        return {
          totalUnitPriceSum: acc.totalUnitPriceSum + productUnitPriceSum,
          totalCountOfProducts: acc.totalCountOfProducts + products.length,
          totalUnitPriceCost: acc.totalUnitPriceCost + totalCost,
        }
      },
      { totalUnitPriceSum: 0, totalCountOfProducts: 0, totalUnitPriceCost: 0 },
    ) ?? {
      totalUnitPriceSum: 0,
      totalCountOfProducts: 0,
      totalUnitPriceCost: 0,
    }

  const avgUnitPrice =
    totalCountOfProducts > 0 ? totalUnitPriceSum / totalCountOfProducts : 0

  const avgUnitCost = totalUnitPriceCost / totalCountOfProducts || 0

  const avgOrderQty =
    totalCountOfProducts > 0 ? totalCountOfProducts / invoiceCount : 0

  const avgProfitMargin =
    ((avgUnitPrice - avgUnitCost) / avgUnitPrice) * 100 || 100

  const formattedInvoices = formatDataForTable(
    invoices ?? [],
    invoicesPay ?? [],
    invoiceRefs ?? [],
  )

  return (
    <div className="flex h-full w-full">
      <div className="h-full w-96 p-6 pr-3">
        <div className="mb-3 flex flex-col items-center gap-3 rounded-sm border py-4">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">
              {name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-semibold">{name}</h1>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Contact</AccordionTrigger>
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
      <div className="h-full w-full overflow-auto p-6 pl-3">
        <CustomerCharts
          customer={customer}
          salesOrders={invoiceRefs?.length ?? 0}
          totalAmountDue={totalAmountDue}
          invoiceOutstanding={invoiceOutstanding}
          avgInvoiceValue={avgInvoiceValue}
          avgUnitPrice={avgUnitPrice}
          avgOrderQty={avgOrderQty}
          avgProfitMargin={avgProfitMargin}
        />
        <Tabs defaultValue="Invoices" className="mb-4 ">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="Invoices">Invoices</TabsTrigger>
            <TabsTrigger value="Orders">Orders</TabsTrigger>
            <TabsTrigger value="Other">Other</TabsTrigger>
          </TabsList>
          <TabsContent value="Invoices" className="pt-4">
            <InventoryTable
              invoices={formattedInvoices ?? []}
              companyName={customer.name ?? ''}
            />
          </TabsContent>
          <TabsContent value="Orders" className="pt-4">
            Change your password here.
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

type InvoiceWithProducts = Pick<
  Invoice,
  'currency_value' | 'invoice_bal1' | 'id'
> & {
  products: { stock_description: string | null }[] | null
}

const formatDataForTable = (
  invoices: InvoiceWithProducts[],
  invoicesPay: Pick<InvoicePay, 'id' | 'trn_value'>[],
  invoiceRefs: Pick<InvoiceRef, 'id' | 'sales_order_id' | 'document_type'>[],
) =>
  invoices.map((invoice) => {
    const invoicePays = invoicesPay
      .filter(({ id }) => id === invoice.id)
      .reduce((acc, curr) => acc + curr.trn_value, 0)

    const salesOrderId =
      invoiceRefs?.find(({ id }) => id === invoice.id)?.sales_order_id ?? ''

    const documentType =
      invoiceRefs?.find(({ id }) => id === invoice.id)?.document_type ?? ''

    const stockDesc =
      invoice?.products
        ?.map((product) => product.stock_description)
        .join(', ') ?? ''

    return {
      id: invoice.id,
      invoice_bal1: invoice.invoice_bal1,
      currency_value: invoice.currency_value,
      trn_value: invoicePays,
      sales_order_id: salesOrderId,
      document_type: documentType,
      stock_description: stockDesc,
    }
  })

export default CustomerPage
