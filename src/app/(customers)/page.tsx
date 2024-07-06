import CustomersTable from '@/components/CustomersTable'
import { getAllCustomersWithCustomMetrics } from '@/supabase/api'

const CustomersPage = async () => {
  const customers = await getAllCustomersWithCustomMetrics()

  return (
    <div className="flex h-full flex-col p-6">
      <div className="mb-5 flex h-1/3 min-h-[350px]">
        <div className="mr-2 flex-1 rounded-sm bg-gray-100 p-4">
          Analytics Placeholder 1
        </div>
        <div className="ml-2 flex-1 rounded-sm bg-gray-100 p-4">
          Analytics Placeholder 2
        </div>
      </div>

      <div className="flex-1 overflow-hidden rounded-sm border">
        <CustomersTable customers={customers ?? []} />
      </div>
    </div>
  )
}

export default CustomersPage
