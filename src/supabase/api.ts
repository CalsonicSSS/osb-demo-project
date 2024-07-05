import { createServerClient } from '@/utils/supabase'
import { cookies } from 'next/headers'

export const getAllCustomers = async () => {
  const cookieStore = cookies()
  const supabaseClient = createServerClient(cookieStore)
  try {
    const { data: customers } = await supabaseClient
      .from('ar_customer')
      .select('*')
    return customers
  } catch (error) {
    return null
  }
}

export const getCustomerById = async (id: string) => {
  const cookieStore = cookies()
  const supabaseClient = createServerClient(cookieStore)
  try {
    const { data: customer } = await supabaseClient
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
      .select('id, invoice_bal1, currency_value, invoice_date')
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
    return { ...invoice, products: products[index] }
  })
}

export async function getAllCustomersWithCustomMetrics() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  try {
    // Fetch basic customer data
    const { data: customers, error: customerError } = await supabase
      .from('ar_customer')
      .select('*')

    if (customerError) throw customerError

    // Initialize arrays to store additional data
    const customerData = customers.map((customer) => ({
      ...customer,
      invoice_count: 0,
      invoice_unpaid: 0,
      sor_qty: 0,
      back_order_qty: 0,
    }))

    for (const customer of customerData) {
      // Fetch invoices for the customer
      const { data: invoices, error: invoiceError } = await supabase
        .from('ar_invoice')
        .select('id, currency_value')
        .eq('customer_id', customer.id)

      if (invoiceError) throw invoiceError

      // Calculate invoice_count (number of invoices with non-null positive currency_value)
      customer.invoice_count = invoices.filter(
        (invoice) =>
          invoice.currency_value !== null && invoice.currency_value > 0,
      ).length

      // Get list of invoice ids
      const invoiceIds = invoices.map((invoice) => invoice.id)

      if (invoiceIds.length > 0) {
        // Fetch SOR details for these invoices
        const { data: sorDetails, error: sorDetailError } = await supabase
          .from('sor_detail_rep')
          .select('id, invoice_id, back_order_qty')
          .in('invoice_id', invoiceIds)

        if (sorDetailError) throw sorDetailError

        // Calculate sor_qty (unique SOR ids)
        const uniqueSorIds = new Set(sorDetails.map((detail) => detail.id))
        customer.sor_qty = uniqueSorIds.size

        // Calculate back_order_qty (sum of back_order_qty)
        customer.back_order_qty = sorDetails.reduce((sum, detail) => {
          return sum + (detail.back_order_qty ?? 0)
        }, 0)

        // Fetch invoice payments for these invoices
        const { data: invoicePayments, error: invoicePaymentError } =
          await supabase
            .from('ar_invoice_pay')
            .select('id, trn_value')
            .in('id', invoiceIds)

        if (invoicePaymentError) throw invoicePaymentError

        // Calculate invoice_unpaid (number of unpaid invoices)
        customer.invoice_unpaid = invoices.reduce((unpaidCount, invoice) => {
          const totalPaid = invoicePayments
            .filter((payment) => payment.id === invoice.id)
            .reduce((sum, payment) => sum + Math.abs(payment.trn_value ?? 0), 0)
          return (
            unpaidCount + ((invoice.currency_value ?? 0) > totalPaid ? 1 : 0)
          )
        }, 0)
      }
    }

    return customerData
  } catch (error) {
    console.error('Error fetching customer data: ', error)
    return null
  }
}
