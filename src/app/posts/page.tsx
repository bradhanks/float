// src/app/posts/page.tsx

// --- Imports ---
// Standard imports for Next.js components and functions.
import { type Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

// Your project-specific components.
import Border from '@/components/Border';
import { Button } from '@/components/Button';
import { ContactSection } from '@/components/ContactSection';
import { Container } from '@/components/Container';
import { FadeIn } from '@/components/FadeIn';
import { PageIntro } from '@/components/PageIntro';
import AppLayout from '@/components/AppLayout';

// Utility functions and data fetching.
import { formatDate } from '@/lib/formatDate';
import { sanityFetch } from '@/sanity/lib/live';
import { POSTS_QUERY } from '@/sanity/lib/queries';
import { SanityDocument } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';

const builder = imageUrlBuilder(client);

// --- Metadata ---
// Sets the title and description for the blog page for SEO purposes.
export const metadata: Metadata = {
  title: {
    default: "fallback title for child segments.",
    template: `"%s | My Website"`,
    absolute: "A title that overrides parent templates."
  },
  description:
    'Stay up-to-date with the latest industry news as our marketing teams finds new ways to re-purpose old CSS tricks articles.',
  publisher: 'SeriesLab',

};

// --- Main Blog Page Component ---
export default async function Blog() {
  // Fetches the list of all blog posts from Sanity.
  const { data: posts }: { data: SanityDocument[] } = await sanityFetch({ query: POSTS_QUERY });

  return (
    <AppLayout>
      {/* Renders the page intro section. */}
      <PageIntro eyebrow="Blog" title="The latest articles and news">
        <p>
          Stay up-to-date with the latest industry news as our marketing teams
          finds new ways to re-purpose old CSS tricks articles.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="space-y-24 lg:space-y-32">
          {/* Maps over the fetched posts and renders each one. */}
          {posts.map((post) => (
            <FadeIn key={post._id}>
              <article>
                <Border className="pt-16">
                  {/* --- LAYOUT CHANGE --- */}
                  {/* The layout is now a two-column grid on large screens to accommodate the image. */}
                  <div className="relative grid grid-cols-1 gap-x-8 lg:grid-cols-3">
                    {/* --- NEW: Post Image --- */}
                    {/* The main image for the post is now displayed. */}
                    <div className="flex flex-col items-start lg:col-span-1">
                      {post.mainImage ? (
                        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-8 lg:mb-0">
                          <Image
                            src={builder
                              .image(post.mainImage)
                              .width(600)
                              .height(338)
                              .fit('crop')
                              .auto('format')
                              .url()}
                            alt={post.mainImage.alt || ''}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        // Optional: A placeholder if no image is available.
                        <div className="w-full aspect-[16/9] rounded-2xl bg-neutral-100" />
                      )}
                    </div>

                    {/* --- Text Content --- */}
                    {/* This column contains the post title, metadata, and preview text. */}
                    <div className="lg:col-span-2">
                      <h2 className="font-display text-2xl font-semibold text-neutral-950">
                        <Link href={`/posts/${post.slug.current}`}>{post.title}</Link>
                      </h2>
                      <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-600">
                        <div className="flex items-center gap-x-2">
                          <dt className="sr-only">Author</dt>
                          <dd className="font-semibold text-neutral-950">{post.author?.name}</dd>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <dt className="sr-only">Published</dt>
                          <dd>
                            <time dateTime={post.publishedAt}>
                              {formatDate(post.publishedAt)}
                            </time>
                          </dd>
                        </div>
                      </dl>
                      {/* --- Preview Text --- */}
                      {/* The 'excerpt' field is used here as the preview text. */}
                      <p className="mt-4 max-w-2xl text-base text-neutral-600">
                        {post.excerpt}
                      </p>
                      <Button
                        href={`/posts/${post.slug.current}`}
                        aria-label={`Read more: ${post.title}`}
                        className="mt-6"
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
    </AppLayout>
  );
}
