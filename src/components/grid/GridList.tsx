import clsx from 'clsx'
import Link from 'next/link'
import { Border } from '@/components/Border'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'

export function GridList({
  className,
  columns = 3,
  children,
}: {
  children: React.ReactNode
  className?: string
  columns?: number
}) {
  // Generate dynamic grid column classes
  const getGridCols = (cols: number) => {
    const colsMap: Record<number, string> = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2 max-w-7xl',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
      6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-6',
    }
    return colsMap[cols] || `grid-cols-${cols}`
  }

  return (
    <FadeInStagger>
      <ul
        role="list"
        className={clsx(
          'grid gap-10 sm:gap-12 lg:gap-16',
          getGridCols(columns),
          className,
        )}
      >
        {children}
      </ul>
    </FadeInStagger>
  )
}

export function GridListWithButtons({
  className,
  columns = 3,
  children,
}: {
  children: React.ReactNode
  className?: string
  columns?: number
}) {
  // Generate dynamic grid column classes
  const getGridCols = (cols: number) => {
    const colsMap: Record<number, string> = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2 sm:max-w-7xl',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
      6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
    }
    return colsMap[cols] || `grid-cols-${cols}`
  }

  return (
    <FadeInStagger>
      <ul
        role="list"
        className={clsx(
          'grid gap-10 sm:gap-12 lg:gap-16',
          getGridCols(columns),
          className,
        )}
      >
        {children}
      </ul>
    </FadeInStagger>
  )
}
