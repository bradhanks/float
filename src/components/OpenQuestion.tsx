// Inline note for a fact still waiting on confirmation. Shows on previews
// so drafts can be reviewed in place, and renders nothing in production.
export function showDrafts() {
  return process.env.VERCEL_ENV !== 'production'
}

export function OpenQuestion({ children }: { children: React.ReactNode }) {
  if (!showDrafts()) return null

  return (
    <mark className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[0.85em] text-amber-900 ring-1 ring-amber-300 ring-inset">
      <span className="font-semibold">Check: </span>
      {children}
    </mark>
  )
}
