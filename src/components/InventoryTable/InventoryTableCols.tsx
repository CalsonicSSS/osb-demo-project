'use client'

import { InvoiceTableRow } from '@/typings/invoicing'
import { ColumnDef } from '@tanstack/react-table'

const CustomersTableCols: ColumnDef<InvoiceTableRow>[] = [
  { header: 'Invoice No.', accessorKey: 'id' },
  { header: 'Current Balance', accessorKey: 'invoice_bal1' },
  { header: 'Invoice Amount', accessorKey: 'currency_value' },
  { header: 'Amount Paid', accessorKey: 'trn_value' },
  { header: 'Sales Order No.', accessorKey: 'sales_order_id' },
  { header: 'Document Type', accessorKey: 'document_type' },
]

export default CustomersTableCols
