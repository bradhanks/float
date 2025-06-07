#!/bin/bash

# Rich Snippets Setup Script
# Run this script from your components folder
# Usage: chmod +x setup-rich-snippets.sh && ./setup-rich-snippets.sh

set -e

echo "🚀 Setting up Rich Snippets for your components..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the components folder
if [[ ! $(basename "$PWD") == "components" ]]; then
    echo -e "${RED}❌ Please run this script from the components folder${NC}"
    exit 1
fi

# Create utils folder if it doesn't exist
mkdir -p utils

echo -e "${BLUE}📝 Creating structured data utilities...${NC}"

# Create structured data utility
cat > utils/structuredData.ts << 'EOF'
// Structured Data Utilities for Rich Snippets
export interface FAQ {
  question: string;
  answer: string;
}

export interface Review {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished?: string;
}

export interface LocalBusiness {
  name: string;
  description?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone?: string;
  email?: string;
  url?: string;
  openingHours?: string[];
  priceRange?: string;
  geo?: {
    latitude: number;
    longitude: number;
  };
}

export interface Service {
  name: string;
  description: string;
  provider: string;
  areaServed?: string;
  serviceType?: string;
}

export interface Organization {
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
  contactPoint?: {
    telephone: string;
    contactType: string;
    email?: string;
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

// Generate FAQ Schema
export const generateFAQSchema = (faqs: FAQ[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

// Generate Review Schema
export const generateReviewSchema = (reviews: Review[], businessName: string) => {
  const aggregateRating = {
    "@type": "AggregateRating",
    "ratingValue": (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1),
    "reviewCount": reviews.length,
    "bestRating": "5",
    "worstRating": "1"
  };

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": businessName,
    "aggregateRating": aggregateRating,
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": review.reviewBody,
      "datePublished": review.datePublished || new Date().toISOString().split('T')[0]
    }))
  };
};

// Generate LocalBusiness Schema
export const generateLocalBusinessSchema = (business: LocalBusiness) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": business.name
  };

  if (business.description) schema.description = business.description;
  if (business.telephone) schema.telephone = business.telephone;
  if (business.email) schema.email = business.email;
  if (business.url) schema.url = business.url;
  if (business.priceRange) schema.priceRange = business.priceRange;
  if (business.openingHours) schema.openingHours = business.openingHours;

  if (business.address) {
    schema.address = {
      "@type": "PostalAddress",
      ...business.address
    };
  }

  if (business.geo) {
    schema.geo = {
      "@type": "GeoCoordinates",
      "latitude": business.geo.latitude,
      "longitude": business.geo.longitude
    };
  }

  return schema;
};

// Generate Service Schema
export const generateServiceSchema = (services: Service[]) => {
  return services.map(service => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": service.provider
    },
    "areaServed": service.areaServed || "Worldwide",
    "serviceType": service.serviceType || service.name
  }));
};

// Generate Organization Schema
export const generateOrganizationSchema = (org: Organization) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": org.name,
    "url": org.url
  };

  if (org.logo) schema.logo = org.logo;
  if (org.sameAs) schema.sameAs = org.sameAs;
  if (org.contactPoint) {
    schema.contactPoint = {
      "@type": "ContactPoint",
      ...org.contactPoint
    };
  }

  return schema;
};

// Generate Breadcrumb Schema
export const generateBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

// Utility to inject structured data into head
export const injectStructuredData = (schema: object, id?: string) => {
  if (typeof window !== 'undefined') {
    const existingScript = id ? document.getElementById(id) : null;
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    if (id) script.id = id;
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }
};
EOF

echo -e "${GREEN}✅ Created structured data utilities${NC}"

# Update FAQ component
if [ -f "FAQ.tsx" ]; then
    echo -e "${BLUE}📝 Updating FAQ.tsx with rich snippets...${NC}"

    # Backup original
    cp FAQ.tsx FAQ.tsx.backup

    # Add imports and structured data to FAQ component
    cat > FAQ_temp.tsx << 'EOF'
import React, { useEffect } from 'react';
import { generateFAQSchema, injectStructuredData, FAQ as FAQType } from './utils/structuredData';

// Your existing FAQ component interface
interface FAQProps {
  faqs?: FAQType[];
  title?: string;
  subtitle?: string;
}

const FAQ: React.FC<FAQProps> = ({
  faqs = [
    {
      question: "What services do you offer?",
      answer: "We provide comprehensive web development, consulting, and digital solutions tailored to your business needs."
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on complexity, but most projects are completed within 2-8 weeks."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes, we offer comprehensive maintenance and support packages for all our projects."
    }
  ],
  title = "Frequently Asked Questions",
  subtitle = "Find answers to common questions about our services"
}) => {

  // Inject FAQ structured data
  useEffect(() => {
    const faqSchema = generateFAQSchema(faqs);
    injectStructuredData(faqSchema, 'faq-schema');
  }, [faqs]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 group"
            >
              <summary className="cursor-pointer text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                {faq.question}
              </summary>
              <div className="mt-4 text-gray-600 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
EOF

    mv FAQ_temp.tsx FAQ.tsx
    echo -e "${GREEN}✅ Updated FAQ.tsx with structured data${NC}"
else
    echo -e "${YELLOW}⚠️  FAQ.tsx not found, creating new one...${NC}"
    mv FAQ_temp.tsx FAQ.tsx
fi

# Update Testimonial component
if [ -f "Testimonial.tsx" ]; then
    echo -e "${BLUE}📝 Updating Testimonial.tsx with rich snippets...${NC}"

    cp Testimonial.tsx Testimonial.tsx.backup

    cat > Testimonial_temp.tsx << 'EOF'
import React, { useEffect } from 'react';
import { generateReviewSchema, injectStructuredData, Review } from './utils/structuredData';

interface TestimonialProps {
  reviews?: Review[];
  businessName?: string;
  title?: string;
  subtitle?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({
  reviews = [
    {
      author: "Sarah Johnson",
      rating: 5,
      reviewBody: "Outstanding service and exceptional results. The team exceeded our expectations in every way."
    },
    {
      author: "Mike Davis",
      rating: 5,
      reviewBody: "Professional, reliable, and delivered exactly what we needed. Highly recommend their services."
    },
    {
      author: "Emily Chen",
      rating: 5,
      reviewBody: "Great communication throughout the project. The final product was exactly what we envisioned."
    }
  ],
  businessName = "Your Business Name",
  title = "What Our Clients Say",
  subtitle = "Don't just take our word for it"
}) => {

  // Inject review structured data
  useEffect(() => {
    const reviewSchema = generateReviewSchema(reviews, businessName);
    injectStructuredData(reviewSchema, 'review-schema');
  }, [reviews, businessName]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {renderStars(review.rating)}
                </div>
                <span className="text-sm text-gray-500">({review.rating}/5)</span>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                "{review.reviewBody}"
              </p>

              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {review.author.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">{review.author}</p>
                  <p className="text-sm text-gray-500">Verified Customer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
EOF

    mv Testimonial_temp.tsx Testimonial.tsx
    echo -e "${GREEN}✅ Updated Testimonial.tsx with structured data${NC}"
fi

# Create new Breadcrumbs component
echo -e "${BLUE}📝 Creating Breadcrumbs.tsx component...${NC}"

cat > Breadcrumbs.tsx << 'EOF'
import React, { useEffect } from 'react';
import Link from 'next/link';
import { generateBreadcrumbSchema, injectStructuredData, BreadcrumbItem } from './utils/structuredData';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = "" }) => {

  // Inject breadcrumb structured data
  useEffect(() => {
    const breadcrumbSchema = generateBreadcrumbSchema(items);
    injectStructuredData(breadcrumbSchema, 'breadcrumb-schema');
  }, [items]);

  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}

            {index === items.length - 1 ? (
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                {item.name}
              </span>
            ) : (
              <Link
                href={item.url}
                className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
EOF

echo -e "${GREEN}✅ Created Breadcrumbs.tsx component${NC}"

# Update ContactSection component
if [ -f "ContactSection.tsx" ]; then
    echo -e "${BLUE}📝 Updating ContactSection.tsx with LocalBusiness schema...${NC}"

    cp ContactSection.tsx ContactSection.tsx.backup

    cat > ContactSection_temp.tsx << 'EOF'
import React, { useEffect } from 'react';
import { generateLocalBusinessSchema, injectStructuredData, LocalBusiness } from './utils/structuredData';

interface ContactSectionProps {
  business?: LocalBusiness;
  title?: string;
  subtitle?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  business = {
    name: "Your Business Name",
    description: "Professional web development and consulting services",
    address: {
      streetAddress: "123 Main Street",
      addressLocality: "Salt Lake City",
      addressRegion: "UT",
      postalCode: "84101",
      addressCountry: "US"
    },
    telephone: "+1-801-555-0123",
    email: "hello@yourbusiness.com",
    url: "https://yourbusiness.com",
    openingHours: ["Mo-Fr 09:00-17:00"],
    priceRange: "$$"
  },
  title = "Get In Touch",
  subtitle = "Ready to start your project? Contact us today"
}) => {

  // Inject LocalBusiness structured data
  useEffect(() => {
    const businessSchema = generateLocalBusinessSchema(business);
    injectStructuredData(businessSchema, 'local-business-schema');
  }, [business]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>

              {business.address && (
                <div className="flex items-start space-x-3 mb-4">
                  <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-gray-900 font-medium">Address</p>
                    <p className="text-gray-600">
                      {business.address.streetAddress}<br />
                      {business.address.addressLocality}, {business.address.addressRegion} {business.address.postalCode}
                    </p>
                  </div>
                </div>
              )}

              {business.telephone && (
                <div className="flex items-start space-x-3 mb-4">
                  <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-gray-900 font-medium">Phone</p>
                    <p className="text-gray-600">{business.telephone}</p>
                  </div>
                </div>
              )}

              {business.email && (
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-gray-900 font-medium">Email</p>
                    <p className="text-gray-600">{business.email}</p>
                  </div>
                </div>
              )}
            </div>

            {business.openingHours && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Business Hours</h3>
                <div className="space-y-2">
                  {business.openingHours.map((hours, index) => (
                    <p key={index} className="text-gray-600">{hours}</p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact Form Placeholder */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Send us a message</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
EOF

    mv ContactSection_temp.tsx ContactSection.tsx
    echo -e "${GREEN}✅ Updated ContactSection.tsx with structured data${NC}"
fi

# Update ServiceSection component if it exists
if [ -f "ServiceSection.tsx" ]; then
    echo -e "${BLUE}📝 Updating ServiceSection.tsx with Service schema...${NC}"

    cp ServiceSection.tsx ServiceSection.tsx.backup

    cat > ServiceSection_temp.tsx << 'EOF'
import React, { useEffect } from 'react';
import { generateServiceSchema, injectStructuredData, Service } from './utils/structuredData';

interface ServiceSectionProps {
  services?: Service[];
  title?: string;
  subtitle?: string;
}

const ServiceSection: React.FC<ServiceSectionProps> = ({
  services = [
    {
      name: "Web Development",
      description: "Custom web applications built with modern technologies and best practices",
      provider: "Your Business Name",
      serviceType: "Technology"
    },
    {
      name: "Digital Consulting",
      description: "Strategic guidance to help your business succeed in the digital landscape",
      provider: "Your Business Name",
      serviceType: "Consulting"
    },
    {
      name: "SEO Optimization",
      description: "Improve your search engine rankings and drive more organic traffic",
      provider: "Your Business Name",
      serviceType: "Marketing"
    }
  ],
  title = "Our Services",
  subtitle = "Comprehensive solutions for your digital needs"
}) => {

  // Inject service structured data
  useEffect(() => {
    const serviceSchemas = generateServiceSchema(services);
    serviceSchemas.forEach((schema, index) => {
      injectStructuredData(schema, `service-schema-${index}`);
    });
  }, [services]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.name}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>

              <div className="flex items-center text-sm text-gray-500">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {service.serviceType}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
EOF

    mv ServiceSection_temp.tsx ServiceSection.tsx
    echo -e "${GREEN}✅ Updated ServiceSection.tsx with structured data${NC}"
fi

# Update SocialMedia component if it exists
if [ -f "SocialMedia.tsx" ]; then
    echo -e "${BLUE}📝 Updating SocialMedia.tsx with Organization schema...${NC}"

    cp SocialMedia.tsx SocialMedia.tsx.backup

    cat > SocialMedia_temp.tsx << 'EOF'
import React, { useEffect } from 'react';
import { generateOrganizationSchema, injectStructuredData, Organization } from './utils/structuredData';

interface SocialMediaProps {
  organization?: Organization;
  socialLinks?: { platform: string; url: string; icon?: React.ReactNode }[];
}

const SocialMedia: React.FC<SocialMediaProps> = ({
  organization = {
    name: "Your Business Name",
    url: "https://yourbusiness.com",
    logo: "https://yourbusiness.com/logo.png",
    sameAs: [
      "https://facebook.com/yourbusiness",
      "https://twitter.com/yourbusiness",
      "https://linkedin.com/company/yourbusiness",
      "https://instagram.com/yourbusiness"
    ],
    contactPoint: {
      telephone: "+1-801-555-0123",
      contactType: "customer service",
      email: "hello@yourbusiness.com"
    }
  },
  socialLinks = [
    { platform: "Facebook", url: "https://facebook.com/yourbusiness" },
    { platform: "Twitter", url: "https://twitter.com/yourbusiness" },
    { platform: "LinkedIn", url: "https://linkedin.com/company/yourbusiness" },
    { platform: "Instagram", url: "https://instagram.com/yourbusiness" }
  ]
}) => {

  // Inject organization structured data
  useEffect(() => {
    const orgSchema = generateOrganizationSchema(organization);
    injectStructuredData(orgSchema, 'organization-schema');
  }, [organization]);

  const getSocialIcon = (platform: string) => {
    const iconClass = "w-6 h-6 fill-current";

    switch (platform.toLowerCase()) {
      case 'facebook':
        return (
          <svg className={iconClass} viewBox="0 0 24 24">
            <path d="M24 12.1c0-6.6-5.4-12-12-12s-12 5.4-12 12c0 6 4.4 11 10.1 11.9v-8.4H7.9V12.1h2.2v-1.9c0-2.2 1.3-3.4 3.3-3.4 1 0 2 .2 2 .2v2.2h-1.1c-1.1 0-1.3.5-1.3 1.3v1.6h2.8l-.4 2.5h-2.4V24c5.7-.9 10.1-5.9 10.1-11.9z"/>
          </svg>
        );
      case 'twitter':
        return (
          <svg className={iconClass} viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        );
      case 'linkedin':
        return (
          <svg className={iconClass} viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg className={iconClass} viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        );
      default:
        return (
          <svg className={iconClass} viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        );
    }
  };

  return (
    <div className="flex items-center justify-center space-x-6 py-8">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-500 transition-colors"
          aria-label={`Follow us on ${link.platform}`}
        >
          {link.icon || getSocialIcon(link.platform)}
        </a>
      ))}
    </div>
  );
};

export default SocialMedia;
EOF

echo -e "${GREEN}✅ Updated SocialMedia.tsx with structured data${NC}"
fi

# Create sitemap configuration
echo -e "${BLUE}📝 Creating sitemap configuration...${NC}"

# Go to project root to create sitemap config
cd ..

cat > next-sitemap.config.tsx << 'EOF'
const fs = require('fs');
const path = require('path');

// Function to get file modification time
const getFileLastMod = (filePath) => {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime.toISOString();
  } catch (error) {
    return new Date().toISOString();
  }
};

// Function to get component last modified time
const getComponentLastMod = (componentName) => {
  const componentPath = path.join(process.cwd(), 'src/components', `${componentName}.tsx`);
  return getFileLastMod(componentPath);
};

// Map of pages to their primary components
const pageComponentMap = {
  '/': ['PageIntro', 'FeatureGrid', 'Testimonial'],
  '/about': ['PageIntro', 'SectionIntro'],
  '/contact': ['ContactForm', 'ContactSection'],
  '/services': ['ServiceSection', 'FeatureGrid'],
  '/faq': ['FAQ'],
  '/testimonials': ['Testimonial'],
};

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://yoursite.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  autoLastmod: false,

  transform: async (config, path) => {
    let lastmod = new Date().toISOString();

    if (pageComponentMap[path]) {
      const componentTimes = pageComponentMap[path].map(getComponentLastMod);
      const mostRecent = new Date(Math.max(...componentTimes.map(t => new Date(t))));
      lastmod = mostRecent.toISOString();
    }

    let changefreq = config.changefreq;
    let priority = config.priority;

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.includes('/blog/')) {
      changefreq = 'monthly';
      priority = 0.8;
    } else if (path === '/contact') {
      changefreq = 'monthly';
      priority = 0.9;
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod,
      alternateRefs: config.alternateRefs ?? [],
    };
  },

  additionalPaths: async (config) => {
    const additionalPages = [
      '/privacy-policy',
      '/terms-of-service',
    ];

    return Promise.all(
      additionalPages.map(async (path) => {
        return await config.transform(config, path);
      })
    );
  },

  exclude: [
    '/api/*',
    '/admin/*',
    '/private/*',
    '/_next/*',
    '/404',
    '/500',
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
      },
    ],
    additionalSitemaps: [
      'https://yoursite.com/sitemap.xml',
    ],
  },
};
EOF

echo -e "${GREEN}✅ Created sitemap configuration${NC}"

# Create a README with instructions
cat > components/RICH_SNIPPETS_README.md << 'EOF'
# Rich Snippets Implementation

This setup script has added structured data (rich snippets) to your components for better SEO.

## What was added:

### 1. FAQ Component (`FAQ.tsx`)
- **Schema**: FAQPage
- **Rich Snippet**: FAQ results in search
- **Usage**: Import and use with `faqs` prop

### 2. Testimonial Component (`Testimonial.tsx`)
- **Schema**: Review/AggregateRating
- **Rich Snippet**: Star ratings in search results
- **Usage**: Import and use with `reviews` prop

### 3. ContactSection Component (`ContactSection.tsx`)
- **Schema**: LocalBusiness
- **Rich Snippet**: Business info, hours, location
- **Usage**: Import and use with `business` prop

### 4. ServiceSection Component (`ServiceSection.tsx`)
- **Schema**: Service
- **Rich Snippet**: Services offered
- **Usage**: Import and use with `services` prop

### 5. SocialMedia Component (`SocialMedia.tsx`)
- **Schema**: Organization
- **Rich Snippet**: Social profiles, contact info
- **Usage**: Import and use with `organization` prop

### 6. New Breadcrumbs Component (`Breadcrumbs.tsx`)
- **Schema**: BreadcrumbList
- **Rich Snippet**: Navigation breadcrumbs
- **Usage**: `<Breadcrumbs items={[{name: "Home", url: "/"}]} />`

## How to use:

1. Import the components in your pages
2. Pass appropriate props (or use defaults)
3. Structured data will be automatically injected into `<head>`

## Testing Rich Snippets:

1. Use Google's Rich Results Test: https://search.google.com/test/rich-results
2. Test your URLs after deployment
3. Monitor Google Search Console for rich snippet errors

## Customization:

- Edit the default data in each component
- Use the utility functions in `utils/structuredData.ts`
- Add more schema types as needed

## Backup Files:

Original components were backed up with `.backup` extension before modification.
EOF

cd components

echo -e "${GREEN}✅ Created documentation${NC}"

# Create package.tsxon script if package.tsxon exists in parent
if [ -f "../package.tsxon" ]; then
    echo -e "${BLUE}📝 Adding sitemap script to package.tsxon...${NC}"

    # Check if next-sitemap is installed
    if ! grep -q "next-sitemap" ../package.tsxon; then
        echo -e "${YELLOW}⚠️  Installing next-sitemap...${NC}"
        cd ..
        npm install next-sitemap
        cd components
    fi

    # Add postbuild script if it doesn't exist
    if ! grep -q "postbuild.*next-sitemap" ../package.tsxon; then
        echo -e "${BLUE}Adding sitemap generation script...${NC}"
        # This would need manual addition to package.tsxon scripts section:
        # "postbuild": "next-sitemap"
    fi
fi

echo ""
echo -e "${GREEN}🎉 Rich Snippets Setup Complete!${NC}"
echo ""
echo -e "${BLUE}📋 Summary:${NC}"
echo "   ✅ Created structured data utilities"
echo "   ✅ Updated existing components with rich snippets"
echo "   ✅ Created new Breadcrumbs component"
echo "   ✅ Created sitemap configuration"
echo "   ✅ Backed up original files (.backup extension)"
echo ""
echo -e "${YELLOW}📝 Next Steps:${NC}"
echo "   1. Review and customize the default data in each component"
echo "   2. Add 'postbuild': 'next-sitemap' to your package.tsxon scripts"
echo "   3. Update business information in ContactSection and SocialMedia"
echo "   4. Test rich snippets with Google's Rich Results Test"
echo "   5. Deploy and monitor in Google Search Console"
echo ""
echo -e "${BLUE}📖 Documentation created: RICH_SNIPPETS_README.md${NC}"
echo ""
echo -e "${GREEN}Happy SEO optimization! 🚀${NC}"
