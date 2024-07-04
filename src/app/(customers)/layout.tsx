'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useLocalStorageState from '@/hooks/useLocalStorageState'
import { Tab } from '@/typings/tabs'
import Link from 'next/link'
import { Cross1Icon } from '@radix-ui/react-icons'
import { usePathname, useRouter } from 'next/navigation'

const CustomersLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const { push } = useRouter()

  const [tabs, setTabs] = useLocalStorageState<Tab[]>('tabs')

  const removeTab = (tab: string) =>
    setTabs((prevTabs) => prevTabs?.filter((t) => t.key !== tab))

  const isRouteCurrentTab = (route: string) => pathname === route

  return (
    <div className="flex w-full flex-1 flex-col items-center">
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

      <div className="max-w-4xl">{children}</div>
    </div>
  )
}

export default CustomersLayout
