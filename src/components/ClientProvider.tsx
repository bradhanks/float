import dynamic from 'next/dynamic'
import { v4 as uuidv4 } from 'uuid'
const distinctID =
  uuidv4() as `${string}-${string}-${string}-${string}-${string}`
const AnalyticsTag = dynamic(() => import('@/components/AnalyticsTag'))
const PostHogProvider = dynamic(
  () => import('@/app/providers').then((mod) => mod.PostHogProvider),
  {},
)
export default function ClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PostHogProvider distinctID={distinctID}>
      {children}
      <AnalyticsTag />
    </PostHogProvider>
  )
}
