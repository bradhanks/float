import Link from 'next/link'
import clsx from 'clsx'

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
