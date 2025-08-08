'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { PopupButton } from 'react-calendly'

type BaseButtonProps = {
  mode?: 'primary' | 'secondary' | 'soft' | 'rounded' | 'circular'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  invert?: boolean
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
}

type ButtonProps = BaseButtonProps &
  (
    | React.ComponentPropsWithoutRef<typeof Link>
    | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
  )

export function Button({
  mode = 'primary',
  size = 'md',
  invert = false,
  leadingIcon,
  trailingIcon,
  className,
  children,
  ...props
}: ButtonProps) {
  // Base classes
  const baseClasses = clsx(
    'inline-flex items-center justify-center font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-200',
    {
      'rounded-sm': mode !== 'rounded' && mode !== 'circular',
      'rounded-full': mode === 'rounded' || mode === 'circular',
    },
  )

  // Size classes
  const sizeClasses = {
    xs: clsx({
      'text-xs px-2 py-1': mode !== 'circular',
      'p-1': mode === 'circular',
    }),
    sm: clsx({
      'text-sm px-2 py-1': mode !== 'circular',
      'p-1.5': mode === 'circular',
    }),
    md: clsx({
      'text-sm px-2.5 py-1.5': mode !== 'circular' && mode !== 'rounded',
      'text-sm px-3 py-1.5': mode === 'rounded',
      'p-2': mode === 'circular',
    }),
    lg: clsx({
      'text-sm px-3 py-2': mode !== 'circular' && mode !== 'rounded',
      'text-sm px-3.5 py-2': mode === 'rounded',
      'p-2.5': mode === 'circular',
    }),
    xl: clsx({
      'text-sm px-3.5 py-2.5': mode !== 'circular' && mode !== 'rounded',
      'text-sm px-4 py-2.5': mode === 'rounded',
      'p-3': mode === 'circular',
    }),
  }[size]

  const colorClasses = clsx({
    // Primary - Indigo
    'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500':
      mode === 'primary' && !invert,
    'bg-white text-indigo-600 hover:bg-indigo-50 focus-visible:outline-white dark:bg-gray-900 dark:text-indigo-400 dark:hover:bg-gray-800 dark:focus-visible:outline-gray-900':
      mode === 'primary' && invert,

    // Secondary
    'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:ring-0 dark:hover:bg-white/20':
      mode === 'secondary' && !invert,
    'bg-gray-900 text-white ring-1 ring-inset ring-gray-700 hover:bg-gray-800 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700':
      mode === 'secondary' && invert,

    // Soft
    'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-500/20 dark:text-indigo-200 dark:hover:bg-indigo-500/30':
      mode === 'soft' && !invert,
    'bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/30 dark:bg-indigo-50 dark:text-indigo-600 dark:hover:bg-indigo-100':
      mode === 'soft' && invert,

    // Rounded - Blue
    'bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600 dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus-visible:outline-blue-500':
      mode === 'rounded' && !invert,
    'bg-white text-blue-600 hover:bg-blue-50 focus-visible:outline-white dark:bg-gray-900 dark:text-blue-400 dark:hover:bg-gray-800 dark:focus-visible:outline-gray-900':
      mode === 'rounded' && invert,

    // Circular - Emerald/Green
    'bg-emerald-600 text-white hover:bg-emerald-500 focus-visible:outline-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:focus-visible:outline-emerald-500':
      mode === 'circular' && !invert,
    'bg-white text-emerald-600 hover:bg-emerald-50 focus-visible:outline-white dark:bg-gray-900 dark:text-emerald-400 dark:hover:bg-gray-800 dark:focus-visible:outline-gray-900':
      mode === 'circular' && invert,
  })

  // Gap between icon and text
  const gapClass = clsx({
    'gap-x-1': size === 'xs',
    'gap-x-1.5': size === 'sm' || size === 'md',
    'gap-x-2': size === 'lg' || size === 'xl',
  })

  const allClasses = clsx(baseClasses, sizeClasses, colorClasses, className)

  // For circular buttons, only show icon
  if (mode === 'circular') {
    return (
      <button
        className={allClasses}
        {...(props as React.ComponentPropsWithoutRef<'button'>)}
      >
        <span className="flex items-center justify-center">
          {leadingIcon || trailingIcon || children}
        </span>
      </button>
    )
  }

  const inner = (
    <span className={clsx('inline-flex items-center', gapClass)}>
      {leadingIcon}
      {children}
      {trailingIcon}
    </span>
  )

  if (typeof props.href === 'undefined') {
    return (
      <button className={allClasses} {...props}>
        {inner}
      </button>
    )
  }

  return (
    <Link className={allClasses} {...props}>
      {inner}
    </Link>
  )
}

// Updated CalendlyButton to use the new system
interface CalendlyButtonProps extends BaseButtonProps {
  className?: string
}

export function CalendlyButton({
  mode = 'primary',
  size = 'md',
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
        Button({ mode, size, invert, className } as any),
        'font-sans', // Additional specific styles
      )}
      pageSettings={{
        backgroundColor: 'ffffff',
        primaryColor: '00a2ff',
        textColor: '4d5055',
      }}
    />
  )
}

// Updated PostHogButton to use the new system
export function PostHogButton({
  mode = 'primary',
  size = 'md',
  invert = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <Button
      mode={mode}
      size={size}
      invert={invert}
      className={clsx(
        'top-px rounded-[6px] border-[1.5px]',
        'group disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  )
}
