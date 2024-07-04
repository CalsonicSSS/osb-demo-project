import { Database } from './supabase'

export type Invoice = Database['public']['Tables']['ar_invoice']['Row']
export type InvoicePay = Database['public']['Tables']['ar_invoice_pay']['Row']
export type InvoiceRef =
  Database['public']['Tables']['ar_invoice_reference']['Row']
export type InvoiceProduct =
  Database['public']['Tables']['sor_detail_rep']['Row']

export type InvoiceTableRow = {
  id: Invoice['id']
  invoice_bal1: Invoice['invoice_bal1']
  currency_value: Invoice['currency_value']
  trn_value: InvoicePay['trn_value']
  sales_order_id: InvoiceRef['sales_order_id']
  document_type: InvoiceRef['document_type']
  stock_description: InvoiceProduct['stock_description']
}
