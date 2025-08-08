import clsx from 'clsx'
import React, { RefObject } from 'react'

type ContainerProps<T extends React.ElementType> = {
  as?: T
  className?: string
  children: React.ReactNode
  ref?: RefObject<HTMLInputElement>;
}

export function Container<T extends React.ElementType = 'div'>({
  as,
  className,
  children,
  ref
}: Omit<React.ComponentPropsWithoutRef<T>, keyof ContainerProps<T>> &
  ContainerProps<T>) {
  const Component = as ?? 'div'

  return (
    <Component className={clsx('mx-auto max-w-7xl px-6 lg:px-8', className)} ref={ref}>
      <div className="mx-auto max-w-2xl lg:max-w-none">{children}</div>
    </Component>
  )
}
