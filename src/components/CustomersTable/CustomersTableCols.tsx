'use client'

import { Customer } from '@/typings/customer'
import { ColumnDef } from '@tanstack/react-table'

const CustomersTableCols: ColumnDef<Customer>[] = [
  {
    size: 200,
    accessorKey: 'name',
    header: 'Name',
  },
  {
    size: 200,
    accessorKey: 'contact',
    header: 'Contact',
  },
  {
    size: 200,
    accessorKey: 'credit_check_flag',
    header: 'Credit Check Flag',
  },
  {
    size: 200,
    accessorKey: 'credit_limit',
    header: 'Credit Limit',
  },
  {
    size: 200,
    accessorKey: 'credit_status',
    header: 'Credit Status',
  },
  {
    size: 200,
    accessorKey: 'currency',
    header: 'Currency',
  },
  {
    size: 200,
    accessorKey: 'current_balance',
    header: 'Current Balance',
  },
  {
    size: 200,
    accessorKey: 'customer_on_hold',
    header: 'Customer On Hold',
  },
  {
    size: 200,
    accessorKey: 'customer_type',
    header: 'Customer Type',
  },
  {
    size: 200,
    accessorKey: 'data_last_pay',
    header: 'Data Last Pay',
  },
  {
    size: 200,
    accessorKey: 'date_last_sale',
    header: 'Date Last Sale',
  },
  {
    size: 200,
    accessorKey: 'domain',
    header: 'Domain',
  },
  {
    size: 200,
    accessorKey: 'email',
    header: 'Email',
  },
  {
    size: 200,
    accessorKey: 'fax',
    header: 'Fax',
  },
  {
    size: 200,
    accessorKey: 'highest_balance',
    header: 'Highest Balance',
  },
  {
    size: 200,
    accessorKey: 'id',
    header: 'ID',
  },
  {
    size: 200,
    accessorKey: 'invoice_count',
    header: 'Invoice Count',
  },
  {
    size: 200,
    accessorKey: 'mtr_cr_memo_val',
    header: 'Mtr Cr Memo Val',
  },
  {
    size: 200,
    accessorKey: 'num_outst_ord',
    header: 'Num Outst Ord',
  },
  {
    size: 200,
    accessorKey: 'outst_ord_val',
    header: 'Outst Ord Val',
  },
  {
    size: 200,
    accessorKey: 'phone_ext',
    header: 'Phone Ext',
  },
  {
    size: 200,
    accessorKey: 'phone_no',
    header: 'Phone No',
  },
  {
    size: 200,
    accessorKey: 'po_number_mandatory',
    header: 'PO Number Mandatory',
  },
  {
    size: 200,
    accessorKey: 'salesperson',
    header: 'Salesperson',
  },
]

export default CustomersTableCols
