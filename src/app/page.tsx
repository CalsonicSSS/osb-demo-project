import React from 'react'
import CustomersTable from '@/components/CustomersTable'
import ThemeToggle from '@/components/ThemeToggle'
import { getAllCustomers } from '@/supabase/calls'

export default async function Index() {
  const customers = await getAllCustomers()

  return (
    // home page scaffold layout divided into sidebar and main content
    <div className="flex w-full">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center gap-20">
        {/* <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
          <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm"></div>
        </nav> */}

        <div className="flex max-w-4xl flex-1 flex-col gap-20 px-3">
          <main className="flex flex-1 flex-col gap-6">
            <CustomersTable customers={customers ?? []} />
          </main>
        </div>

        <footer className="w-full justify-center border-t border-t-foreground/10 p-8 text-center text-xs">
          <ThemeToggle />
        </footer>
      </div>
    </div>
  )
}
