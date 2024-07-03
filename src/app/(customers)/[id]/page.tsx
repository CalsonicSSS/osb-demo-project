import { getCustomerById } from '@/supabase/api'
import { redirect } from 'next/navigation'

const CustomerPage = async ({ params }: { params: { id: string } }) => {
  const customerData = await getCustomerById(params.id)

  if (!customerData) redirect('/404')

  const { name } = customerData

  return (
    <div>
      <h1>Hello, {name}!</h1>
    </div>
  )
}

export default CustomerPage
