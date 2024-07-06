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
import { useEffect, useRef, useState } from 'react'
import TableSearch from '@/components/TableSearch'
import TableColDropdown from '@/components/TableColDropdown'
import { CustomerWithCustomMetrics } from '@/typings/customer'
import CustomersTableCols from './CustomersTableCols'
import useLocalStorageState from '@/hooks/useLocalStorageState'
import { Tab } from '@/typings/tabs'
import { Button } from '@/components/ui/button'

const CustomersTable = ({
  customers,
}: {
  customers: CustomerWithCustomMetrics[]
}) => {
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
    initialState: { pagination: { pageSize: 50 } },
  })

  const tableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tableElement = tableRef.current
    if (tableElement) {
      const headerElement = tableElement.querySelector('thead')
      if (headerElement) {
        headerElement.style.transform = `translateY(${tableElement.scrollTop}px)`

        const handleScroll = () => {
          headerElement.style.transform = `translateY(${tableElement.scrollTop}px)`
        }

        tableElement.addEventListener('scroll', handleScroll)
        return () => tableElement.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <div className="flex h-full flex-col pb-2 pl-5 pr-5 pt-5">
      <div className="mb-4 flex-shrink-0 items-center justify-between bg-background sm:flex">
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

      <div className="flex flex-grow flex-col overflow-hidden">
        <div
          className="flex-grow overflow-x-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400"
          ref={tableRef}
        >
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <Table>
                <TableHeader className="sticky top-0 z-10 bg-white">
                  {table
                    .getHeaderGroups()
                    .map(({ id: headerGroupId, headers }) => (
                      <TableRow key={headerGroupId}>
                        {headers.map(({ id: headerId, column, getContext }) => (
                          <TableHead
                            key={headerId}
                            className="whitespace-nowrap font-bold"
                            style={{
                              width: `${column.getSize()}px`,
                              minWidth: `${column.columnDef.minSize}px`,
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
                      .rows.map(
                        ({
                          id: rowId,
                          getIsSelected,
                          getVisibleCells,
                          original,
                        }) => (
                          <TableRow
                            className="cursor-pointer"
                            key={rowId}
                            data-state={getIsSelected() && 'selected'}
                            onClick={() => {
                              const tabExists = tabs?.find(
                                ({ key }) => key === original.name,
                              )

                              if (!tabExists) {
                                setTabs((prevTabs) => {
                                  if (
                                    prevTabs?.find(({ key }) => key === rowId)
                                  ) {
                                    return prevTabs
                                  }

                                  return [
                                    ...(prevTabs ?? []),
                                    {
                                      key: original?.name ?? '',
                                      route: `/${rowId}`,
                                    },
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
                                  {flexRender(
                                    column.columnDef.cell,
                                    getContext(),
                                  )}
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
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2 p-4">
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
    </div>
  )
}

export default CustomersTable
