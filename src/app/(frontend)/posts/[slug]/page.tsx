import { SanityDocument } from '@sanity/client'
import { postPathsQuery, postQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'
import { client } from '@/sanity/lib/client'
import SanityPost from '@/components/SanityPost'

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await client.fetch(postPathsQuery)
  return posts
}

const PostPage = async ({ params }: { params: any }) => {
  const result = await sanityFetch({ query: postQuery, params })
  return <SanityPost post={result.data} />
}

export default PostPage
