import Link from 'next/link'
import clsx from 'clsx'

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
    'inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 ease-in-out border'

  const primaryClasses = clsx(
    'bg-neutral-900 text-white hover:bg-white hover:text-neutral-900 border-neutral-900',
    'active:bg-emerald-500 active:border-emerald-500 active:text-white',
    'dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-900 dark:hover:text-white dark:border-white',
    'dark:active:bg-emerald-600 dark:active:border-emerald-600',
  )

  const secondaryClasses = clsx(
    'bg-white text-neutral-900 border-neutral-900 hover:bg-neutral-900 hover:text-white',
    'active:bg-emerald-500 active:border-emerald-500 active:text-white',
    'dark:bg-neutral-900 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-neutral-900',
    'dark:active:bg-emerald-600 dark:active:border-emerald-600',
  )

  className = clsx(
    className,
    baseClasses,
    invert
      ? mode === 'primary'
        ? secondaryClasses
        : primaryClasses
      : mode === 'primary'
        ? primaryClasses
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
