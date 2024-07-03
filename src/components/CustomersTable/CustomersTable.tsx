'use client'

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
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
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import TableSearch from '@/components/TableSearch'
import TableColDropdown from '@/components/TableColDropdown'
import { Customer } from '@/typings/customer'
import CustomersTableCols from './CustomersTableCols'

type CustomersTableProps = {
  customers: Customer[]
}

const CustomersTable = ({ customers }: CustomersTableProps) => {
  const { push } = useRouter()

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'name', desc: false },
  ])

  const table = useReactTable({
    data: customers,
    onSortingChange: setSorting,
    getRowId: (row) => row.id,
    onColumnFiltersChange: setColumnFilters,
    columns: CustomersTableCols,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  })

  return (
    <>
      <div className="items-center justify-between bg-background sm:flex">
        <TableSearch
          columnId="name"
          table={table}
          placeholder="Filter customers by name..."
          className="sm:max-w-sm"
        />
        <div className="mt-3 flex justify-end gap-2 sm:mt-0 sm:justify-normal">
          <TableColDropdown table={table} />
        </div>
      </div>

      <Table className="w-full min-w-max">
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
                  onClick={() => push(`/${rowId}`)}
                >
                  {getVisibleCells().map(
                    ({ id: cellId, column, getContext }) => (
                      <TableCell
                        key={cellId}
                        style={{
                          width: `${column.columnDef.size}px`,
                          maxWidth: `${column.columnDef.maxSize}px`,
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
                colSpan={CustomersTableCols.length}
                className="h-24 text-center"
              >
                No customers found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}

export default CustomersTable
