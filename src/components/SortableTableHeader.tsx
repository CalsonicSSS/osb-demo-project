import { Column } from '@tanstack/react-table'
import { ArrowUpIcon, ArrowDownIcon } from '@radix-ui/react-icons'

type SortedTableHeaderProps<T> = {
  column: Column<T>
  label: string
}

const SortedTableHeader = <T,>({
  column,
  label,
}: SortedTableHeaderProps<T>) => {
  const isAscended = column.getIsSorted() === 'asc'
  //   const isBeingSorted = column.getIsSorted() !== false
  const iconClass = `ml-1 h-4 w-4`

  return (
    <button
      type="button"
      className="flex cursor-pointer items-center"
      onClick={() => column.toggleSorting(isAscended)}
    >
      {label}
      {isAscended ? (
        <ArrowUpIcon className={iconClass} />
      ) : (
        <ArrowDownIcon className={iconClass} />
      )}
    </button>
  )
}

export default SortedTableHeader
