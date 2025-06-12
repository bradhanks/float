import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import { formatDate } from '@/lib/formatDate'
import { sanityFetch } from '@/sanity/lib/live'
import { POSTS_QUERY } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'B2B SaaS Startup Blog',
  description:
    'Stay up-to-date with the latest industry news as our marketing teams finds new ways to re-purpose old CSS tricks articles.',
}

export default async function Posts(): Promise<React.ReactElement> {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY })

  return (
    <RootLayout>
      <PageIntro eyebrow="Blog" title="The latest articles and news">
        <p>
          Stay up-to-date with the latest industry news as our marketing teams
          finds new ways to re-purpose old CSS tricks articles.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="space-y-24 lg:space-y-32">
          {posts.map((post) => (
            <FadeIn key={post._id}>
              <article>
                <Border className="pt-16">
                  <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                    <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                      <h2 className="font-display text-2xl font-semibold text-neutral-950">
                        <Link
                          href={
                            post.slug?.current
                              ? '/posts/${post.slug.current}'
                              : '#'
                          }
                          className="hover:text-emerald-600"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      <dl className="lg:absolute lg:left-0 lg:top-0 lg:w-1/3 lg:px-4">
                        <dt className="sr-only">Published</dt>
                        <dd className="absolute left-0 top-0 text-sm text-neutral-950 lg:static">
                          <time dateTime={post.publishedAt || undefined}>
                            {formatDate(
                              post.publishedAt || new Date().toISOString(),
                            )}
                          </time>
                        </dd>
                        <dt className="sr-only">Author</dt>
                        <dd className="mt-6 flex gap-x-4">
                          <div className="flex-none overflow-hidden rounded-xl bg-neutral-100">
                            {/* {post.author?.image != null &&
                              <Image
                                src={post.author.image.asset ? post.author.image.asset.url : ''}
                                alt={
                                  post.author.image.alt ||
                                  post.author.name ||
                                  'Author image'
                                }
                                width={48}
                                height={48}
                                className="h-12 w-12 object-cover grayscale"
                              />
                            } */}
                          </div>
                          <div className="text-sm text-neutral-950">
                            <div className="font-semibold">
                              {post.author?.name || 'Unknown Author'}
                            </div>
                            {/* Remove role since it doesn't exist in schema */}
                          </div>
                        </dd>
                      </dl>
                      <p className="mt-6 max-w-2xl text-base text-neutral-600">
                        {post.description}
                      </p>
                      <Button
                        href={`/posts/${post.slug?.current}`}
                        aria-label={`Read more: ${post.title}`}
                        className="mt-8"
                      >
                        Read more
                      </Button>
                    </div>
                  </div>
                </Border>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>

      <ContactSection />
    </RootLayout>
  )
}
