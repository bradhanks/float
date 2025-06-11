'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { PopupButton } from 'react-calendly'

type Size = 'sm' | 'md' | 'lg'
type Mode = 'primary' | 'secondary' | 'soft' | 'outline'
type Variant = 'default' | 'rounded' | 'circular' | 'pill'

type ButtonProps = {
  invert?: boolean
  mode?: Mode
  size?: Size
  variant?: Variant
  loading?: boolean
  disabled?: boolean
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
)

export function Button({
  invert = false,
  mode = 'primary',
  size = 'md',
  variant = 'default',
  loading = false,
  disabled = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const baseClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  const commonClasses = {
    base: 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
    rounded: {
      default: 'rounded-md',
      pill: 'rounded-full',
      circular: 'rounded-full aspect-square',
    },
    disabled: 'opacity-50 cursor-not-allowed',
  }

  function getModeClasses(mode: Mode, invert: boolean, dark: boolean) {
    const modeMap = {
      primary: {
        default: clsx(
          'bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-600',
          dark &&
            'dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:text-gray-900',
        ),
        invert: clsx(
          'bg-white text-indigo-600 hover:bg-gray-100',
          dark &&
            'dark:bg-gray-800 dark:text-indigo-400 dark:hover:bg-gray-700',
        ),
      },
      secondary: {
        default: clsx(
          'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 focus:ring-indigo-600',
          dark &&
            'dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700',
        ),
        invert: clsx(
          'bg-gray-900 text-white border border-gray-700 hover:bg-gray-800',
          dark &&
            'dark:bg-white dark:text-gray-900 dark:border-gray-300 dark:hover:bg-gray-100',
        ),
      },
      soft: {
        default: clsx(
          'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 focus:ring-indigo-500',
          dark &&
            'dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-800/40',
        ),
        invert: clsx(
          'bg-white/10 text-white hover:bg-white/20',
          dark &&
            'dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-800/40',
        ),
      },
      outline: {
        default: clsx(
          'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-indigo-600',
          dark &&
            'dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
        ),
        invert: clsx(
          'border border-white/20 text-white hover:bg-white/10',
          dark &&
            'dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
        ),
      },
    }

    return invert ? modeMap[mode].invert : modeMap[mode].default
  }

  const classes = clsx(
    commonClasses.base,
    baseClasses[size],
    commonClasses.rounded[
      variant === 'rounded'
        ? 'default'
        : variant === 'pill'
          ? 'pill'
          : variant === 'circular'
            ? 'circular'
            : 'default'
    ],
    getModeClasses(
      mode,
      invert,
      mounted && window.matchMedia('(prefers-color-scheme: dark)').matches,
    ),
    className,
  )

  const SpinnerIcon = ({ className = 'w-5 h-5' }) => (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )

  if (!mounted) return null
  if ('href' in props && props.href) {
    return (
      <Link className={classes} {...props}>
        {loading ? (
          <span className="flex items-center justify-center">
            <SpinnerIcon className="mr-2 h-4 w-4" />
            {children && <span>{children}</span>}
          </span>
        ) : (
          children
        )}
      </Link>
    )
  }

  return (
    <Button className={classes} disabled={loading || disabled} {...props}>
      {loading ? (
        <span className="flex items-center justify-center">
          <SpinnerIcon className="mr-2 h-4 w-4" />
          {children && <span>{children}</span>}
        </span>
      ) : (
        children
      )}
    </Button>
  )
}

// Calendly Button
export function CalendlyButton({
  invert = false,
  className,
}: {
  invert?: boolean
  className?: string
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <PopupButton
      url="https://calendly.com/float-consulting/meet"
      rootElement={document.body}
      text="Schedule call"
      className={clsx(
        'font-sans text-sm font-semibold',
        invert
          ? 'text-white hover:text-indigo-500'
          : 'text-gray-900 hover:text-indigo-700',
        'dark:text-white',
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
