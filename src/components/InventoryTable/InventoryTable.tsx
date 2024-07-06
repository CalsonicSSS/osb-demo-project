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
import { useEffect, useRef, useState } from 'react'
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

  const selectedInvoices = Object.keys(rowSelection)
    .map((id) => invoices.find((invoice) => invoice.id === id))
    .filter((invoice): invoice is InvoiceTableRow => invoice !== undefined)

  return (
    <>
      <div className="mb-4 items-center justify-between bg-background pr-4 sm:flex">
        <TableSearch
          columnId="invoice_bal1"
          table={table}
          placeholder="Filter invoices by id..."
          className="sm:max-w-sm"
        />
        <div className="mt-3 flex justify-end gap-2 sm:mt-0 sm:justify-normal">
          {selectedInvoices.length > 0 && (
            <GenerateEmailDialog
              selectedInvoices={selectedInvoices}
              companyName={companyName}
            />
          )}
        </div>
      </div>

      <div className="flex-grow overflow-hidden">
        <div className="h-full overflow-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400">
          <Table className="w-full">
            <TableHeader className="sticky top-0 z-10 bg-white">
              {table.getHeaderGroups().map(({ id: headerGroupId, headers }) => (
                <TableRow key={headerGroupId}>
                  {headers.map(({ id: headerId, column, getContext }) => (
                    <TableHead
                      key={headerId}
                      className="whitespace-nowrap font-bold"
                      style={{
                        width: `${column.getSize()}px`,
                        minWidth: `${column.columnDef.minSize ?? 0}px`,
                      }}
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
                          <TableCell
                            key={cellId}
                            style={{
                              width: `${column.getSize()}px`,
                              maxWidth: `${
                                column.columnDef.maxSize ?? 'auto'
                              }px`,
                            }}
                          >
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
                    No invoices found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex-end flex justify-end space-x-2 border-t bg-white pt-2">
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
