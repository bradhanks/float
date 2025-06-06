// // lib/analytics/tracker.ts
// import { logEvent } from '@firebase/analytics'
// import { getFirebaseAnalytics } from '@/lib/firebase/client'
// import { sendGTMEvent } from '@next/third-parties/google'
// import PostHogClient from '@/lib/posthog/client'
// import { useDistinctId } from '@/hooks/useDistinctId'

// export enum EventName {
//   SIGN_UP = 'sign_up',
//   LOGIN = 'login',
//   PURCHASE = 'purchase',
//   SEARCH = 'search',
//   SERVER_SIDE_EVENT_NAME = 'server_side_event_name',
//   BUTTON_CLICK = 'button_click',
//   FORM_SUBMIT = 'form_submit',
//   PAGE_VIEW = 'page_view',
//   // Add more events as needed
//   // For example:
//   // USER_PROFILE_UPDATE = 'user_profile_update',
//   // ITEM_ADDED_TO_CART = 'item_added_to_cart',
//   // CHECKOUT_STARTED = 'checkout_started',
//   // etc.
// }

// export type EventParams = Record<string, string | number>

// const posthog = PostHogClient()
// const distinctId = useDistinctId() ? useDistinctId() : ''
// posthog.capture({
//   distinctId: distinctId,
//   event: 'server_side_event_name',
// })

// // Analytics provider interface for extensibility
// interface AnalyticsProvider {
//   name: string
//   track: (eventName: EventName, params?: EventParams) => Promise<void> | void
//   identify?: (
//     userId: string,
//     traits?: Record<string, any>,
//   ) => Promise<void> | void
//   page?: (
//     pageName?: string,
//     properties?: Record<string, any>,
//   ) => Promise<void> | void
// }

// // Firebase Analytics Provider
// const firebaseProvider: AnalyticsProvider = {
//   name: 'firebase',
//   track: async (eventName: EventName, params?: EventParams) => {
//     try {
//       const analytics = await getFirebaseAnalytics()
//       if (analytics) {
//         logEvent(analytics, eventName as string, params || {})
//       }
//     } catch (error) {
//       console.error('Firebase Analytics error:', error)
//     }
//   },
// }

// // Google Tag Manager / Google Analytics Provider
// const gtmProvider: AnalyticsProvider = {
//   name: 'gtm',
//   track: (eventName: EventName, params?: EventParams) => {
//     try {
//       sendGTMEvent({
//         event: eventName,
//         ...params,
//       })
//     } catch (error) {
//       console.error('GTM Analytics error:', error)
//     }
//   },
// }

// // PostHog Provider
// const posthogProvider: AnalyticsProvider = {
//   name: 'posthog',
//   track: (eventName: EventName, params?: EventParams) => {
//     try {
//       // Import PostHog dynamically to avoid SSR issues
//       if (typeof window !== 'undefined' && (window as any).posthog) {
//         ;(window as any).posthog.capture(eventName, params)
//       }
//     } catch (error) {
//       console.error('PostHog Analytics error:', error)
//     }
//   },
//   identify: (userId: string, traits?: Record<string, any>) => {
//     try {
//       if (typeof window !== 'undefined' && (window as any).posthog) {
//         ;(window as any).posthog.identify(userId, traits)
//       }
//     } catch (error) {
//       console.error('PostHog identify error:', error)
//     }
//   },
// }

// // Placeholder providers for future analytics services
// const amplitudeProvider: AnalyticsProvider = {
//   name: 'amplitude',
//   track: (eventName: EventName, params?: EventParams) => {
//     // TODO: Implement Amplitude tracking
//     console.log('Amplitude tracking placeholder:', eventName, params)
//   },
// }

// const mixpanelProvider: AnalyticsProvider = {
//   name: 'mixpanel',
//   track: (eventName: EventName, params?: EventParams) => {
//     // TODO: Implement Mixpanel tracking
//     console.log('Mixpanel tracking placeholder:', eventName, params)
//   },
// }

// const segmentProvider: AnalyticsProvider = {
//   name: 'segment',
//   track: (eventName: EventName, params?: EventParams) => {
//     // TODO: Implement Segment tracking
//     console.log('Segment tracking placeholder:', eventName, params)
//   },
// }

// // Configure which providers are active
// const activeProviders: AnalyticsProvider[] = [
//   firebaseProvider,
//   gtmProvider,
//   posthogProvider,
//   // amplitudeProvider, // Uncomment when ready to use
//   // mixpanelProvider, // Uncomment when ready to use
//   // segmentProvider, // Uncomment when ready to use
// ]

// // Main tracking function
// export const trackEvent = async (
//   eventName: EventName,
//   params?: EventParams,
//   options?: {
//     excludeProviders?: string[] // Optionally exclude specific providers
//     onlyProviders?: string[] // Optionally track only specific providers
//   },
// ) => {
//   const providersToUse = activeProviders.filter((provider) => {
//     if (options?.onlyProviders) {
//       return options.onlyProviders.includes(provider.name)
//     }
//     if (options?.excludeProviders) {
//       return !options.excludeProviders.includes(provider.name)
//     }
//     return true
//   })

//   const trackingPromises = providersToUse.map(async (provider) => {
//     try {
//       await provider.track(eventName, params)
//     } catch (error) {
//       console.error(`Analytics error in ${provider.name}:`, error)
//     }
//   })

//   // Execute all tracking calls in parallel
//   await Promise.allSettled(trackingPromises)
// }

// // User identification across providers
// export const identifyUser = async (
//   userId: string,
//   traits?: Record<string, any>,
// ) => {
//   const identifyPromises = activeProviders
//     .filter((provider) => provider.identify)
//     .map(async (provider) => {
//       try {
//         await provider.identify!(userId, traits)
//       } catch (error) {
//         console.error(`User identification error in ${provider.name}:`, error)
//       }
//     })

//   await Promise.allSettled(identifyPromises)
// }

// // Page tracking across providers
// export const trackPage = async (
//   pageName?: string,
//   properties?: Record<string, any>,
// ) => {
//   const pagePromises = activeProviders
//     .filter((provider) => provider.page)
//     .map(async (provider) => {
//       try {
//         await provider.page!(pageName, properties)
//       } catch (error) {
//         console.error(`Page tracking error in ${provider.name}:`, error)
//       }
//     })

//   await Promise.allSettled(pagePromises)
// }

// // Utility function to add a new provider
// export const addAnalyticsProvider = (provider: AnalyticsProvider) => {
//   if (!activeProviders.find((p) => p.name === provider.name)) {
//     activeProviders.push(provider)
//   }
// }

// // Utility function to remove a provider
// export const removeAnalyticsProvider = (providerName: string) => {
//   const index = activeProviders.findIndex((p) => p.name === providerName)
//   if (index > -1) {
//     activeProviders.splice(index, 1)
//   }
// }

// // // components/EventButton.tsx
// // import { trackEvent } from '@/lib/analytics/tracker'

// // export function EventButton() {
// //   const handleButtonClick = async () => {
// //     // Now this single call tracks across all your analytics providers
// //     await trackEvent('button_click', {
// //       value: 'xyz',
// //       button_id: 'main_cta',
// //       timestamp: new Date().toISOString()
// //     })
// //   }

// //   return (
// //     <div>
// //     <button onClick= { handleButtonClick } >
// //     Send Event
// //       </button>
// //       </div>
// //   )
// // }

// // // Example usage in other components
// // export function SignUpButton() {
// //   const handleSignUp = async () => {
// //     await trackEvent('sign_up', {
// //       method: 'email',
// //       source: 'homepage'
// //     })
// //   }

// //   return <button onClick={ handleSignUp }> Sign Up </button>
// // }

// // export function SearchComponent() {
// //   const handleSearch = async (query: string) => {
// //     await trackEvent('search', {
// //       query,
// //       results_count: 42 // example
// //     })
// //   }

// //   return (
// //     <input
// //       onKeyDown= {(e) => {
// //     if (e.key === 'Enter') {
// //       handleSearch(e.currentTarget.value)
// //     }
// //   }
// // }
// // placeholder = "Search..."
// //   />
// //   )
// // }
