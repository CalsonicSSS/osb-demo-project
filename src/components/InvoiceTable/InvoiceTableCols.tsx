'use client'

import { InvoiceTableRow } from '@/typings/invoicing'
import { ColumnDef } from '@tanstack/react-table'
import { formatCurrency } from '@/utils/format'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import SortedTableHeader from '@/components/SortableTableHeader'

const CustomersTableCols: ColumnDef<InvoiceTableRow>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    size: 10,
  },
  { header: 'Invoice No.', accessorKey: 'id' },
  {
    header: ({ column }) => (
      <SortedTableHeader column={column} label="Current Balance" />
    ),
    accessorKey: 'invoice_bal1',
    cell: ({ row }) => (
      <>{formatCurrency(parseFloat(row.getValue('invoice_bal1')))}</>
    ),
  },
  {
    header: ({ column }) => (
      <SortedTableHeader column={column} label="Invoice Amount" />
    ),
    accessorKey: 'currency_value',
    cell: ({ row }) => (
      <>{formatCurrency(parseFloat(row.getValue('currency_value')))}</>
    ),
  },
  {
    header: ({ column }) => (
      <SortedTableHeader column={column} label="Amount Paid" />
    ),
    accessorKey: 'trn_value',
    cell: ({ row }) => (
      <>{formatCurrency(parseFloat(row.getValue('trn_value')))}</>
    ),
  },
  { header: 'Sales Order No.', accessorKey: 'sales_order_id' },
  { header: 'Document Type', accessorKey: 'document_type', size: 10 },
  {
    header: 'Stock Description',
    accessorKey: 'stock_description',
    cell: ({ row }) => (
      <ScrollArea className="h-11">
        {row.getValue('stock_description')}
      </ScrollArea>
    ),
  },
]

export default CustomersTableCols
