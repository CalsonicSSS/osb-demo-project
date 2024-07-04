'use client'

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useState } from 'react'
import TableSearch from '@/components/TableSearch'
import InventoryTableCols from './InventoryTableCols'
import { Button } from '@/components/ui/button'
import { InvoiceTableRow } from '@/typings/invoicing'
import GenerateEmailDialog from '../GenerateEmailDialog'

type InventoryTableProps = {
  invoices: InvoiceTableRow[]
  companyName: string
}

const InventoryTable = ({ invoices, companyName }: InventoryTableProps) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'invoice_bal1', desc: false },
  ])

  const table = useReactTable({
    data: invoices,
    onSortingChange: setSorting,
    getRowId: (row) => row.id,
    onColumnFiltersChange: setColumnFilters,
    columns: InventoryTableCols,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  })

  const hasSelection = Object.keys(rowSelection).length > 0

  return (
    <>
      <div className="mb-4 items-center justify-between bg-background px-4 sm:flex">
        <TableSearch
          columnId="invoice_bal1"
          table={table}
          placeholder="Filter invoices by id..."
          className="sm:max-w-sm"
        />
        <div className="mt-3 flex justify-end gap-2 sm:mt-0 sm:justify-normal">
          {hasSelection && <GenerateEmailDialog companyName={companyName} />}
        </div>
      </div>

      <Table className=" min-w-max">
        <TableHeader>
          {table.getHeaderGroups().map(({ id: headerGroupId, headers }) => (
            <TableRow key={headerGroupId}>
              {headers.map(({ id: headerId, column, getContext }) => (
                <TableHead
                  key={headerId}
                  className="group text-sm"
                  style={{ width: `${column.columnDef.size}px` }}
                >
                  {flexRender(column.columnDef.header, getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table
              .getRowModel()
              .rows.map(({ id: rowId, getIsSelected, getVisibleCells }) => (
                <TableRow
                  key={rowId}
                  data-state={getIsSelected() && 'selected'}
                >
                  {getVisibleCells().map(
                    ({ id: cellId, column, getContext }) => (
                      <TableCell key={cellId}>
                        {flexRender(column.columnDef.cell, getContext())}
                      </TableCell>
                    ),
                  )}
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={InventoryTableCols.length}
                className="h-24 text-center"
              >
                No customers found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 p-4 ">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  )
}

export default InventoryTable
