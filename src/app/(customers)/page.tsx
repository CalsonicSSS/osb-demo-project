import CustomersTable from '@/components/CustomersTable'
import { getAllCustomers } from '@/supabase/api'

const CustomersPage = async () => {
  const customers = await getAllCustomers()

  return (
    <div>
      <div className="my-4 h-96 bg-muted">stuff goes here</div>
      <CustomersTable customers={customers ?? []} />
    </div>
  )
}

export default CustomersPage
