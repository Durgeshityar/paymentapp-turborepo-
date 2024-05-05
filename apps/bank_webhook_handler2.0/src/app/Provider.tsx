'use client'
import { RecoilRoot } from 'recoil'

type Props = {
  children: React.ReactNode
}

export const Provider = ({ children }: Props) => {
  return <RecoilRoot>{children}</RecoilRoot>
}
