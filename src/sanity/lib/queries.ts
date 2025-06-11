import { defineQuery, groq } from 'next-sanity'

export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)][0...12]{
  _id,
  title,
  slug,
  publishedAt,
  description,
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
}`)

// Get a single post by its slug
export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{
    title, description, mainImage, body
  }`

// Get all post slugs
export const postPathsQuery = groq`*[_type == "post" && defined(slug.current)][]{
    "params": { "slug": slug.current }
  }`
