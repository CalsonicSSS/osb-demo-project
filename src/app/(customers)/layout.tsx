'use client'

import ThemeToggle from '@/components/ThemeToggle'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
        <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm"></div>
      </nav>

      <div className="flex max-w-4xl flex-1 flex-col gap-20 px-3">
        <main className="flex flex-1 flex-col gap-6">
          <Tabs
            defaultValue="All Customers"
            className="w-full"
            value={
              tabs?.find(({ route }) => isRouteCurrentTab(route))?.key ??
              'All Customers'
            }
          >
            <TabsList>
              {tabs?.map(({ key, route }) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="flex justify-between gap-2"
                >
                  <Link href={route}>{key}</Link>

                  {key !== 'All Customers' && (
                    <Cross1Icon
                      onClick={() => {
                        removeTab(key)
                        if (isRouteCurrentTab(route)) {
                          push('/')
                        }
                      }}
                    />
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          {children}
        </main>
      </div>

      <footer className="w-full justify-center border-t border-t-foreground/10 p-8 text-center text-xs">
        <ThemeToggle />
      </footer>
    </div>
  )
}

export default CustomersLayout
