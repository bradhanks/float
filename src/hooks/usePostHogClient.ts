import { useEffect, useState } from 'react'
import posthog from 'posthog-js'

let postHogInitialized = false

export function usePostHogClient() {
  const [postHogClient, setPostHogClient] = useState<typeof posthog | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || postHogInitialized) return

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    })

    postHogInitialized = true
    setPostHogClient(posthog)
  }, [postHogClient])

  return postHogClient
}

export function PostHog() {
  usePostHogClient()
  return null
}
