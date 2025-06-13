'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react'
import { Suspense, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { UUID } from 'node:crypto'

export function PostHogProvider({
  distinctID,
  children,
}: {
  distinctID: UUID
  children: React.ReactNode
}) {
  useEffect(() => {
    const loadPostHog = async () => {
      const { default: posthog } = await import('posthog-js')
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: '/ingest',
        ui_host: 'https://us.posthog.com',
        defaults: '2025-05-24',
        persistence: 'memory',
        debug: process.env.NODE_ENV === 'development',
        bootstrap: {
          // optional
          distinctID: distinctID,
          // featureFlags: {
          //   'feature-flag-1': true,
          //   'feature-flag-2': false,
          // },
        },
      })
    }

    // Load on first user interaction
    const handleInteraction = () => {
      loadPostHog()
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('scroll', handleInteraction)
    }

    window.addEventListener('click', handleInteraction)
    window.addEventListener('scroll', handleInteraction)
  }, [distinctID])

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  )
}

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname
      const search = searchParams?.toString() ?? ''
      if (search) {
        url += '?' + search
      }
      posthog.capture('$pageview', { $current_url: url })
    }
  }, [pathname, searchParams, posthog])

  return null
}

function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  )
}
