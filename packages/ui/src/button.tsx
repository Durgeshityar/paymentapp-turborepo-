'use client'

import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick: () => void
  className: string
}

export const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button className={className} onClick={onClick} type="button">
      {children}
    </button>
  )
}
