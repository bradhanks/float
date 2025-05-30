import { type Metadata } from 'next'

import '@/styles/tailwind.css'
import '@/styles/base.css'
import { PostHogProvider } from '@/app/providers'

export const metadata: Metadata = {
  title: {
    template: '%s - SeriesA. ',
    default: 'SeriesA. - B2B SaaS Martech Consulting',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-neutral-950 text-base antialiased">
      <body className="flex min-h-full flex-col">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  )
}
