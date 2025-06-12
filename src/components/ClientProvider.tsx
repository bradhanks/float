'use client'

import { PostHogProvider } from '@/app/providers'
import AnalyticsTag from '@/components/AnalyticsTag'

export function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider>
      {children}
      <AnalyticsTag />
    </PostHogProvider>
  )
}
