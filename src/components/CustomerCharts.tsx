'use client'

import { Customer } from '@/typings/customer'
import { formatCurrency } from '@/utils/format'
import { ProgressBar, SparkAreaChart } from '@tremor/react'

type CustomerChartsProps = {
  customer: Customer
  salesOrders: number
  totalAmountDue: number
  invoiceOutstanding: number
}

const CustomerCharts = ({
  customer,
  salesOrders,
  totalAmountDue,
  invoiceOutstanding,
}: CustomerChartsProps) => {
  const credit = customer?.credit_limit ?? 0
  const currentBalance = customer?.current_balance ?? 0

  const percentage = (currentBalance / credit) * 100

  const formattedPercentage = parseFloat(percentage.toFixed(2))

  return (
    <div className="mb-4 flex gap-4">
      <div className="w-full rounded-md border p-8">
        <h1 className="mb-1 text-xl font-semibold">Allowable credit</h1>
        <h2 className="mb-4 text-2xl font-semibold">
          {formatCurrency(currentBalance)}
        </h2>
        <p className="mt-6 flex items-center justify-between">
          <span>{formatCurrency(currentBalance)}</span>
          <span>{formatCurrency(credit)}</span>
        </p>
        <ProgressBar value={formattedPercentage} color="blue" className="mt-" />
      </div>

      <div className="w-full rounded-md border p-8">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 text-xl font-semibold">Sales Orders</h1>
          <p className="text-tremor-default font-medium text-emerald-700 ">
            +10%
          </p>
        </div>

        <h1 className="mb-4 text-2xl font-semibold">{salesOrders}</h1>
        <SparkAreaChart
          data={MOCK_ORDERS_DATA}
          categories={['Performance']}
          index={'month'}
          colors={['blue']}
          className="w-full"
        />
      </div>

      <div className="w-full rounded-md border p-8">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 text-xl font-semibold">Amount Due</h1>
          <p className="text-tremor-default font-medium text-red-700">-10%</p>
        </div>

        <h1 className="mb-4 text-2xl font-semibold">
          {formatCurrency(totalAmountDue)}
        </h1>
        <SparkAreaChart
          data={MOCK_PAST_DUE_DATA}
          categories={['Performance']}
          index={'month'}
          colors={['blue']}
          className="w-full"
        />
      </div>

      <div className="w-full rounded-md border p-8">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 text-xl font-semibold">Invoice Outstanding</h1>
          <p className="text-tremor-default font-medium text-red-700">-10%</p>
        </div>

        <h1 className="mb-4 text-2xl font-semibold">
          {formatCurrency(invoiceOutstanding)}
        </h1>
        <SparkAreaChart
          data={MOCK_PAST_DUE_DATA}
          categories={['Performance']}
          index={'month'}
          colors={['blue']}
          className="w-full"
        />
      </div>
    </div>
  )
}

const MOCK_ORDERS_DATA = [
  { month: 'Jan 21', Performance: 1000 },
  { month: 'Feb 21', Performance: 3000 },
  { month: 'Mar 21', Performance: 6000 },
  { month: 'Apr 21', Performance: 2780 },
  { month: 'May 21', Performance: 4890 },
  { month: 'Jun 21', Performance: 2390 },
  { month: 'Jul 21', Performance: 6490 },
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

export default CustomerCharts
