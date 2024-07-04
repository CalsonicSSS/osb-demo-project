import Link from 'next/link'
import { cn } from '@/utils/tailwind'

type SidebarMenuItemProps = {
  icon: React.ReactNode
  href: string
  label: string
}

const SidebarMenuItem = ({ icon, label, href }: SidebarMenuItemProps) => (
  <Link
    href={href}
    className={cn(
      'flex w-full items-center justify-start gap-4 rounded-md  p-2 hover:bg-muted/40 ',
      label === 'Customers' ? 'bg-muted  hover:bg-muted' : '',
    )}
  >
    {icon}
    <span className="hidden md:inline">{label}</span>
  </Link>
)

export default SidebarMenuItem
