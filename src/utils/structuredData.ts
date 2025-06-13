// utils/structuredData.ts
export interface FAQSchema {
  '@context': 'https://schema.org'
  '@type': 'FAQPage'
  mainEntity: Array<{
    '@type': 'Question'
    name: string
    acceptedAnswer: {
      '@type': 'Answer'
      text: string
    }
  }>
}

export interface ReviewSchema {
  '@context': 'https://schema.org'
  '@type': 'Review'
  itemReviewed: {
    '@type': 'Organization'
    name: string
  }
  reviewRating: {
    '@type': 'Rating'
    ratingValue: string
    bestRating: string
  }
  author: {
    '@type': 'Person'
    name: string
  }
  reviewBody: string
}

export interface LocalBusinessSchema {
  '@context': 'https://schema.org'
  '@type': 'ProfessionalService'
  name: string
  image: string[]
  '@id': string
  url: string
  telephone: string
  address: {
    '@type': 'PostalAddress'
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  openingHoursSpecification: Array<{
    '@type': 'OpeningHoursSpecification'
    dayOfWeek: string[]
    opens: string
    closes: string
  }>
  sameAs: string[]
}

export interface ServiceSchema {
  '@context': 'https://schema.org'
  '@type': 'Service'
  name: string
  description: string
  provider: {
    '@type': 'Organization'
    name: string
  }
  areaServed: string
  serviceType: string
}

export interface OrganizationSchema {
  '@context': 'https://schema.org'
  '@type': 'Organization'
  name: string
  url: string
  logo: string
  contactPoint: {
    '@type': 'ContactPoint'
    telephone: string
    contactType: string
  }
  sameAs: string[]
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>,
): FAQSchema {
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

export function generateReviewSchema(
  companyName: string,
  rating: number,
  maxRating: number,
  authorName: string,
  reviewText: string,
): ReviewSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Organization',
      name: companyName,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating.toString(),
      bestRating: maxRating.toString(),
    },
    author: {
      '@type': 'Person',
      name: authorName,
    },
    reviewBody: reviewText,
  }
}

export function generateLocalBusinessSchema(businessData: {
  name: string
  images: string[]
  url: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  hours: Array<{
    days: string[]
    open: string
    close: string
  }>
  socialMedia: string[]
}): LocalBusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: businessData.name,
    image: businessData.images,
    '@id': businessData.url,
    url: businessData.url,
    telephone: businessData.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessData.address.street,
      addressLocality: businessData.address.city,
      addressRegion: businessData.address.state,
      postalCode: businessData.address.zip,
      addressCountry: businessData.address.country,
    },
    openingHoursSpecification: businessData.hours.map((hour) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hour.days,
      opens: hour.open,
      closes: hour.close,
    })),
    sameAs: businessData.socialMedia,
  }
}

export function generateServiceSchema(
  serviceName: string,
  description: string,
  providerName: string,
  areaServed: string,
  serviceType: string,
): ServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: description,
    provider: {
      '@type': 'Organization',
      name: providerName,
    },
    areaServed: areaServed,
    serviceType: serviceType,
  }
}

export function generateOrganizationSchema(orgData: {
  name: string
  url: string
  logo: string
  phone: string
  socialMedia: string[]
}): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: orgData.name,
    url: orgData.url,
    logo: orgData.logo,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: orgData.phone,
      contactType: 'customer service',
    },
    sameAs: orgData.socialMedia,
  }
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

export function injectStructuredData(schema: any) {
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.text = JSON.stringify(schema)
  document.head.appendChild(script)
}
