import { clsx } from 'clsx'

export function Example({
  children,
  title = 'Preview',
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <div className="my-10">
      <div className="mb-2 font-medium text-neutral-700">{title}</div>
      <div className="overflow-hidden rounded-xl border border-neutral-200 shadow-sm">
        {children}
      </div>
    </div>
  )
}
