import GenerateEmailDialog from '@/components/GenerateEmailDialog'
import { getCustomerById } from '@/supabase/api'
import { redirect } from 'next/navigation'

const CustomerPage = async ({ params }: { params: { id: string } }) => {
  const customerData = await getCustomerById(params.id)

  if (!customerData) redirect('/404')

  const { name } = customerData

  return (
    <div>
      <h1 className="pb-5">Hello, {name}!</h1>
      <GenerateEmailDialog companyName={name ?? ''} />
    </div>
  )
}

export default CustomerPage
