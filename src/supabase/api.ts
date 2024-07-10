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
      .select('stock_description, price, order_qty, unit_cost')
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

    // Initialize all customer page arrays to store additional data
    const customersWithCustomFields = customers.map((customer) => ({
      ...customer,
      invoice_count: 0,
      invoice_unpaid: 0,
      sor_qty: 0,
      back_order_qty: 0,
    }))

    // customize fields for each customer
    for (const customer of customersWithCustomFields) {
      // Fetch all invoices for the customer from ar_invoice and ar_invoice_reference
      // Fetch all invoices for the customer from ar_invoice
      const { data: invoices, error: invoiceError } = await supabase
        .from('ar_invoice')
        .select('id, currency_value, invoice_bal1')
        .eq('customer_id', customer.id)

      if (invoiceError) throw invoiceError

      // Fetch all invoice references for the customer, excluding 'C' document_type
      const { data: invoiceReferences, error: invoiceRefError } = await supabase
        .from('ar_invoice_reference')
        .select('id, document_type')
        .eq('customer_id', customer.id)
        .neq('document_type', 'C')

      if (invoiceRefError) throw invoiceRefError

      const validInvoices = invoices.filter(
        (invoice) =>
          invoice.currency_value !== null && invoice.currency_value > 0,
      )

      // Combine and deduplicate invoice IDs
      const allInvoiceIds = new Set([
        ...validInvoices.map((inv) => inv.id),
        ...invoiceReferences.map((ref) => ref.id),
      ])

      // Calculate invoice_count
      customer.invoice_count = allInvoiceIds.size

      // Calculate invoice_unpaid (number of unpaid invoices based on invoice_bal1)
      customer.invoice_unpaid = invoices.filter(
        (invoice) => invoice.invoice_bal1 !== null && invoice.invoice_bal1 > 0,
      ).length

      // Fetch SOR details for these invoices
      const { data: sorDetails, error: sorDetailError } = await supabase
        .from('sor_detail_rep')
        .select('id, invoice_id, back_order_qty')
        .in('invoice_id', Array.from(allInvoiceIds))

      if (sorDetailError) throw sorDetailError

      // Calculate sor_qty (unique SOR ids)
      const uniqueSorIds = new Set(sorDetails.map((detail) => detail.id))
      customer.sor_qty = uniqueSorIds.size

      // Calculate back_order_qty (sum of back_order_qty)
      customer.back_order_qty = sorDetails.reduce((sum, detail) => {
        return sum + (detail.back_order_qty ?? 0)
      }, 0)
    }

    return customersWithCustomFields
  } catch (error) {
    console.error('Error fetching customer data: ', error)
    return null
  }
}

// ------------------------------------------------------------------------------------------------------------------------
// corrected calculation on individual customer page

// 1. avg order qty
export async function getCustomerAvgOrderQty(customerId: string) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  try {
    // Fetch invoice IDs from ar_invoice
    const { data: arInvoices, error: arInvoiceError } = await supabase
      .from('ar_invoice')
      .select('id')
      .eq('customer_id', customerId)

    if (arInvoiceError) throw arInvoiceError

    // Fetch invoice IDs from ar_invoice_reference
    const { data: arInvoiceRefs, error: arInvoiceRefError } = await supabase
      .from('ar_invoice_reference')
      .select('id')
      .eq('customer_id', customerId)

    if (arInvoiceRefError) throw arInvoiceRefError

    // Combine and deduplicate invoice IDs
    const allInvoiceIds = new Set([
      ...arInvoices.map((invoice) => invoice.id),
      ...arInvoiceRefs.map((ref) => ref.id),
    ])

    // Fetch order quantities from sor_detail_rep
    const { data: sorDetails, error: sorDetailError } = await supabase
      .from('sor_detail_rep')
      .select('order_qty')
      .in('invoice_id', Array.from(allInvoiceIds))

    if (sorDetailError) throw sorDetailError

    // Calculate average order quantity
    const totalOrderQty = sorDetails.reduce(
      (sum, detail) => sum + (detail.order_qty || 0),
      0,
    )
    const avgOrderQty =
      sorDetails.length > 0 ? totalOrderQty / sorDetails.length : 0

    return Number(avgOrderQty.toFixed(2)) // Round to 2 decimal places
  } catch (error) {
    console.error('Error calculating average order quantity:', error)
    return null
  }
}

// 2. allowable credits for each customer

export async function getCustomerAllowableCredits(customerId: string) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  try {
    const { data: targetCustomer, error: arCustomerError } = await supabase
      .from('ar_customer')
      .select('credit_limit')
      .eq('id', customerId)

    if (arCustomerError) throw arCustomerError

    const customerCreditLimit = targetCustomer[0].credit_limit

    const { data: targetCustomerArinvoice, error: arInvoiceError } =
      await supabase
        .from('ar_invoice')
        .select('invoice_bal1')
        .eq('customer_id', customerId)

    if (arInvoiceError) throw arInvoiceError

    const totalNetInvoiceBalance = targetCustomerArinvoice.reduce(
      (acc, curr) => acc + curr.invoice_bal1,
      0,
    )

    const allowableCredits = customerCreditLimit
      ? customerCreditLimit - totalNetInvoiceBalance
      : 0

    return allowableCredits
  } catch (error) {
    console.error('Error calculating allowable credits quantity:', error)
    return null
  }
}
