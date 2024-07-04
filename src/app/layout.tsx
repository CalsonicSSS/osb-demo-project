import { GeistSans } from 'geist/font/sans'
import ThemeProvider from '@/providers/ThemeProvider'
import NextTopLoader from 'nextjs-toploader'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import Sidebar from '@/components/SideBar/SideBar'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={GeistSans.className}
      style={{ colorScheme: 'dark' }}
    >
      <body className="bg-background text-foreground">
        <NextTopLoader showSpinner={false} height={2} color="#2acf80" />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <div className="flex min-h-screen">
              {/* left side side bar */}
              <Sidebar />
              {/* -------------------------------------------------------------- */}
              {/* right side content (top nav + main) */}
              <div className="w-full ">
                {/* top nav */}
                <div className="mb-5 flex flex-col items-start border-b-2 border-gray-300 pl-10 pt-5">
                  <p className="top-nav-text-color mb-[-2px] border-b-2 border-blue-500 pb-1 font-semibold">
                    All Customers
                  </p>
                </div>

                {/* main table content */}
                <main>
                  {children}
                  <Analytics />
                </main>
              </div>
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
