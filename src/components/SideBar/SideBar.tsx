import React, { ReactElement } from 'react'
import Image from 'next/image'
import IconButton from './IconButton'

export default function Sidebar(): ReactElement {
  return (
    <div className="flex h-screen w-64 flex-col border-r border-gray-300 bg-white p-4 shadow-md">
      <div className="mb-10 flex items-center justify-center">
        <Image
          src="/osb_logo.png"
          alt="OS&B Logo"
          width={100}
          height={100}
          quality={100}
        />
      </div>
      <nav className="flex flex-1 flex-col space-y-4">
        <IconButton
          src="/home.svg#icon"
          alt="Customer"
          href="/"
          label="Customer"
        />
        <IconButton
          src="/orders.svg#icon"
          alt="Orders"
          href="/orders"
          label="Orders"
        />
        <IconButton
          src="/ar_management.svg#icon"
          alt="AR Management"
          href="/ar-management"
          label="AR Management"
        />
        <IconButton
          src="/products.svg#icon"
          alt="Products"
          href="/products"
          label="Products"
        />
        <IconButton
          src="/inbox.svg#icon"
          alt="Inbox"
          href="/inbox"
          label="Inbox"
        />
      </nav>
      <div className="mt-auto">
        <IconButton
          src="/logout.svg#icon"
          alt="Logout"
          href="/logout"
          label="Logout"
        />
      </div>
    </div>
  )
}
