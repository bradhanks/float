import { clsx } from 'clsx'

export function CodeBlock({
  children,
  className,
  language = 'text',
}: {
  children: string
  className?: string
  language?: string
}) {
  return (
    <pre
      className={clsx(
        'relative my-8 overflow-x-auto rounded-xl bg-neutral-900 p-6 text-sm leading-6 text-white',
        className,
      )}
    >
      <code className="block">{children}</code>
    </pre>
  )
}

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md bg-neutral-100 px-1 py-0.5 font-mono text-sm text-neutral-900">
      {children}
    </code>
  )
}
