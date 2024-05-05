'use client'
import { RecoilRoot } from 'recoil'
import { SessionProvider } from 'next-auth/react'

type Props = {
  children: React.ReactNode
}

export const Provider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </SessionProvider>
  )
}
