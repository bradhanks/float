export const SANITY_VIEWER_TOKEN =
  'skyPVO8a7bGJXhmQB8268Ew2nCIeSewIBHPJeIoa4Pmw7g73gpTV6w8LhlQKI7VyJMT7muSxWqcAQgB3BKr6dfFkKY7qY6X0jWEcd9DAYVIn0aRWIIm7CwtJYWqgm1ZpqAqZMMhXc5NHCQGqSpY985lyqHHByrz9nsV0UsATJHcBJysCQP80'
const NEXT_PUBLIC_SANITY_PROJECT_ID = 'pynumaa3'
const NEXT_PUBLIC_SANITY_DATASET = 'production'

export const apiVersion = '2025-06-08'

export const dataset = assertValue(
  NEXT_PUBLIC_SANITY_DATASET!,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET',
)

export const projectId = assertValue(
  NEXT_PUBLIC_SANITY_PROJECT_ID!,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID',
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
