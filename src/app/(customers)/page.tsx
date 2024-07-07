import CustomersCharts from '@/components/CustomersCharts'
import CustomersTable from '@/components/CustomersTable'
import { getAllCustomersWithCustomMetrics } from '@/supabase/api'

const CustomersPage = async () => {
  const customers = await getAllCustomersWithCustomMetrics()

  const totalCustomers = customers?.length ?? 0

  const totalInvoices =
    customers?.reduce((acc, customer) => acc + customer.invoice_count, 0) ?? 0

  const totalInvoicesUnpaid =
    customers?.reduce((acc, customer) => acc + customer.invoice_unpaid, 0) ?? 0

  return (
    <div className="flex h-full flex-col p-6">
      <CustomersCharts
        totalCustomers={totalCustomers}
        totalInvoices={totalInvoices}
        totalInvoicesUnpaid={totalInvoicesUnpaid}
      />

      <div className="flex-1 overflow-hidden rounded-sm border">
        <CustomersTable customers={customers ?? []} />C
      </div>
    </div>
  )
}

export default CustomersPage
