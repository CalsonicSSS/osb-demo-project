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
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import TableSearch from '@/components/TableSearch'
import TableColDropdown from '@/components/TableColDropdown'
import { Customer } from '@/typings/customer'
import CustomersTableCols from './CustomersTableCols'
import useLocalStorageState from '@/hooks/useLocalStorageState'
import { Tab } from '@/typings/tabs'
import { Button } from '@/components/ui/button'

type CustomersTableProps = {
  customers: Customer[]
}

const CustomersTable = ({ customers }: CustomersTableProps) => {
  const { push } = useRouter()

  const [tabs, setTabs] = useLocalStorageState<Tab[]>('tabs', {
    defaultValue: [],
  })

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
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  })

  return (
    <>
      <div className="items-center justify-between bg-background px-4 sm:flex">
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
              .rows.map(
                ({ id: rowId, getIsSelected, getVisibleCells, original }) => (
                  <TableRow
                    key={rowId}
                    data-state={getIsSelected() && 'selected'}
                    onClick={() => {
                      const tabExists = tabs?.find(
                        ({ key }) => key === original.name,
                      )

                      if (!tabExists) {
                        setTabs((prevTabs) => {
                          if (prevTabs?.find(({ key }) => key === rowId)) {
                            return prevTabs
                          }

                          return [
                            ...(prevTabs ?? []),
                            { key: original?.name ?? '', route: `/${rowId}` },
                          ]
                        })
                      }

                      push(`/${rowId}`)
                    }}
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
                ),
              )
          ) : (
            <TableRow>
              <TableCell
                colSpan={CustomersTableCols.length}
                className="h-24 text-center"
              >
                No invoices found
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

export default CustomersTable
