import clsx from 'clsx'

import { Blockquote } from '@/components/Blockquote'
import { Border } from '@/components/Border'
import { GrayscaleTransitionImage } from '@/components/GrayscaleTransitionImage'
import { StatList, StatListItem } from '@/components/StatList'
import { TagList, TagListItem } from '@/components/TagList'

export const MDXComponents = {
  Blockquote({
    className,
    ...props
  }: React.ComponentPropsWithoutRef<typeof Blockquote>) {
    return <Blockquote className={clsx('my-32', className)} {...props} />
  },
  img: function Img({
    className,
    ...props
  }: React.ComponentPropsWithoutRef<typeof GrayscaleTransitionImage>) {
    return (
      <div
        className={clsx(
          'rounded-4xl group isolate my-10 overflow-hidden bg-neutral-100 max-sm:-mx-6',
          className,
        )}
      >
        <GrayscaleTransitionImage
          {...props}
          sizes="(min-width: 768px) 42rem, 100vw"
          className="aspect-16/10 w-full object-cover"
        />
      </div>
    )
  },
  StatList({
    className,
    ...props
  }: React.ComponentPropsWithoutRef<typeof StatList>) {
    return (
      <StatList className={clsx('max-w-none! my-32', className)} {...props} />
    )
  },
  StatListItem,
  table: function Table({
    className,
    ...props
  }: React.ComponentPropsWithoutRef<'table'>) {
    return (
      <div
        className={clsx(
          'my-10 max-sm:-mx-6 max-sm:flex max-sm:overflow-x-auto',
          className,
        )}
      >
        <div className="max-sm:min-w-full max-sm:flex-none max-sm:px-6">
          <table {...props} />
        </div>
      </div>
    )
  },
  TagList({
    className,
    ...props
  }: React.ComponentPropsWithoutRef<typeof TagList>) {
    return <TagList className={clsx('my-6', className)} {...props} />
  },
  TagListItem,
  TopTip({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
  }) {
    return (
      <Border position="left" className={clsx('my-10 pl-8', className)}>
        <p className="font-display text-sm font-bold uppercase tracking-widest text-neutral-950">
          Top tip
        </p>
        <div className="mt-4">{children}</div>
      </Border>
    )
  },
  Typography({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    return <div className={clsx('typography', className)} {...props} />
  },
  wrapper({
    className,
    ...props
  }: React.ComponentPropsWithoutRef<'div'> & {
    props?: Record<string, string>
  }) {
    return (
      <div
        className={clsx(
          '[&>:first-child]:mt-0! [&>:last-child]:mb-0! *:mx-auto *:max-w-3xl',
          className,
        )}
        {...props}
      />
    )
  },
  Tip: ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="my-6 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 text-sm text-blue-800">
        <p className="font-semibold">Pro Tip</p>
        <p>{children}</p>
      </div>
    )
  },

  Example: ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="my-6 rounded-md border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-700">
        <p className="mb-2 font-semibold">Example</p>
        <div>{children}</div>
      </div>
    )
  },

  Definition: ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="my-4 border-l-2 border-indigo-500 pl-3">
        <h3 className="text-lg font-semibold text-indigo-700">Definition</h3>
        <p className="mt-1">{children}</p>
      </div>
    )
  },
}
