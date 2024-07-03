import React, { ReactElement } from 'react'
import Link from 'next/link'
import { SidebarIconButtonProps } from '@/typings/props'

export default function IconButton({
  src,
  alt,
  href,
  label,
}: SidebarIconButtonProps): ReactElement {
  return (
    <Link
      href={href}
      className="borderRounded flex items-center gap-3 rounded-xl px-2 py-3 text-black hover:bg-black hover:text-white"
    >
      <svg className="h-6 w-6 fill-current">
        <use xlinkHref={src} />
      </svg>
      <span className="hidden font-bold md:inline">{label}</span>
    </Link>
  )
}
