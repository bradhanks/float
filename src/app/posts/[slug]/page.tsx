// src/app/posts/[slug]/page.tsx

// --- Imports ---
// These lines import all the necessary components and functions.
import { postPathsQuery, postQuery } from '@/sanity/lib/queries';
import { draftMode } from "next/headers";
import { sanityFetch } from '@/sanity/lib/live';
import { client } from '@/sanity/lib/client';
import SanityPost from '@/components/SanityPost';
import AppLayout from '@/components/AppLayout';
import { Container } from '@/components/Container';
import { FadeIn } from '@/components/FadeIn';
import { ContactSection } from '@/components/ContactSection';
import { Metadata } from 'next';


// --- Revalidation Setting ---
// This tells Next.js to re-generate the page at most once every 60 seconds.
export const revalidate = 60;

// --- Static Page Generation ---
// This function fetches all blog post slugs at build time so Next.js can
// pre-render each page for better performance.
export async function generateStaticParams() {
  const posts = await client.fetch(postPathsQuery);
  return posts;
}

// --- NEW: generateMetadata Function ---
// This function dynamically generates metadata for each post page.
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const result = await sanityFetch({ query: postQuery, params });

  const post = result?.data;
  if (!post) {
    return {
      title: 'Post not found',
      description: 'This post could not be found.',
    };
  }

  // Returns a comprehensive metadata object.
  return {
    title: post.title,
    description: post.excerpt,
    // Open Graph metadata for social sharing.
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      url: `https://www.seedtoseries.com/posts/${post.slug}`,
      images: [
        {
          url: post.imageUrl,
        },
      ],
    },
    // Twitter card metadata.
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
    },
  };
}

// --- Page Component ---
// This is the main component for the blog post page. It receives the `slug`
// from the URL as a parameter.
// --- Page Component ---
const PostPage = async ({ params }: { params: { slug: string } }) => {
  const { data: post } = await sanityFetch({
    query: postQuery,
    params: { slug: params.slug },
  });

  return (
    <AppLayout>
      <Container className="mt-24 sm:mt-32 lg:mt-40 max-w-2xl">
        <FadeIn>
          <SanityPost post={post} />
        </FadeIn>
      </Container>
      <ContactSection />
    </AppLayout>
  );
};

export default PostPage;
