import CustomersTable from '@/components/CustomersTable'
import { getAllCustomers } from '@/supabase/api'

const CustomersPage = async () => {
  const customers = await getAllCustomers()

  return <CustomersTable customers={customers ?? []} />
}

export default CustomersPage
