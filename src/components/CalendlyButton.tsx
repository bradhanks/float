'use client'

import { useEffect, useState } from 'react'
import { PopupButton } from 'react-calendly'
import clsx from 'clsx'

interface CalendlyButtonProps {
  invert?: boolean
  className?: string
}

export default function CalendlyButton({
  invert = false,
  className,
}: CalendlyButtonProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <PopupButton
      url="https://calendly.com/float-consulting/meet"
      rootElement={document.querySelector('header') || document.body}
      text="Schedule call"
      className={clsx(
        'bg-inherit font-sans text-sm font-semibold text-neutral-900 hover:text-emerald-700 active:text-emerald-500',
        'dark:bg-inherit dark:text-white',
        invert && 'text-white hover:text-emerald-500 active:text-emerald-400',
        className,
      )}
      pageSettings={{
        backgroundColor: 'ffffff',
        primaryColor: '00a2ff',
        textColor: '4d5055',
      }}
    />
  )
}
