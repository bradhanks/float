import { type Metadata } from 'next'
import '@/styles/tailwind.css'
import '@/styles/base.css'
import { PostHogProvider } from '@/app/providers'
import { headers } from 'next/headers'


export const experimental_ppr = true
export const metadata: Metadata = {
  title: {
    template: '%s | B2B SaaS Startup Consulting | SeriesLab.',
    default: 'B2B SaaS Martech Consulting',
  },
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  const nonce = await headers().then((mod) => mod.get('x-nonce') || '')
  return (
    <html lang="en" className="h-full bg-neutral-950 text-base antialiased">
      <meta property="csp-nonce" content={nonce} />
      <body className="flex min-h-full flex-col">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  )
}
