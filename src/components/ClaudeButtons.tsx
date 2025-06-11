'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { PopupButton } from 'react-calendly'

// Your existing Button component (unchanged)
type ButtonProps = {
  invert?: boolean
  mode?: 'primary' | 'secondary'
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
)

export function Button({
  invert = false,
  mode = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 ease-in-out'

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
    'bg-inherit text-neutral-900 hover:text-emerald-500',
    'active:text-emerald-700',
    'dark:bg-inherit dark:text-white',
  )

  const secondaryInvertClasses = clsx(
    'bg-inherit text-neutral-900 hover:text-emerald-500',
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
  )

  const inner = <span className="relative top-px">{children}</span>

  if (typeof props.href === 'undefined') {
    return (
      <button className={className} {...props}>
        {inner}
      </button>
    )
  }

  return (
    <Link className={className} {...props}>
      {inner}
    </Link>
  )
}

// Gradient Button - Modern gradient effect
type GradientButtonProps = {
  invert?: boolean
  mode?: 'primary' | 'secondary'
  variant?: 'emerald' | 'blue' | 'purple'
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
)

export function GradientButton({
  invert = false,
  mode = 'primary',
  variant = 'emerald',
  className,
  children,
  ...props
}: GradientButtonProps) {
  const baseClasses =
    'inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-300 ease-in-out relative overflow-hidden'

  const gradientVariants = {
    emerald: 'from-emerald-500 to-emerald-600',
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
  }

  const primaryClasses = clsx(
    'bg-gradient-to-r text-white border border-transparent',
    'hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
    'dark:shadow-lg dark:shadow-emerald-500/20',
    gradientVariants[variant],
  )

  const primaryInvertClasses = clsx(
    'bg-white text-neutral-900 border border-neutral-200',
    'hover:bg-gradient-to-r hover:text-white hover:border-transparent hover:shadow-lg hover:-translate-y-0.5',
    'active:translate-y-0',
    'dark:bg-neutral-900 dark:text-white dark:border-neutral-700',
    'dark:hover:bg-gradient-to-r dark:hover:text-white dark:hover:border-transparent',
    `dark:hover:${gradientVariants[variant]}`,
    `hover:${gradientVariants[variant]}`,
  )

  const secondaryClasses = clsx(
    'bg-transparent text-neutral-900 border-2 border-emerald-500',
    'hover:bg-emerald-500 hover:text-white hover:shadow-md',
    'active:bg-emerald-600',
    'dark:text-white dark:border-emerald-400',
    'dark:hover:bg-emerald-500 dark:hover:border-emerald-500',
  )

  const secondaryInvertClasses = clsx(
    'bg-transparent text-white border-2 border-white',
    'hover:bg-white hover:text-neutral-900 hover:shadow-md',
    'active:bg-neutral-100',
    'dark:text-neutral-900 dark:border-neutral-900',
    'dark:hover:bg-neutral-900 dark:hover:text-white',
  )

  className = clsx(
    className,
    baseClasses,
    invert
      ? mode === 'primary'
        ? primaryInvertClasses
        : secondaryInvertClasses
      : mode === 'primary'
        ? primaryClasses
        : secondaryClasses,
  )

  const inner = <span className="relative z-10">{children}</span>

  if (typeof props.href === 'undefined') {
    return (
      <button className={className} {...props}>
        {inner}
      </button>
    )
  }

  return (
    <Link className={className} {...props}>
      {inner}
    </Link>
  )
}

// Glassmorphism Button - Modern glass effect
type GlassButtonProps = {
  invert?: boolean
  mode?: 'primary' | 'secondary'
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
)

export function GlassButton({
  invert = false,
  mode = 'primary',
  className,
  children,
  ...props
}: GlassButtonProps) {
  const baseClasses =
    'inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-300 ease-in-out backdrop-blur-sm'

  const primaryClasses = clsx(
    'bg-white/20 border border-white/30 text-neutral-900',
    'hover:bg-white/30 hover:border-white/40 hover:shadow-lg',
    'active:bg-white/40',
    'dark:bg-white/10 dark:border-white/20 dark:text-white',
    'dark:hover:bg-white/20 dark:hover:border-white/30',
  )

  const primaryInvertClasses = clsx(
    'bg-neutral-900/20 border border-neutral-900/30 text-white',
    'hover:bg-neutral-900/30 hover:border-neutral-900/40 hover:shadow-lg',
    'active:bg-neutral-900/40',
    'dark:bg-neutral-900/30 dark:border-neutral-700/50 dark:text-neutral-100',
    'dark:hover:bg-neutral-900/40',
  )

  const secondaryClasses = clsx(
    'bg-emerald-500/20 border border-emerald-500/30 text-emerald-700',
    'hover:bg-emerald-500/30 hover:text-emerald-800 hover:shadow-md',
    'active:bg-emerald-500/40',
    'dark:bg-emerald-400/20 dark:border-emerald-400/30 dark:text-emerald-300',
    'dark:hover:bg-emerald-400/30 dark:hover:text-emerald-200',
  )

  const secondaryInvertClasses = clsx(
    'bg-white/10 border border-white/20 text-white',
    'hover:bg-white/20 hover:border-white/30 hover:shadow-md',
    'active:bg-white/30',
    'dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-300',
    'dark:hover:bg-emerald-500/20',
  )

  className = clsx(
    className,
    baseClasses,
    invert
      ? mode === 'primary'
        ? primaryInvertClasses
        : secondaryInvertClasses
      : mode === 'primary'
        ? primaryClasses
        : secondaryClasses,
  )

  const inner = <span className="relative">{children}</span>

  if (typeof props.href === 'undefined') {
    return (
      <button className={className} {...props}>
        {inner}
      </button>
    )
  }

  return (
    <Link className={className} {...props}>
      {inner}
    </Link>
  )
}

// Neon Button - Glowing neon effect
type NeonButtonProps = {
  invert?: boolean
  mode?: 'primary' | 'secondary'
  color?: 'emerald' | 'blue' | 'purple' | 'pink'
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
)

export function NeonButton({
  invert = false,
  mode = 'primary',
  color = 'emerald',
  className,
  children,
  ...props
}: NeonButtonProps) {
  const baseClasses =
    'inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-300 ease-in-out'

  const neonColors = {
    emerald: {
      primary: 'border-emerald-400 text-emerald-400 shadow-emerald-400/50',
      hover: 'hover:shadow-emerald-400/70 hover:bg-emerald-400/10',
      active: 'active:shadow-emerald-400/80 active:bg-emerald-400/20',
    },
    blue: {
      primary: 'border-blue-400 text-blue-400 shadow-blue-400/50',
      hover: 'hover:shadow-blue-400/70 hover:bg-blue-400/10',
      active: 'active:shadow-blue-400/80 active:bg-blue-400/20',
    },
    purple: {
      primary: 'border-purple-400 text-purple-400 shadow-purple-400/50',
      hover: 'hover:shadow-purple-400/70 hover:bg-purple-400/10',
      active: 'active:shadow-purple-400/80 active:bg-purple-400/20',
    },
    pink: {
      primary: 'border-pink-400 text-pink-400 shadow-pink-400/50',
      hover: 'hover:shadow-pink-400/70 hover:bg-pink-400/10',
      active: 'active:shadow-pink-400/80 active:bg-pink-400/20',
    },
  }

  const primaryClasses = clsx(
    'bg-transparent border-2',
    'hover:shadow-lg hover:-translate-y-0.5',
    'active:translate-y-0',
    neonColors[color].primary,
    neonColors[color].hover,
    neonColors[color].active,
    'dark:shadow-lg',
  )

  const primaryInvertClasses = clsx(
    'bg-neutral-900 border-2 text-white',
    'hover:shadow-lg hover:-translate-y-0.5',
    'active:translate-y-0',
    'dark:bg-white dark:text-neutral-900',
    neonColors[color].primary
      .replace('text-', 'hover:text-')
      .replace('border-', 'hover:border-'),
    neonColors[color].hover,
    neonColors[color].active,
  )

  const secondaryClasses = clsx(
    'bg-transparent border text-neutral-500',
    'hover:text-neutral-700 hover:border-neutral-400',
    'active:text-neutral-800',
    'dark:text-neutral-400 dark:border-neutral-600',
    'dark:hover:text-neutral-200 dark:hover:border-neutral-500',
  )

  const secondaryInvertClasses = clsx(
    'bg-transparent border text-white/70',
    'hover:text-white hover:border-white/50',
    'active:text-white',
    'dark:text-neutral-500 dark:border-neutral-700',
    'dark:hover:text-neutral-300',
  )

  className = clsx(
    className,
    baseClasses,
    invert
      ? mode === 'primary'
        ? primaryInvertClasses
        : secondaryInvertClasses
      : mode === 'primary'
        ? primaryClasses
        : secondaryClasses,
  )

  const inner = <span className="relative">{children}</span>

  if (typeof props.href === 'undefined') {
    return (
      <button className={className} {...props}>
        {inner}
      </button>
    )
  }

  return (
    <Link className={className} {...props}>
      {inner}
    </Link>
  )
}

// Outlined Button - Clean outlined style
type OutlineButtonProps = {
  invert?: boolean
  mode?: 'primary' | 'secondary'
  thickness?: 'thin' | 'medium' | 'thick'
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
)

export function OutlineButton({
  invert = false,
  mode = 'primary',
  thickness = 'medium',
  className,
  children,
  ...props
}: OutlineButtonProps) {
  const baseClasses =
    'inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 ease-in-out bg-transparent'

  const borderThickness = {
    thin: 'border',
    medium: 'border-2',
    thick: 'border-4',
  }

  const primaryClasses = clsx(
    borderThickness[thickness],
    'border-neutral-900 text-neutral-900',
    'hover:bg-neutral-900 hover:text-white',
    'active:bg-neutral-800',
    'dark:border-white dark:text-white',
    'dark:hover:bg-white dark:hover:text-neutral-900',
    'dark:active:bg-neutral-100',
  )

  const primaryInvertClasses = clsx(
    borderThickness[thickness],
    'border-white text-white',
    'hover:bg-white hover:text-neutral-900',
    'active:bg-neutral-100',
    'dark:border-neutral-900 dark:text-neutral-900',
    'dark:hover:bg-neutral-900 dark:hover:text-white',
  )

  const secondaryClasses = clsx(
    borderThickness[thickness],
    'border-emerald-500 text-emerald-600',
    'hover:bg-emerald-500 hover:text-white',
    'active:bg-emerald-600',
    'dark:border-emerald-400 dark:text-emerald-400',
    'dark:hover:bg-emerald-400 dark:hover:text-neutral-900',
  )

  const secondaryInvertClasses = clsx(
    borderThickness[thickness],
    'border-emerald-400 text-emerald-400',
    'hover:bg-emerald-400 hover:text-neutral-900',
    'active:bg-emerald-500',
    'dark:border-emerald-500 dark:text-emerald-500',
    'dark:hover:bg-emerald-500 dark:hover:text-white',
  )

  className = clsx(
    className,
    baseClasses,
    invert
      ? mode === 'primary'
        ? primaryInvertClasses
        : secondaryInvertClasses
      : mode === 'primary'
        ? primaryClasses
        : secondaryClasses,
  )

  const inner = <span className="relative">{children}</span>

  if (typeof props.href === 'undefined') {
    return (
      <button className={className} {...props}>
        {inner}
      </button>
    )
  }

  return (
    <Link className={className} {...props}>
      {inner}
    </Link>
  )
}

// Soft Button - Subtle colored background
type SoftButtonProps = {
  invert?: boolean
  mode?: 'primary' | 'secondary'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
)

export function SoftButton({
  invert = false,
  mode = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: SoftButtonProps) {
  const sizeClasses = {
    xs: 'rounded-sm px-2 py-1 text-xs',
    sm: 'rounded-sm px-2 py-1 text-sm',
    md: 'rounded-md px-2.5 py-1.5 text-sm',
    lg: 'rounded-md px-3 py-2 text-sm',
    xl: 'rounded-md px-3.5 py-2.5 text-sm',
  }

  const baseClasses = clsx(
    'font-semibold shadow-xs transition-all duration-200 ease-in-out',
    sizeClasses[size],
  )

  const primaryClasses = clsx(
    'bg-emerald-50 text-emerald-600 hover:bg-emerald-100',
    'active:bg-emerald-200',
    'dark:bg-emerald-900/20 dark:text-emerald-400 dark:hover:bg-emerald-900/30',
    'dark:active:bg-emerald-900/40',
  )

  const primaryInvertClasses = clsx(
    'bg-white/10 text-white hover:bg-white/20',
    'active:bg-white/30',
    'dark:bg-emerald-50 dark:text-emerald-600 dark:hover:bg-emerald-100',
  )

  const secondaryClasses = clsx(
    'bg-neutral-50 text-neutral-600 hover:bg-neutral-100',
    'active:bg-neutral-200',
    'dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700',
    'dark:active:bg-neutral-600',
  )

  const secondaryInvertClasses = clsx(
    'bg-white/5 text-white/70 hover:bg-white/10',
    'active:bg-white/20',
    'dark:bg-neutral-50 dark:text-neutral-600 dark:hover:bg-neutral-100',
  )

  className = clsx(
    className,
    baseClasses,
    invert
      ? mode === 'primary'
        ? primaryInvertClasses
        : secondaryInvertClasses
      : mode === 'primary'
        ? primaryClasses
        : secondaryClasses,
  )

  if (typeof props.href === 'undefined') {
    return (
      <button className={className} {...props}>
        {children}
      </button>
    )
  }

  return (
    <Link className={className} {...props}>
      {children}
    </Link>
  )
}

// Icon Button - For buttons with leading/trailing icons
type IconButtonProps = {
  invert?: boolean
  mode?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  iconPosition?: 'leading' | 'trailing'
  icon?: React.ReactNode
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
)

export function IconButton({
  invert = false,
  mode = 'primary',
  size = 'md',
  iconPosition = 'leading',
  icon,
  className,
  children,
  ...props
}: IconButtonProps) {
  const sizeClasses = {
    sm: 'rounded-md px-2.5 py-1.5 text-sm gap-x-1.5',
    md: 'rounded-md px-3 py-2 text-sm gap-x-1.5',
    lg: 'rounded-md px-3.5 py-2.5 text-sm gap-x-2',
  }

  const baseClasses = clsx(
    'inline-flex items-center font-semibold shadow-xs transition-all duration-200 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2',
    sizeClasses[size],
  )

  const primaryClasses = clsx(
    'bg-emerald-600 text-white hover:bg-emerald-500',
    'active:bg-emerald-700 focus-visible:outline-emerald-600',
    'dark:bg-emerald-500 dark:hover:bg-emerald-400',
    'dark:active:bg-emerald-600 dark:focus-visible:outline-emerald-500',
  )

  const primaryInvertClasses = clsx(
    'bg-white text-neutral-900 hover:bg-neutral-50',
    'active:bg-neutral-100 focus-visible:outline-neutral-600',
    'dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800',
    'dark:active:bg-neutral-700 dark:focus-visible:outline-neutral-400',
  )

  const secondaryClasses = clsx(
    'bg-white text-neutral-900 shadow-xs ring-1 ring-neutral-300 ring-inset hover:bg-neutral-50',
    'active:bg-neutral-100',
    'dark:bg-neutral-800 dark:text-neutral-200 dark:ring-neutral-600 dark:hover:bg-neutral-700',
    'dark:active:bg-neutral-600',
  )

  const secondaryInvertClasses = clsx(
    'bg-white/10 text-white hover:bg-white/20',
    'active:bg-white/30',
    'dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-50',
  )

  className = clsx(
    className,
    baseClasses,
    invert
      ? mode === 'primary'
        ? primaryInvertClasses
        : secondaryInvertClasses
      : mode === 'primary'
        ? primaryClasses
        : secondaryClasses,
  )

  const iconClasses =
    iconPosition === 'leading' ? '-ml-0.5 size-5' : '-mr-0.5 size-5'

  const content =
    iconPosition === 'leading' ? (
      <>
        {icon && <span className={iconClasses}>{icon}</span>}
        {children}
      </>
    ) : (
      <>
        {children}
        {icon && <span className={iconClasses}>{icon}</span>}
      </>
    )

  if (typeof props.href === 'undefined') {
    return (
      <button className={className} {...props}>
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

// Circular Button - For icon-only circular buttons
type CircularButtonProps = {
  invert?: boolean
  mode?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
)

export function CircularButton({
  invert = false,
  mode = 'primary',
  size = 'md',
  icon,
  className,
  children,
  ...props
}: CircularButtonProps) {
  const sizeClasses = {
    sm: 'rounded-full p-1',
    md: 'rounded-full p-1.5',
    lg: 'rounded-full p-2',
  }

  const baseClasses = clsx(
    'shadow-xs transition-all duration-200 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2',
    sizeClasses[size],
  )

  const primaryClasses = clsx(
    'bg-emerald-600 text-white hover:bg-emerald-500',
    'active:bg-emerald-700 focus-visible:outline-emerald-600',
    'dark:bg-emerald-500 dark:hover:bg-emerald-400',
    'dark:active:bg-emerald-600 dark:focus-visible:outline-emerald-500',
  )

  const primaryInvertClasses = clsx(
    'bg-white text-neutral-900 hover:bg-neutral-50',
    'active:bg-neutral-100 focus-visible:outline-neutral-600',
    'dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800',
    'dark:active:bg-neutral-700 dark:focus-visible:outline-neutral-400',
  )

  const secondaryClasses = clsx(
    'bg-white text-neutral-900 shadow-xs ring-1 ring-neutral-300 ring-inset hover:bg-neutral-50',
    'active:bg-neutral-100',
    'dark:bg-neutral-800 dark:text-neutral-200 dark:ring-neutral-600 dark:hover:bg-neutral-700',
    'dark:active:bg-neutral-600',
  )

  const secondaryInvertClasses = clsx(
    'bg-white/10 text-white hover:bg-white/20',
    'active:bg-white/30',
    'dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-50',
  )

  className = clsx(
    className,
    baseClasses,
    invert
      ? mode === 'primary'
        ? primaryInvertClasses
        : secondaryInvertClasses
      : mode === 'primary'
        ? primaryClasses
        : secondaryClasses,
  )

  const content = icon || children

  if (typeof props.href === 'undefined') {
    return (
      <button className={className} {...props}>
        <span className="size-5">{content}</span>
      </button>
    )
  }

  return (
    <Link className={className} {...props}>
      <span className="size-5">{content}</span>
    </Link>
  )
}

// Rounded Button - Like your existing button but with more size options
type RoundedButtonProps = {
  invert?: boolean
  mode?: 'primary' | 'secondary'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
)

export function RoundedButton({
  invert = false,
  mode = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: RoundedButtonProps) {
  const sizeClasses = {
    xs: 'rounded-full px-2.5 py-1 text-xs',
    sm: 'rounded-full px-2.5 py-1 text-sm',
    md: 'rounded-full px-3 py-1.5 text-sm',
    lg: 'rounded-full px-3.5 py-2 text-sm',
    xl: 'rounded-full px-4 py-2.5 text-sm',
  }

  const baseClasses = clsx(
    'font-semibold shadow-xs transition-all duration-200 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2',
    sizeClasses[size],
  )

  const primaryClasses = clsx(
    'bg-emerald-600 text-white hover:bg-emerald-500',
    'active:bg-emerald-700 focus-visible:outline-emerald-600',
    'dark:bg-emerald-500 dark:hover:bg-emerald-400',
    'dark:active:bg-emerald-600 dark:focus-visible:outline-emerald-500',
  )

  const primaryInvertClasses = clsx(
    'bg-white text-neutral-900 hover:bg-neutral-50',
    'active:bg-neutral-100 focus-visible:outline-neutral-600',
    'dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800',
    'dark:active:bg-neutral-700 dark:focus-visible:outline-neutral-400',
  )

  const secondaryClasses = clsx(
    'bg-white text-neutral-900 shadow-xs ring-1 ring-neutral-300 ring-inset hover:bg-neutral-50',
    'active:bg-neutral-100',
    'dark:bg-neutral-800 dark:text-neutral-200 dark:ring-neutral-600 dark:hover:bg-neutral-700',
    'dark:active:bg-neutral-600',
  )

  const secondaryInvertClasses = clsx(
    'bg-white/10 text-white hover:bg-white/20',
    'active:bg-white/30',
    'dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-50',
  )

  className = clsx(
    className,
    baseClasses,
    invert
      ? mode === 'primary'
        ? primaryInvertClasses
        : secondaryInvertClasses
      : mode === 'primary'
        ? primaryClasses
        : secondaryClasses,
  )

  if (typeof props.href === 'undefined') {
    return (
      <button className={className} {...props}>
        {children}
      </button>
    )
  }

  return (
    <Link className={className} {...props}>
      {children}
    </Link>
  )
}

// Your existing CalendlyButton (unchanged)
interface CalendlyButtonProps {
  invert?: boolean
  className?: string
}

export function CalendlyButton({
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

// Your existing PostHogButton (unchanged)
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

// Example usage component to demonstrate all buttons
export function ButtonShowcase() {
  const [darkMode, setDarkMode] = useState(false)
  const [invert, setInvert] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const PlusIcon = () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  )

  const CheckIcon = () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  )

  return (
    <div
      className={clsx(
        'min-h-screen p-8 transition-colors duration-300',
        darkMode ? 'bg-neutral-900' : invert ? 'bg-neutral-800' : 'bg-white',
      )}
    >
      {/* Controls */}
      <div className="mb-8 flex gap-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Toggle Dark Mode
        </button>
        <button
          onClick={() => setInvert(!invert)}
          className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
        >
          Toggle Invert
        </button>
      </div>

      <div className="space-y-12">
        {/* Original Buttons */}
        <section>
          <h2
            className={clsx(
              'mb-4 text-2xl font-bold',
              darkMode
                ? 'text-white'
                : invert
                  ? 'text-white'
                  : 'text-neutral-900',
            )}
          >
            Original Buttons
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button invert={invert} mode="primary">
              Primary
            </Button>
            <Button invert={invert} mode="secondary">
              Secondary
            </Button>
          </div>
        </section>

        {/* Gradient Buttons */}
        <section>
          <h2
            className={clsx(
              'mb-4 text-2xl font-bold',
              darkMode
                ? 'text-white'
                : invert
                  ? 'text-white'
                  : 'text-neutral-900',
            )}
          >
            Gradient Buttons
          </h2>
          <div className="flex flex-wrap gap-4">
            <GradientButton invert={invert} mode="primary" variant="emerald">
              Emerald Gradient
            </GradientButton>
            <GradientButton invert={invert} mode="primary" variant="blue">
              Blue Gradient
            </GradientButton>
            <GradientButton invert={invert} mode="primary" variant="purple">
              Purple Gradient
            </GradientButton>
            <GradientButton invert={invert} mode="secondary">
              Secondary Gradient
            </GradientButton>
          </div>
        </section>

        {/* Glass Buttons */}
        <section>
          <h2
            className={clsx(
              'mb-4 text-2xl font-bold',
              darkMode
                ? 'text-white'
                : invert
                  ? 'text-white'
                  : 'text-neutral-900',
            )}
          >
            Glass Buttons
          </h2>
          <div className="flex flex-wrap gap-4">
            <GlassButton invert={invert} mode="primary">
              Glass Primary
            </GlassButton>
            <GlassButton invert={invert} mode="secondary">
              Glass Secondary
            </GlassButton>
          </div>
        </section>

        {/* Neon Buttons */}
        <section>
          <h2
            className={clsx(
              'mb-4 text-2xl font-bold',
              darkMode
                ? 'text-white'
                : invert
                  ? 'text-white'
                  : 'text-neutral-900',
            )}
          >
            Neon Buttons
          </h2>
          <div className="flex flex-wrap gap-4">
            <NeonButton invert={invert} mode="primary" color="emerald">
              Neon Emerald
            </NeonButton>
            <NeonButton invert={invert} mode="primary" color="blue">
              Neon Blue
            </NeonButton>
            <NeonButton invert={invert} mode="primary" color="purple">
              Neon Purple
            </NeonButton>
            <NeonButton invert={invert} mode="primary" color="pink">
              Neon Pink
            </NeonButton>
          </div>
        </section>

        {/* Outline Buttons */}
        <section>
          <h2
            className={clsx(
              'mb-4 text-2xl font-bold',
              darkMode
                ? 'text-white'
                : invert
                  ? 'text-white'
                  : 'text-neutral-900',
            )}
          >
            Outline Buttons
          </h2>
          <div className="flex flex-wrap gap-4">
            <OutlineButton invert={invert} mode="primary" thickness="thin">
              Thin Outline
            </OutlineButton>
            <OutlineButton invert={invert} mode="primary" thickness="medium">
              Medium Outline
            </OutlineButton>
            <OutlineButton invert={invert} mode="primary" thickness="thick">
              Thick Outline
            </OutlineButton>
            <OutlineButton invert={invert} mode="secondary">
              Secondary Outline
            </OutlineButton>
          </div>
        </section>

        {/* Soft Buttons */}
        <section>
          <h2
            className={clsx(
              'mb-4 text-2xl font-bold',
              darkMode
                ? 'text-white'
                : invert
                  ? 'text-white'
                  : 'text-neutral-900',
            )}
          >
            Soft Buttons (All Sizes)
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <SoftButton invert={invert} mode="primary" size="xs">
              Extra Small
            </SoftButton>
            <SoftButton invert={invert} mode="primary" size="sm">
              Small
            </SoftButton>
            <SoftButton invert={invert} mode="primary" size="md">
              Medium
            </SoftButton>
            <SoftButton invert={invert} mode="primary" size="lg">
              Large
            </SoftButton>
            <SoftButton invert={invert} mode="primary" size="xl">
              Extra Large
            </SoftButton>
          </div>
        </section>

        {/* Icon Buttons */}
        <section>
          <h2
            className={clsx(
              'mb-4 text-2xl font-bold',
              darkMode
                ? 'text-white'
                : invert
                  ? 'text-white'
                  : 'text-neutral-900',
            )}
          >
            Icon Buttons
          </h2>
          <div className="flex flex-wrap gap-4">
            <IconButton
              invert={invert}
              mode="primary"
              icon={<CheckIcon />}
              iconPosition="leading"
            >
              Leading Icon
            </IconButton>
            <IconButton
              invert={invert}
              mode="primary"
              icon={<CheckIcon />}
              iconPosition="trailing"
            >
              Trailing Icon
            </IconButton>
            <IconButton
              invert={invert}
              mode="secondary"
              icon={<PlusIcon />}
              iconPosition="leading"
            >
              Secondary Leading
            </IconButton>
          </div>
        </section>

        {/* Circular Buttons */}
        <section>
          <h2
            className={clsx(
              'mb-4 text-2xl font-bold',
              darkMode
                ? 'text-white'
                : invert
                  ? 'text-white'
                  : 'text-neutral-900',
            )}
          >
            Circular Buttons
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <CircularButton
              invert={invert}
              mode="primary"
              size="sm"
              icon={<PlusIcon />}
            />
            <CircularButton
              invert={invert}
              mode="primary"
              size="md"
              icon={<PlusIcon />}
            />
            <CircularButton
              invert={invert}
              mode="primary"
              size="lg"
              icon={<PlusIcon />}
            />
            <CircularButton
              invert={invert}
              mode="secondary"
              size="md"
              icon={<CheckIcon />}
            />
          </div>
        </section>

        {/* Rounded Buttons */}
        <section>
          <h2
            className={clsx(
              'mb-4 text-2xl font-bold',
              darkMode
                ? 'text-white'
                : invert
                  ? 'text-white'
                  : 'text-neutral-900',
            )}
          >
            Rounded Buttons (All Sizes)
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <RoundedButton invert={invert} mode="primary" size="xs">
              Extra Small
            </RoundedButton>
            <RoundedButton invert={invert} mode="primary" size="sm">
              Small
            </RoundedButton>
            <RoundedButton invert={invert} mode="primary" size="md">
              Medium
            </RoundedButton>
            <RoundedButton invert={invert} mode="primary" size="lg">
              Large
            </RoundedButton>
            <RoundedButton invert={invert} mode="primary" size="xl">
              Extra Large
            </RoundedButton>
          </div>
        </section>

        {/* PostHog Buttons */}
        <section>
          <h2
            className={clsx(
              'mb-4 text-2xl font-bold',
              darkMode
                ? 'text-white'
                : invert
                  ? 'text-white'
                  : 'text-neutral-900',
            )}
          >
            PostHog Style Buttons
          </h2>
          <div className="flex flex-wrap gap-4">
            <PostHogButton invert={invert} mode="primary" size="sm">
              Small PostHog
            </PostHogButton>
            <PostHogButton invert={invert} mode="primary" size="md">
              Medium PostHog
            </PostHogButton>
            <PostHogButton invert={invert} mode="primary" size="lg">
              Large PostHog
            </PostHogButton>
            <PostHogButton invert={invert} mode="secondary">
              Secondary PostHog
            </PostHogButton>
          </div>
        </section>
      </div>
    </div>
  )
}
