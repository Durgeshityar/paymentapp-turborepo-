'use client'

import { usePathname, useRouter } from 'next/navigation'

import React from 'react'

interface Props {
  href: string
  title: string
  icon: React.ReactNode
}

export const SideBarItem = ({ href, title, icon }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const selected = pathname === href // boolean
  return (
    <div
      className={`flex  ${selected ? 'text-[#6a51a6]' : 'text-slate-500'} cursor-pointer p-2 pl-8 `}
      onClick={() => router.push(href)}
    >
      <div className=" flex gap-2">
        <div> {icon}</div>
        <div> {title} </div>
      </div>
    </div>
  )
}
