import { type Metadata } from 'next'
import '@/styles/tailwind.css'
import '@/styles/base.css'
import { PostHogProvider } from '@/app/providers'
import { headers } from 'next/headers'
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app'

// Initialize Firebase Admin only when needed (lazy initialization)
let firebaseApp: ReturnType<typeof initializeApp> | null = null

function initializeFirebase() {
  if (firebaseApp) return firebaseApp

  if (process.env.NODE_ENV === 'development') {
    firebaseApp = initializeApp({
      credential: applicationDefault(),
    })
  } else if (process.env.NODE_ENV === 'production') {
    try {
      if (!process.env.CREDENTIALS_BASE64) {
        throw new Error('Missing CREDENTIALS_BASE64 environment variable')
      }

      const serviceAccount = JSON.parse(
        Buffer.from(process.env.CREDENTIALS_BASE64, 'base64').toString(),
      )

      firebaseApp = initializeApp({
        credential: cert(serviceAccount),
      })
    } catch (error) {
      return error
    }
  }

  return firebaseApp
}

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
  // Initialize Firebase only when needed (not during static rendering)
  if (process.env.NODE_ENV !== 'test') {
    initializeFirebase()
  }

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
