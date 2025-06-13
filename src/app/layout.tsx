import { type Metadata } from 'next'
import '@/styles/tailwind.css'
import '@/styles/base.css'
import { headers } from 'next/headers'
import ClientProvider from '@/components/ClientProvider'

import { Mona_Sans } from 'next/font/google'

const monaSans = Mona_Sans({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    template: '%s | B2B SaaS Startup Consulting | SeriesLab.',
    default: 'B2B SaaS Martech Consulting',
  },
  icons: {
    icon: [
      {
        url: '/favicon-light.ico',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/favicon-dark.ico',
        media: '(prefers-color-scheme: dark)',
      },
    ],
  },
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const nonce = await headers().then((mod) => mod.get('x-nonce') || '')
  return (
    <html
      lang="en"
      className={`h-full bg-neutral-950 text-base antialiased ${monaSans.className}`}
    >
      <meta property="csp-nonce" content={nonce} />
      <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />

      <body className="flex min-h-full flex-col">
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  )
}
