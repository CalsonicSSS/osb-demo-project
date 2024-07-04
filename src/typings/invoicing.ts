import { Database } from './supabase'

export type Invoice = Database['public']['Tables']['ar_invoice']['Row']
export type InvoicePay = Database['public']['Tables']['ar_invoice_pay']['Row']
export type InvoiceRef =
  Database['public']['Tables']['ar_invoice_reference']['Row']
