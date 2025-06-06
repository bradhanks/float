import { PostHog } from 'posthog-node'
import { useDistinctId } from '@/hooks/useDistinctId'

export default function PostHogClient() {
  const distinctId = useDistinctId()
  const posthogClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    bootstrap: {
      distinctId: distinctId,
    },
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  })
  return posthogClient
}
