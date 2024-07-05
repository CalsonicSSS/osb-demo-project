import { Dispatch, SetStateAction, useState } from 'react'
import Image from 'next/image'
import {
  HomeIcon,
  ChatBubbleIcon,
  ExitIcon,
  ListBulletIcon,
  ArchiveIcon,
  PersonIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons'
import SidebarMenuItem from './SidebarMenuItem'
import { cn } from '@/utils/tailwind'

export default function SidebarMenu({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean
  setIsCollapsed: Dispatch<SetStateAction<boolean>>
}) {
  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  return (
    <div
      className={cn(
        'relative flex h-screen flex-col border-r transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64',
      )}
    >
      <div className="my-5 flex items-center justify-center">
        <Image
          src="/logo.png"
          alt="OS&B Logo"
          width={isCollapsed ? 50 : 100}
          height={isCollapsed ? 50 : 100}
        />
      </div>
      <nav className="flex flex-1 flex-col space-y-4 px-4">
        {SIDEBAR_ITEMS.map(({ icon, href, label }) => (
          <SidebarMenuItem
            key={label}
            icon={icon}
            href={href}
            label={label}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>
      <div className="mb-4 mt-auto px-4">
        <SidebarMenuItem
          icon={<ExitIcon />}
          href="#"
          label="Logout"
          isCollapsed={isCollapsed}
        />
      </div>

      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-1/2 rounded-full border border-gray-300 bg-white p-1 transition-colors duration-200 hover:bg-gray-100"
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </button>
    </div>
  )
}

const SIDEBAR_ITEMS = [
  { icon: <HomeIcon />, href: '#', label: 'Dashboard' },
  { icon: <PersonIcon />, href: '/', label: 'Customers' },
  { icon: <ListBulletIcon />, href: '#', label: 'Orders' },
  { icon: <HomeIcon />, href: '#', label: 'AR Management' },
  { icon: <ArchiveIcon />, href: '#', label: 'Products' },
  { icon: <ChatBubbleIcon />, href: '#', label: 'Inbox' },
]
