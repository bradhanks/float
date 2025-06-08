import { useEffect } from 'react'
import {
  generateReviewSchema,
  injectStructuredData,
} from '@/utils/structuredData'

export function useInjectReviewSchema({
  companyName,
  rating,
  maxRating,
  authorName,
  reviewText,
}: {
  companyName: string
  rating: number
  maxRating: number
  authorName: string
  reviewText: string
}) {
  useEffect(() => {
    const schema = generateReviewSchema(
      companyName,
      rating,
      maxRating,
      authorName,
      reviewText,
    )
    injectStructuredData(schema)
  }, [companyName, rating, maxRating, authorName, reviewText])
}
