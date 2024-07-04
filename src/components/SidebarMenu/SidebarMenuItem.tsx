'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/utils/tailwind'

type SidebarMenuItemProps = {
  icon: React.ReactNode
  href: string
  label: string
}

export default function SidebarMenuItem({
  icon,
  label,
  href,
}: SidebarMenuItemProps) {
  const activePath = usePathname()
  const isActive = activePath === href

  return (
    <Link
      href={href}
      className={cn(
        'flex w-full items-center justify-start gap-4 rounded-md  p-2 hover:bg-muted/40 ',
        isActive ? 'bg-muted  hover:bg-muted' : '',
      )}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </Link>
  )
}
