import PostHogClient from '@/lib/posthog/client'

export async function getData() {
  const posthog = PostHogClient()
  const flags = await posthog.getAllFlags(
    'ian@posthog.com', // replace with a user's distinct ID
  )
  return flags
}
