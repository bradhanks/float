// Structured Data Utilities for Rich Snippets
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

export interface LocalBusiness {
  name: string
  description?: string
  address?: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  telephone?: string
  email?: string
  url?: string
  openingHours?: string[]
  priceRange?: string
  geo?: {
    latitude: number
    longitude: number
  }
}

export interface Service {
  name: string
  description: string
  provider: string
  areaServed?: string
  serviceType?: string
}

export interface Organization {
  name: string
  url: string
  logo?: string
  sameAs?: string[]
  contactPoint?: {
    telephone: string
    contactType: string
    email?: string
  }
}

export interface BreadcrumbItem {
  name: string
  url: string
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

export const generateLocalBusinessSchema = (business: LocalBusiness) => {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
  }

  if (business.description) schema.description = business.description
  if (business.telephone) schema.telephone = business.telephone
  if (business.email) schema.email = business.email
  if (business.url) schema.url = business.url
  if (business.priceRange) schema.priceRange = business.priceRange
  if (business.openingHours) schema.openingHours = business.openingHours

  if (business.address) {
    schema.address = {
      '@type': 'PostalAddress',
      ...business.address,
    }
  }

  if (business.geo) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    }
  }

  return schema
}

export const generateServiceSchema = (services: Service[]) => {
  return services.map((service) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: service.provider,
    },
    areaServed: service.areaServed || 'Worldwide',
    serviceType: service.serviceType || service.name,
  }))
}

export const generateOrganizationSchema = (org: Organization) => {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    url: org.url,
  }

  if (org.logo) schema.logo = org.logo
  if (org.sameAs) schema.sameAs = org.sameAs
  if (org.contactPoint) {
    schema.contactPoint = {
      '@type': 'ContactPoint',
      ...org.contactPoint,
    }
  }

  return schema
}

export const generateBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export const injectStructuredData = (schema: object, id?: string) => {
  const existingScript = id ? document.getElementById(id) : null
  if (existingScript) {
    existingScript.remove()

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    if (id) script.id = id
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)
  }
}
