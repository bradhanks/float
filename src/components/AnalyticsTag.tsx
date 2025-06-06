'use client'
import { useEffect } from 'react'
import { GoogleTagManager } from '@next/third-parties/google'
import PostHogClient from '@/lib/posthog/client'
import { useDistinctId } from '@/hooks/useDistinctId'
import { Analytics } from '@vercel/analytics/next'

function ClientGTM() {
  const distinctId = useDistinctId()

  const dataLayer = distinctId
    ? {
        distinct_id: distinctId,
      }
    : undefined

  return <GoogleTagManager gtmId="GTM-PP2P57S" dataLayer={dataLayer} />
}

function FirebaseTracker() {
  const distinct_id = useDistinctId()

  useEffect(() => {
    if (distinct_id) {
      fetch('/api/firebase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ distinct_id }),
      })
    }
  }, [distinct_id])

  return null
}

function PostHogTracker() {
  const distinctId = useDistinctId()

  PostHogClient().identify({ distinctId: distinctId })

  return null
}

export default function AnalyticsTag() {
  return (
    <>
      <ClientGTM />
      <FirebaseTracker />
      <PostHogTracker />
      <Analytics />
    </>
  )
}
