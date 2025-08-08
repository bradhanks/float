import { defineQuery, groq } from 'next-sanity';

export const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)][0...12]{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage{
    asset->{
      _id,
      url
    },
    alt,
    hotspot,
    crop
  },
  author->{
    _id,
    name,
    slug,
    image->{
      asset->{
        _id,
        url
      },
      alt,
      hotspot,
      crop
    },
    bio
  },
  categories[]->{
    _id,
    title,
    slug
  },
  body[0...2]{
    ...,
    _type == "block" => {
      children[0]{
        text
      }
    }
  }
}`);

// Query to get a single post by its slug.
// `$slug` is a parameter that will be passed into the query when it's executed.

// Get a single post by its slug, including author details.
export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  excerpt,
  "slug": slug.current,
  mainImage,
  body,
  publishedAt,
  updatedAt,
  status,
  featured,
  sticky,
  readingTime,
  author->{
    name,
    "slug": slug.current,
    image,
    bio
  },
  coAuthors[]->{
    name,
    "slug": slug.current,
    image
  },
  categories[]->{
    title,
    "slug": slug.current
  },
  tags[]->{
    title,
    "slug": slug.current
  },
  relatedPosts[]->{
    title,
    "slug": slug.current,
    excerpt
  },
  seo,
  "imageUrl": mainImage.asset->url
}`;

// Query to get all post slugs. This is used by `generateStaticParams`
// to know which pages to pre-build.
export const postPathsQuery = groq`*[_type == "post" && defined(slug.current)][]{
"params": { "slug": slug.current }
}`;


// Query to get all post slugs for a given category.
// This is used by `generateStaticParams' to know which pages to pre-build.
export const categoryPathsQuery = groq`*[_type == "post" && defined(slug.current) && references(*[_type == "category" && slug.current == $categorySlug]._id)]{
  "params": { "slug": slug.current }
}`;

// Query to get all post slugs for a given tag.
// This is used by `generateStaticParams` to know which pages to pre-build.
export const tagPathsQuery = groq`*[_type == "post" && defined(slug.current) && references(*[_type == "tag" && slug.current == $tagSlug]._id)]{
  "params": { "slug": slug.current }
}`;

export const caseStudyPathsQuery = groq`*[_type == "caseStudy" && defined(slug.current)][]{
  "params": { "slug": slug.current }
}`;



export const caseStudyQuery = groq`*[_type == "caseStudy" && slug.current == $slug][0]{
  _id,
  title,
  summary,
  slug,
  mainImage,
  body,
  publishedAt,
  updatedAt,
  status,
  featured,
  sticky,
  readingTime,
  author->{
    name,
    "slug": slug.current,
    image,
    bio
  },
  coAuthors[]->{
    name,
    "slug": slug.current,
    image
  }
}`;
