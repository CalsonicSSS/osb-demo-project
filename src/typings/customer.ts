import { InvoiceProduct } from './invoicing'
import { Database } from './supabase'

export type Customer = Database['public']['Tables']['ar_customer']['Row']

export type CustomerWithCustomMetrics = Customer & {
  invoice_count: number | null
  invoice_unpaid: number | null
  sor_qty: number | null
  back_order_qty: InvoiceProduct['back_order_qty']
}
