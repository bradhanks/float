'use client'

import { useEffect } from 'react'
import { GoogleTagManager } from '@next/third-parties/google'
import { usePostHogClient } from '@/hooks/usePostHogClient'
import { useDistinctId } from '@/hooks/useDistinctId'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

function ClientGTM() {
  const distinctId = useDistinctId()

  const dataLayer = distinctId
    ? {
      distinct_id: distinctId,
    }
    : undefined

  return <GoogleTagManager gtmId="GTM-PP2P57S" dataLayer={dataLayer} />
}

function PostHogTracker() {
  const distinctId = useDistinctId()
  const posthog = usePostHogClient()

  useEffect(() => {
    if (distinctId && posthog) {
      posthog.identify(distinctId)
    }
  }, [distinctId, posthog])

  return null
}

export default function AnalyticsTag() {
  return (
    <>
      <ClientGTM />
      <PostHogTracker />
      <Analytics />
      <SpeedInsights />
    </>
  )
}
