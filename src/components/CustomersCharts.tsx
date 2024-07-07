'use client'

import { Customer } from '@/typings/customer'
import { formatCurrency } from '@/utils/format'
import { ProgressBar, SparkAreaChart } from '@tremor/react'

type CustomersChartsProps = {
  totalCustomers: number
  totalInvoices: number
  totalInvoicesUnpaid: number
}

const CustomersCharts = ({
  totalCustomers,
  totalInvoices,
  totalInvoicesUnpaid,
}: CustomersChartsProps) => {
  return (
    <>
      <div className="mb-4 flex gap-4">
        <div className="w-full rounded-md border p-8">
          <div className="flex items-center justify-between">
            <h1 className="mb-1 text-xl font-semibold">Total Customers</h1>
            <p className="text-tremor-default font-medium text-emerald-700 ">
              +18%
            </p>
          </div>

          <h1 className="mb-4 text-2xl font-semibold">{totalCustomers}</h1>
          <SparkAreaChart
            data={MOCK_ORDERS_DATA}
            categories={['Performance']}
            index={'month'}
            colors={['green']}
            className="w-full"
          />
        </div>

        <div className="w-full rounded-md border p-8">
          <div className="flex items-center justify-between">
            <h1 className="mb-1 text-xl font-semibold">Total Invoices</h1>
            <p className="text-tremor-default font-medium text-emerald-700 ">
              +12%
            </p>
          </div>

          <h1 className="mb-4 text-2xl font-semibold">{totalInvoices}</h1>
          <SparkAreaChart
            data={MOCK_UNIT_PRICE_DATA}
            categories={['Performance']}
            index={'month'}
            colors={['green']}
            className="w-full"
          />
        </div>

        <div className="w-full rounded-md border p-8">
          <div className="flex items-center justify-between">
            <h1 className="mb-1 text-xl font-semibold">
              Total Invoices Unpaid
            </h1>
            <p className="text-tremor-default font-medium text-red-700 ">-3%</p>
          </div>

          <h1 className="mb-4 text-2xl font-semibold">{totalInvoicesUnpaid}</h1>
          <SparkAreaChart
            data={MOCK_PAST_DUE_DATA}
            categories={['Performance']}
            index={'month'}
            colors={['red']}
            className="w-full"
          />
        </div>
      </div>
    </>
  )
}

const MOCK_ORDERS_DATA = [
  { month: 'Jan 21', Performance: 1000 },
  { month: 'Feb 21', Performance: 3000 },
  { month: 'Mar 21', Performance: 6000 },
  { month: 'Apr 21', Performance: 2780 },
  { month: 'May 21', Performance: 4890 },
  { month: 'Jun 21', Performance: 2390 },
  { month: 'Jul 21', Performance: 5090 },
]

const MOCK_PAST_DUE_DATA = [
  { month: 'Jan 21', Performance: 4000 },
  { month: 'Feb 21', Performance: 3000 },
  { month: 'Mar 21', Performance: 600 },
  { month: 'Apr 21', Performance: 2780 },
  { month: 'May 21', Performance: 4890 },
  { month: 'Jun 21', Performance: 5390 },
  { month: 'Jul 21', Performance: 100 },
]

const MOCK_UNIT_PRICE_DATA = [
  { month: 'Jan 21', Performance: 400 },
  { month: 'Feb 21', Performance: 1200 },
  { month: 'Mar 21', Performance: 600 },
  { month: 'Apr 21', Performance: 280 },
  { month: 'May 21', Performance: 490 },
  { month: 'Jun 21', Performance: 590 },
  { month: 'Jul 21', Performance: 1000 },
]

const MOCK_INVOICE_DATA = [
  { month: 'Jan 21', Performance: 4100 },
  { month: 'Feb 21', Performance: 1200 },
  { month: 'Mar 21', Performance: 6000 },
  { month: 'Apr 21', Performance: 280 },
  { month: 'May 21', Performance: 400 },
  { month: 'Jun 21', Performance: 5090 },
  { month: 'Jul 21', Performance: 10000 },
]

const MOCK_DUE_DATA = [
  { month: 'Jan 21', Performance: 4100 },
  { month: 'Feb 21', Performance: 120 },
  { month: 'Mar 21', Performance: 60400 },
  { month: 'Apr 21', Performance: 2800 },
  { month: 'May 21', Performance: 44000 },
  { month: 'Jun 21', Performance: 5900 },
  { month: 'Jul 21', Performance: 1000 },
]

const MOCK_MARGIN_DATA = [
  { month: 'Jan 21', Performance: 4100 },
  { month: 'Feb 21', Performance: 120 },
  { month: 'Mar 21', Performance: 60400 },
  { month: 'Apr 21', Performance: 2800 },
  { month: 'May 21', Performance: 44000 },
  { month: 'Jun 21', Performance: 5900 },
  { month: 'Jul 21', Performance: 100000 },
]

export default CustomersCharts
