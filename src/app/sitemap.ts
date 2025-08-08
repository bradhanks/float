// src/app/sitemap.ts

import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';
import { postPathsQuery } from '@/sanity/lib/queries';
import groq from 'groq';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.seedtoseries.com';

  // Fetch all post slugs and their updated dates.
  const posts = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)]{
      "slug": slug.current,
      "lastModified": coalesce(updatedAt, _updatedAt)
    }`
  );

  const postUrls = posts.map((post: any) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.lastModified),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    // Add other static pages here
    ...postUrls,
  ];
}
