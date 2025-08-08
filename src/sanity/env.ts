// export const apiVersion =
//   process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-06-11'

export const apiVersion = '2025-06-11'

export const studioURL = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333/studio/'
export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET',
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'pynumaa3',
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID',
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
