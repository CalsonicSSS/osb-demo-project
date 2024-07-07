'use client'

import { CustomerWithCustomMetrics } from '@/typings/customer'
import { formatCurrency } from '@/utils/format'
import { ColumnDef } from '@tanstack/react-table'
import SortedTableHeader from '@/components/SortableTableHeader'

const CustomersTableCols: ColumnDef<CustomerWithCustomMetrics>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortedTableHeader column={column} label="Name" />,
    size: 200,
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <SortedTableHeader column={column} label="Customer ID" />
    ),
    size: 200,
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue('id')}</div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 200,
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue('email')}</div>
    ),
  },
  {
    accessorKey: 'date_last_sale',
    header: ({ column }) => (
      <SortedTableHeader column={column} label="Last Sale Date" />
    ),
    size: 200,
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue('date_last_sale')}</div>
    ),
  },
  {
    accessorKey: 'credit_limit',
    header: ({ column }) => (
      <SortedTableHeader column={column} label="Credit Limit" />
    ),
    size: 200,
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        {formatCurrency(row.getValue('credit_limit'))}
      </div>
    ),
  },
  {
    accessorKey: 'current_balance',
    header: ({ column }) => (
      <SortedTableHeader column={column} label="Balance" />
    ),
    size: 200,
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        {formatCurrency(row.getValue('current_balance'))}
      </div>
    ),
  },
  {
    accessorKey: 'salesperson',
    header: 'AM ID',
    size: 200,
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue('salesperson')}</div>
    ),
  },
  {
    accessorKey: 'invoice_count',
    header: ({ column }) => (
      <SortedTableHeader column={column} label="Invoices" />
    ),
    size: 200,
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue('invoice_count')}</div>
    ),
  },
  {
    accessorKey: 'invoice_unpaid',
    header: ({ column }) => (
      <SortedTableHeader column={column} label="Invoices Unpaid" />
    ),
    size: 200,
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue('invoice_unpaid')}</div>
    ),
  },
  {
    accessorKey: 'sor_qty',
    header: ({ column }) => (
      <SortedTableHeader column={column} label="Sor Qty" />
    ),
    size: 200,
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue('sor_qty')}</div>
    ),
  },
  {
    accessorKey: 'back_order_qty',
    header: ({ column }) => (
      <SortedTableHeader column={column} label="Back Order Qty" />
    ),
    size: 200,
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue('back_order_qty')}</div>
    ),
  },
]

export default CustomersTableCols
