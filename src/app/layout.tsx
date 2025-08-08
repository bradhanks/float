import { type Metadata } from 'next'
import '@/styles/tailwind.css'
import ClientProvider from '@/components/ClientProvider'
import { headers, draftMode } from 'next/headers'
import { SanityLive } from "@/sanity/lib/live";

import { VisualEditing } from "next-sanity";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import localFont from 'next/font/local'

const monaSans = localFont({
  src: [{
    path: './../fonts/Mona-Sans.var.woff2',
    weight: '200 900',
    style: 'normal',
  }],
  display: 'swap',
  preload: true,
  declarations: [
    { prop: 'font-stretch', value: '75% 125%' },
  ],
})




const metadata: Metadata = {
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

  const nonceHeader = await headers().then((mod) => { return mod.get('x-nonce') })
  const nonce = nonceHeader ? nonceHeader : ''
  return (
    <html
      lang="en"
      className={`h-full bg-neutral-950 text-base antialiased ${monaSans.className}`}
    >
      <meta property="csp-nonce" content={nonce} />
      <meta name="p:domain_verify" content="58e46bf29d58c54526fd01832779f521"/>
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
        <ClientProvider>
          {children}
        </ClientProvider>
        <SanityLive />
        {(await draftMode()).isEnabled && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}

      </body>
    </html>
  )
}
