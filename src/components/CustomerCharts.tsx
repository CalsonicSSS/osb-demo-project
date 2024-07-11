'use client'

import { Customer } from '@/typings/customer'
import { formatCurrency } from '@/utils/format'
import { ProgressBar, SparkAreaChart } from '@tremor/react'

type CustomerChartsProps = {
  customer: Customer
  salesOrders: number
  totalAmountDue: number
  invoiceOutstanding: number
  avgInvoiceValue: number
  avgUnitPrice: number
  avgOrderQty: string | number
  avgProfitMargin: number
  allowableCredits: number
}

const CustomerCharts = ({
  customer,
  salesOrders,
  totalAmountDue,
  invoiceOutstanding,
  avgInvoiceValue,
  avgUnitPrice,
  avgOrderQty,
  avgProfitMargin,
  allowableCredits,
}: CustomerChartsProps) => {
  const credit = customer?.credit_limit ?? 0
  const currentBalance = customer?.current_balance ?? 0
  const percentage = (currentBalance / credit) * 100
  const formattedPercentage = parseFloat(percentage.toFixed(2))

  return (
    <>
      <div className="mb-4 flex gap-4">
        <div className="w-full rounded-md border p-8">
          <h1 className="mb-1 text-xl font-semibold">Allowable credit</h1>
          <h2 className="mb-4 text-2xl font-semibold">
            {formatCurrency(allowableCredits)}
          </h2>
          <p className="mt-6 flex items-center justify-between">
            <span>{formatCurrency(allowableCredits)}</span>
            <span>{formatCurrency(credit)}</span>
          </p>
          <ProgressBar
            value={formattedPercentage}
            color="green"
            className="mt-"
          />
        </div>

        <div className="w-full rounded-md border p-8">
          <div className="flex items-center justify-between">
            <h1 className="mb-1 text-xl font-semibold">Sales Orders</h1>
            <p className="text-tremor-default font-medium text-emerald-700 ">
              +18%
            </p>
          </div>

          <h1 className="mb-4 text-2xl font-semibold">{salesOrders}</h1>
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
            <h1 className="mb-1 text-xl font-semibold">Amount Due</h1>
            <p className="text-tremor-default font-medium text-red-700">-10%</p>
          </div>

          <h1 className="mb-4 text-2xl font-semibold">
            {formatCurrency(totalAmountDue)}
          </h1>
          <SparkAreaChart
            data={MOCK_DUE_DATA}
            categories={['Performance']}
            index={'month'}
            colors={['red']}
            className="w-full"
          />
        </div>

        <div className="w-full rounded-md border p-8">
          <div className="flex items-center justify-between">
            <h1 className="mb-1 text-xl font-semibold">Invoices Outstanding</h1>
            <p className="text-tremor-default font-medium text-red-700">-22%</p>
          </div>

          <h1 className="mb-4 text-2xl font-semibold">{invoiceOutstanding}</h1>
          <SparkAreaChart
            data={MOCK_PAST_DUE_DATA}
            categories={['Performance']}
            index={'month'}
            colors={['red']}
            className="w-full"
          />
        </div>
      </div>

      <div className="mb-4 flex gap-4">
        <div className="w-full rounded-md border p-8">
          <div className="flex items-center justify-between">
            <h1 className="mb-1 text-xl font-semibold">Avg. Invoice Value</h1>
            <p className="text-tremor-default font-medium text-emerald-700 ">
              +30%
            </p>
          </div>

          <h1 className="mb-4 text-2xl font-semibold">
            {formatCurrency(avgInvoiceValue)}
          </h1>
          <SparkAreaChart
            data={MOCK_INVOICE_DATA}
            categories={['Performance']}
            index={'month'}
            colors={['green']}
            className="w-full"
          />
        </div>

        <div className="w-full rounded-md border p-8">
          <div className="flex items-center justify-between">
            <h1 className="mb-1 text-xl font-semibold">Avg. Order Qty</h1>
            <p className="text-tremor-default font-medium text-red-700">-43%</p>
          </div>

          <h1 className="mb-4 text-2xl font-semibold">{avgOrderQty}</h1>
          <SparkAreaChart
            data={MOCK_PAST_DUE_DATA}
            categories={['Performance']}
            index={'month'}
            colors={['red']}
            className="w-full"
          />
        </div>

        <div className="w-full rounded-md border p-8">
          <div className="flex items-center justify-between">
            <h1 className="mb-1 text-xl font-semibold">Avg. Unit Price</h1>
            <p className="text-tremor-default font-medium text-emerald-700 ">
              +23%
            </p>
          </div>

          <h1 className="mb-4 text-2xl font-semibold">
            {formatCurrency(avgUnitPrice)}
          </h1>
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
            <h1 className="mb-1 text-xl font-semibold">Avg. Profit Margin</h1>
          </div>

          <h1 className="mb-4 text-2xl font-semibold text-emerald-700">
            {parseFloat(avgProfitMargin.toFixed(2))}%
          </h1>
          <SparkAreaChart
            data={MOCK_MARGIN_DATA}
            categories={['Performance']}
            index={'month'}
            colors={['green']}
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

export default CustomerCharts
