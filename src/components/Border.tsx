import clsx from 'clsx'

type BorderProps<T extends React.ElementType> = {
  as?: T
  className?: string
  position?: 'top' | 'left'
  invert?: boolean
}

export function Border<T extends React.ElementType = 'div'>({
  as,
  className,
  children,
  position = 'top',
  invert = false,
  ...props
}: Omit<React.ComponentPropsWithoutRef<T>, keyof BorderProps<T>> &
  BorderProps<T>) {
  const Component = as ?? 'div'
  return (
    <Component
      className={clsx(
        className,
        'relative h-full pb-4 before:absolute after:absolute',
        invert
          ? 'before:bg-white after:bg-white/10 group-hover:before:bg-emerald-700'
          : 'before:bg-neutral-950 after:bg-neutral-200/70 group-hover:before:bg-emerald-700',
        position === 'top' &&
          'before:left-0 before:top-0 before:h-px before:w-6 after:left-8 after:right-0 after:top-0 after:h-px',
        position === 'left' &&
          'before:left-0 before:top-0 before:h-6 before:w-px after:bottom-0 after:left-0 after:top-8 after:w-px',
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
