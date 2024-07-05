'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useLocalStorageState from '@/hooks/useLocalStorageState'
import { Tab } from '@/typings/tabs'
import Link from 'next/link'
import { Cross1Icon } from '@radix-ui/react-icons'
import { usePathname, useRouter } from 'next/navigation'
import SidebarMenu from '@/components/SidebarMenu'
import { useState } from 'react'
import { cn } from '@/utils/tailwind'

const CustomersLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const { push } = useRouter()

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const [tabs, setTabs] = useLocalStorageState<Tab[]>('tabs')

  const removeTab = (tab: string) =>
    setTabs((prevTabs) => prevTabs?.filter((t) => t.key !== tab))

  const isRouteCurrentTab = (route: string) => pathname === route

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <div className="flex h-full flex-1 sm:h-full">
        <SidebarMenu
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
        <main
          className={cn(
            'flex h-full flex-col overflow-hidden transition-all duration-300 ',
            isSidebarCollapsed ? 'w-[calc(100%-4rem)]' : 'w-[calc(100%-16rem)]',
          )}
        >
          <nav className="flex w-full justify-center border-b border-b-foreground/10">
            <Tabs
              defaultValue="All Customers"
              className="w-full"
              value={
                tabs?.find(({ route }) => isRouteCurrentTab(route))?.key ??
                'All Customers'
              }
            >
              <TabsList>
                <TabsTrigger
                  value="All Customers"
                  className="flex justify-between gap-2"
                >
                  <Link href="/">All Customers</Link>
                </TabsTrigger>

                {tabs?.map(({ key, route }) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="flex justify-between gap-2"
                  >
                    <Link href={route}>{key}</Link>
                    <Cross1Icon
                      onClick={() => {
                        removeTab(key)
                        if (isRouteCurrentTab(route)) {
                          push('/')
                        }
                      }}
                    />
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </nav>
          <div className={cn('flex-1 overflow-y-auto overflow-x-hidden p-6')}>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default CustomersLayout
