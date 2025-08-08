// src/components/JsonLdSchema.tsx

import { SanityDocument } from 'next-sanity';

// ... (keep the existing generate functions from your provided code)
export interface FAQ {
  question: string
  answer: string
}

export interface Review {
  author: string
  rating: number
  reviewBody: string
  datePublished?: string
}

export const generateFAQSchema = (faqs: FAQ[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export const generateReviewSchema = (
  reviews: Review[],
  businessName: string,
) => {
  const aggregateRating = {
    '@type': 'AggregateRating',
    ratingValue: (
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    ).toFixed(1),
    reviewCount: reviews.length,
    bestRating: '5',
    worstRating: '1',
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: businessName,
    aggregateRating: aggregateRating,
    review: reviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: review.reviewBody,
      datePublished:
        review.datePublished || new Date().toISOString().split('T')[0],
    })),
  }
}

type JsonLdSchemaProps = {
  post: SanityDocument;
};

export const JsonLdSchema = ({ post }: JsonLdSchemaProps) => {
  if (!post) return null;

  // An array to hold all the schema objects.
  const schemas = [];

  // --- Article Schema ---
  // This is the base schema for the blog post.
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    // ... (the rest of your article schema)
  };
  schemas.push(articleSchema);

  // --- FAQ Schema ---
  // If the post has an FAQ section, generate and add the FAQ schema.
  if (post.faqSection && post.faqSection.length > 0) {
    const allFaqs = post.faqSection.flatMap((group: any) => group.faqs);
    schemas.push(generateFAQSchema(allFaqs));
  }

  // --- Review Schema ---
  // If the post has reviews, generate and add the review schema.
  if (post.reviews && post.reviews.length > 0) {
    schemas.push(generateReviewSchema(post.reviews, 'SeriesLab'));
  }

  // Renders all the generated schemas in a single script tag.
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
};
