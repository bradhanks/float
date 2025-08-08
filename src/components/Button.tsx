'use client'

import { useEffect, useState, ComponentType, SVGAttributes } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { PopupButton } from 'react-calendly'
import DynamicIcon, { type ButtonIconProps } from '@/components/Icon'

type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonMode = 'primary' | 'secondary' | 'soft' | 'outline'
type ButtonVariant = 'default' | 'rounded' | 'circular' | 'pill'

type ButtonProps = {
  invert?: boolean
  mode?: ButtonMode
  size?: ButtonSize
  variant?: ButtonVariant
  loading?: boolean
  icon?: ComponentType<SVGAttributes<SVGElement>>
  iconPosition?: 'left' | 'right'
} & (
    | React.ComponentPropsWithoutRef<typeof Link>
    | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
  )

export function Button({
  invert = false,
  mode = 'primary',
  size = 'md',
  loading = false,
  variant = 'default',
  icon,
  iconPosition = 'left',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseClasses = clsx(
    'inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 ease-in-out',
    {
      'h-8': size === 'sm',
      'h-10': size === 'md',
      'h-12': size === 'lg',
    },
    {
      'rounded-md': variant === 'default',
      'rounded-lg': variant === 'rounded',
      'rounded-full': variant === 'pill' || variant === 'circular',
    },
  )

  const primaryClasses = clsx(
    'border bg-neutral-900 text-white hover:bg-white hover:text-neutral-900 border-neutral-900',
    'active:bg-emerald-500 active:border-emerald-500 active:text-white',
    'dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-900 dark:hover:text-white dark:border-white',
    'dark:active:bg-emerald-600 dark:active:border-emerald-600',
  )

  const primaryInvertClasses = clsx(
    'bg-white text-neutral-900 border-neutral-900 hover:bg-neutral-900 hover:text-white',
    'active:bg-emerald-500 active:border-emerald-500 active:text-white',
    'dark:bg-neutral-900 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-neutral-900',
    'dark:active:bg-emerald-600 dark:active:border-emerald-600',
  )

  const secondaryClasses = clsx(
    'bg-inherit text-neutral-900 hover:text-emerald-700',
    'active:text-emerald-700',
    'dark:bg-inherit dark:text-white',
  )

  const secondaryInvertClasses = clsx(
    'bg-inherit text-neutral-900 hover:text-emerald-700',
    'active:text-emerald-700',
    'dark:bg-inherit dark:text-white',
  )

  className = clsx(
    className,
    baseClasses,
    invert
      ? mode === 'primary'
        ? primaryInvertClasses
        : primaryClasses
      : mode === 'secondary'
        ? secondaryInvertClasses
        : secondaryClasses,
    loading && 'opacity-70 cursor-not-allowed',
  )

  const iconSize = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }[size]

  const renderIcon = () => {
    if (loading) {
      return <Spinner className={clsx(iconSize, 'animate-spin')} />
    }

    if (!icon) return null

    if (typeof icon === 'string') {
      return <DynamicIcon name={icon} className={iconSize} />
    }

    return icon
  }

  const content = (
    <>
      {iconPosition === 'left' && renderIcon()}
      {children && <span className={clsx(icon && 'mx-1')}>{children}</span>}
      {iconPosition === 'right' && renderIcon()}
    </>
  )

  if (typeof props.href === 'undefined') {
    return (
      <button className={className} disabled={loading} {...props}>
        {content}
      </button>
    )
  }

  return (
    <Link className={className} {...props}>
      {content}
    </Link>
  )
}

interface CalendlyButtonProps {
  invert?: boolean
  className?: string
}

export const CalendlyButtonPlaceholder = () => (
  <div className="h-[72px] w-full"> {/* Adjust height to match your TopBar's height */}
    {/* Optional: Add a subtle loading indicator */}
    <div className="animate-pulse h-full w-full bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
  </div>
)
export function CalendlyButton({
  invert = false,
  size = 'sm',
  className,
}: {
  invert?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {



  const baseClasses = clsx(
    'relative inline-block text-center group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200',
    'border-[1.5px] rounded-[6px] top-px',
    {
      'text-[13px]': size === 'sm',
      'text-sm': size === 'md',
      'text-base': size === 'lg',
    },
  )

  // Outer container classes
  const outerClasses = clsx(
    className,
    baseClasses,
    invert
      ? 'bg-emerald-800 border-white dark:bg-emerald-900/20 dark:border-transparent'
      : 'bg-emerald-100 border-gray-300 dark:bg-gray-800 dark:border-gray-600'
  )

  // Inner span classes (the actual button appearance)
  const innerClasses = clsx(
    'relative block w-auto text-center font-bold border-[1.5px] rounded-[6px] mx-[-1.5px]',
    'translate-y-[-2px] hover:translate-y-[-3px] active:-translate-y-px',
    'group-disabled:hover:translate-y-[-2px]! active:transition-all active:duration-100',
    'select-none transition-all duration-200',
    {
      'px-3 py-1': size === 'sm',
      'px-3.5 py-1.5': size === 'md',
      'px-4 py-2': size === 'lg',
    },
    invert
      ? 'bg-emerald-800 border-white border-emerald-400 bg-emerald-400 text-white bg-emerald-50 active:border-emerald-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 dark:hover:text-emerald-400 dark:hover:border-emerald-400 dark:active:text-emerald-300 dark:active:border-emerald-500'
      : 'border-emerald-500 bg-white text-gray-900 hover:border-emerald-600 dark:bg-gray-900 dark:text-gray-100 dark:border-emerald-400 dark:hover:text-emerald-300 dark:hover:border-emerald-300 dark:active:text-emerald-200'
  )

  return (
    <div className={outerClasses}>

      <PopupButton
        url="https://calendly.com/series-lab/meet"
        rootElement={document.querySelector('header') || document.body}
        text="Schedule call"
        className={innerClasses}
        pageSettings={{
          backgroundColor: 'ffffff',
          primaryColor: '00a2ff',
          textColor: '4d5055',
        }}
      />

    </div>
  )
}

type PostHogButtonProps = {
  invert?: boolean
  mode?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
} & (
    | React.ComponentPropsWithoutRef<typeof Link>
    | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
  )

export function PostHogButton({
  invert = false,
  mode = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: PostHogButtonProps) {
  const baseClasses = clsx(
    'relative inline-block  text-center group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200',
    'border-[1.5px] rounded-[6px] top-[1px]',
    {
      'text-[13px]': size === 'sm',
      'text-sm': size === 'md',
      'text-base': size === 'lg',
    },
  )

  // Outer container classes
  const primaryOuterClasses = clsx(
    'bg-emerald-100 border-gray-300',
    'dark:bg-gray-800 dark:border-gray-600',
  )

  const secondaryOuterClasses = clsx(
    'bg-emerald-800 border-white',
    'dark:bg-emerald-900/20 dark:border-transparent',
  )

  // Inner span classes (the actual button appearance)
  const innerBaseClasses = clsx(
    'relative block w-auto text-center font-bold border-[1.5px] rounded-[6px] mx-[-1.5px]',
    'translate-y-[-2px] hover:translate-y-[-3px] active:translate-y-[-1px]',
    'group-disabled:hover:!translate-y-[-2px] active:transition-all active:duration-100',
    'select-none transition-all duration-200',
    {
      'px-3 py-1': size === 'sm',
      'px-3.5 py-1.5': size === 'md',
      'px-4 py-2': size === 'lg',
    },
  )

  const primaryInnerClasses = clsx(
    'border-emerald-500 bg-white text-gray-900',
    'hover:border-emerald-600',
    'dark:bg-gray-900 dark:text-gray-100 dark:border-emerald-400',
    'dark:hover:text-emerald-300 dark:hover:border-emerald-300',
    ' dark:active:text-emerald-200',
  )

  const secondaryInnerClasses = clsx(
    'bg-emerald-800 border-white border-emerald-400 bg-emerald-400 text-white bg-emerald-50',
    ' active:border-emerald-600',
    'dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600',
    'dark:hover:text-emerald-400 dark:hover:border-emerald-400',
    ' dark:active:text-emerald-300 dark:active:border-emerald-500',
  )

  const outerClassName = clsx(
    className,
    baseClasses,
    invert
      ? mode === 'primary'
        ? secondaryOuterClasses
        : primaryOuterClasses
      : mode === 'primary'
        ? primaryOuterClasses
        : secondaryOuterClasses,
  )

  const innerClassName = clsx(
    innerBaseClasses,
    invert
      ? mode === 'primary'
        ? secondaryInnerClasses
        : primaryInnerClasses
      : mode === 'primary'
        ? primaryInnerClasses
        : secondaryInnerClasses,
  )

  const inner = <span className={innerClassName}>{children}</span>

  if (typeof props.href === 'undefined') {
    return (
      <button className={outerClassName} {...props}>
        {inner}
      </button>
    )
  }

  return (
    <Link className={outerClassName} {...props}>
      {inner}
    </Link>
  )
}
export function Spinner({ className }: { className?: string }) {
  return (
    <svg className={clsx('animate-spin', className)} viewBox="0 0 24 24">
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
}
