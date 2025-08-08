import { createClient, defineLive } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env' // Assuming this file exports your env variables
import { token } from "@/sanity/lib/token"

// We need to use the projectId and dataset from your env file
const client = createClient({
  projectId,
  dataset,
  apiVersion, // Make sure this is a valid date like '2024-07-08'
  useCdn: true, // `true` for production, `false` for development is a good default
  stega: {
    enabled: true,
    studioUrl: '/studio',
  },
})

// The defineLive function creates a preview-aware fetch function
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
})
