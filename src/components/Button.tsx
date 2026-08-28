import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  children: ReactNode
}

export function Button({ variant = 'secondary', children, ...props }: ButtonProps) {
  return (
    <button className={`button button--${variant}`} {...props}>
      {children}
    </button>
  )
}
