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
