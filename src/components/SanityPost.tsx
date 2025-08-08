// src/components/SanityPost.tsx

'use client';

// --- Imports ---
import { SanityDocument } from '@sanity/client';
import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import Image from 'next/image';
import { Blockquote } from '@/components/Blockquote';
import { Button } from '@/components/Button';
import { formatDate } from '@/lib/formatDate';
import { PageIntro } from '@/components/PageIntro';
import { TagList, TagListItem } from '@/components/TagList';
import { FadeIn } from './FadeIn';
import { PortableTextRenderer } from '@/components/PortableTextRenderer';

// Creates an image URL builder instance.
const builder = imageUrlBuilder(client);

// --- Main Component ---
const SanityPost = ({ post }: { post: SanityDocument }) => {
  // --- Not Found State ---
  // If no post data is provided, show a user-friendly error page.
  if (!post) {
    return (
      <PageIntro eyebrow="Error" title="Post not found">
        <p>This post could not be found. Please check the URL or return to the blog.</p>
        <Button href="/blog" className="mt-8">
          Back to Blog
        </Button>
      </PageIntro>
    );
  }

  return (
    <>
      <article>
        <FadeIn>
          {/* --- Post Header --- */}
          <header className="mx-auto flex max-w-5xl flex-col text-center">
            {/* Status Badges */}
            <div className="flex justify-center gap-x-4 mb-4">
              {post.featured && <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">Featured</span>}
              {post.sticky && <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">Sticky</span>}
            </div>
            {/* Post Title */}
            <h1 className="mt-6 font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-6xl">
              {post.title}
            </h1>
            {/* Post Metadata */}
            <div className="mt-6 text-sm text-neutral-600">
              <p>
                By {post.author.name}
                {post.author.role && `, ${post.author.role}`}
              </p>
              <div className="mt-2 flex justify-center gap-x-4">
                <time dateTime={post.publishedAt}>
                  Published on {formatDate(post.publishedAt)}
                </time>
                {post.updatedAt && post.updatedAt !== post.publishedAt && (
                  <>
                    <span>•</span>
                    <time dateTime={post.updatedAt}>
                      Updated on {formatDate(post.updatedAt)}
                    </time>
                  </>
                )}
                {post.readingTime && (
                  <>
                    <span>•</span>
                    <span>{post.readingTime} min read</span>
                  </>
                )}
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post?.mainImage && (
            <div className="my-12">
              <Image
                src={builder.image(post.mainImage).width(1200).height(675).url()}
                alt={post.mainImage.alt || ''}
                width={1200}
                height={675}
                priority
                className="rounded-2xl"
              />
            </div>
          )}

          {/* Post Body */}
          <div className="prose prose-lg max-w-none mt-8">
            {post.body ? (
              <PortableTextRenderer value={post.body} />
            ) : null}
          </div>

          {/* Categories and Tags */}
          <div className="mt-12 border-t pt-8">
            {post.categories && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Categories</h3>
                <TagList>
                  {post.categories.map((category: any) => (
                    <TagListItem key={"cat_${category._id}"}>{category.title}</TagListItem>
                  ))}
                </TagList>
              </div>
            )}
            {post.tags && (
              <div>
                <h3 className="text-lg font-semibold">Tags</h3>
                <TagList>
                  {post.tags.map((tag: any) => (
                    <TagListItem key={"tag_${tag._id}"}>{tag.title}</TagListItem>
                  ))}
                </TagList>
              </div>
            )}
          </div>
        </FadeIn>
      </article>

      {/* Related Posts Section */}
      {post?.relatedPosts && post?.relatedPosts.length > 0 && (
        <div className="mt-16 pt-12 border-t">
          <h2 className="text-2xl font-bold">Related Posts</h2>
          <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
            {post.relatedPosts.map((relatedPost: any) => (
              <div key={relatedPost._id} className="rounded-lg border p-4">
                <h3 className="font-semibold">{relatedPost.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{relatedPost.excerpt}</p>

                <Button href={`/posts/${relatedPost.slug.current}`} className="mt-4">
                  Read more
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SanityPost;
