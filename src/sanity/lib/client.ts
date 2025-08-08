import { createClient, type QueryParams } from 'next-sanity'

import { apiVersion, dataset, projectId, studioURL } from '../env'

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export const client = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn: true,
  stega: { studioUrl: '/studio' },


})

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = 60, // default revalidation time in seconds
  tags = [],
}: {
  query: QueryString
  params?: QueryParams
  revalidate?: number | false
  tags?: string[]
}) {
  return client.fetch(query, params, {
    cache: 'force-cache', // on next v14 it's force-cache by default, in v15 it has to be set explicitly
    next: {
      revalidate: tags.length ? false : revalidate, // for simple, time-based revalidation
      tags, // for tag-based revalidation
    },
  })
}
