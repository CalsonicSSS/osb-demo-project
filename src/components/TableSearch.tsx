import { Table } from '@tanstack/react-table'
import { Input } from '@/components/ui/input'

type TableSearchProps<TData> = {
  table: Table<TData>
  placeholder: string
  className?: string
  columnId: string
}

const TableSearch = <TData extends object>({
  table,
  placeholder,
  className,
  columnId,
}: TableSearchProps<TData>) => (
  <Input
    placeholder={placeholder}
    value={(table.getColumn(columnId)?.getFilterValue() as string) ?? ''}
    onChange={(event) =>
      table.getColumn('name')?.setFilterValue(event.target.value)
    }
    className={className}
  />
)
export default TableSearch
