'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useDistinctId } from '@/hooks/useDistinctId'

const GoogleTagManager = dynamic(() =>
  import('@next/third-parties/google').then((mod) => mod.GoogleTagManager),
)
const Analytics = dynamic(() =>
  import('@vercel/analytics/next').then((mod) => mod.Analytics),
)
const SpeedInsights = dynamic(() =>
  import('@vercel/speed-insights/next').then((mod) => mod.SpeedInsights),
)

function ClientGTM() {
  const distinctId = useDistinctId()

  const dataLayer = distinctId
    ? {
        distinct_id: distinctId,
      }
    : undefined

  return <GoogleTagManager gtmId="GTM-PP2P57S" dataLayer={dataLayer} />
}

export default function AnalyticsTag() {
  return (
    <>
      <ClientGTM />
      <Analytics />
      <SpeedInsights />
    </>
  )
}
