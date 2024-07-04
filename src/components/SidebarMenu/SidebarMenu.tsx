import Image from 'next/image'
import {
  HomeIcon,
  ChatBubbleIcon,
  ExitIcon,
  ListBulletIcon,
  ArchiveIcon,
  PersonIcon,
} from '@radix-ui/react-icons'
import SidebarMenuItem from './SidebarMenuItem'

export default function SidebarMenu() {
  return (
    <div className="bg-mutedp-4 flex h-screen w-64 flex-col border-r">
      <div className="my-5 flex items-center justify-center">
        <Image
          src="/logo.png"
          alt="OS&B Logo"
          width={100}
          height={100}
          quality={100}
        />
      </div>
      <nav className="flex flex-1 flex-col space-y-2 px-4">
        {SIDEBAR_ITEMS.map(({ icon, href, label }) => (
          <SidebarMenuItem key={label} icon={icon} href={href} label={label} />
        ))}
      </nav>
      <div className="mb-4 mt-auto px-4">
        <SidebarMenuItem icon={<ExitIcon />} href="#" label="Logout" />
      </div>
    </div>
  )
}

const SIDEBAR_ITEMS = [
  {
    icon: <HomeIcon className="h-4 w-4 stroke-2" />,
    href: '#',
    label: 'Dashboard',
  },
  {
    icon: <PersonIcon />,
    href: '/',
    label: 'Customers',
  },
  {
    icon: <ListBulletIcon />,
    href: '#',
    label: 'Orders',
  },
  {
    icon: <HomeIcon />,
    href: '#',
    label: 'AR Management',
  },
  {
    icon: <ArchiveIcon />,
    href: '#',
    label: 'Products',
  },
  {
    icon: <ChatBubbleIcon />,
    href: '#',
    label: 'Inbox',
  },
]
