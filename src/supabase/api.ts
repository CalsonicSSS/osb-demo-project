import { createServerClient } from '@/utils/supabase'
import { cookies } from 'next/headers'

export const getAllCustomers = async () => {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  try {
    const { data: customers } = await supabase.from('ar_customer').select('*')
    return customers
  } catch (error) {
    return null
  }
}

export const getCustomerById = async (id: string) => {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  try {
    const { data: customer } = await supabase
      .from('ar_customer')
      .select('*')
      .eq('id', id)
      .single()
    return customer
  } catch (error) {
    return null
  }
}

export const getCustomerInvoices = async (id: string) => {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  try {
    const { data: invoices } = await supabase
      .from('ar_invoice')
      .select('id, invoice_bal1, currency_value')
      .eq('customer_id', id)
    return invoices
  } catch (error) {
    return null
  }
}

export const getCustomerInvoicesPay = async (id: string) => {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  try {
    const { data: invoices } = await supabase
      .from('ar_invoice_pay')
      .select('id, trn_value')
      .eq('customer_id', id)
    return invoices
  } catch (error) {
    return null
  }
}

export const getCustomerInvoiceRefs = async (id: string) => {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  try {
    const { data: invoices } = await supabase
      .from('ar_invoice_reference')
      .select('id, sales_order_id, document_type')
      .eq('customer_id', id)
    return invoices
  } catch (error) {
    return null
  }
}

export const getInvoiceProducts = async (id: string) => {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  try {
    const { data: products } = await supabase
      .from('sor_detail_rep')
      .select('stock_description')
      .eq('invoice_id', id)
    return products
  } catch (error) {
    return null
  }
}

export const getCustomerInvoicesWithProducts = async (userId: string) => {
  const invoices = await getCustomerInvoices(userId)
  const invoiceIds = invoices?.map((invoice) => invoice.id) ?? []
  const products = await Promise.all(
    invoiceIds?.map((id) => getInvoiceProducts(id)),
  )
  return invoices?.map((invoice, index) => {
    return {
      ...invoice,
      products: products[index],
    }
  })
}
