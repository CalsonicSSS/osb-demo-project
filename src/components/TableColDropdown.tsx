'use client'

import { Table } from '@tanstack/react-table'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type TableColDropdownProps<TData> = {
  table: Table<TData>
}

const TableColDropdown = <TData extends object>({
  table,
}: TableColDropdownProps<TData>) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="sm">
        <MixerHorizontalIcon className="mr-2 h-4 w-4" />
        View
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-[150px]">
      <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {table
        .getAllColumns()
        .filter((column) => column.getCanHide())
        .map(({ id, getIsVisible, toggleVisibility }) => (
          <DropdownMenuCheckboxItem
            key={id}
            className="capitalize"
            checked={getIsVisible()}
            onCheckedChange={(value) => toggleVisibility(!!value)}
          >
            {id.replace(/_/g, ' ')}
          </DropdownMenuCheckboxItem>
        ))}
    </DropdownMenuContent>
  </DropdownMenu>
)

export default TableColDropdown
