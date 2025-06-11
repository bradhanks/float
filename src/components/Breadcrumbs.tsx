import React, { useEffect } from 'react'
import Link from 'next/link'
import {
  generateBreadcrumbSchema,
  injectStructuredData,
  BreadcrumbItem,
} from './utils/structuredData'

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
  items: BreadcrumbItem[]
  className?: string
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  // Inject breadcrumb structured data
  useEffect(() => {
    const breadcrumbSchema = generateBreadcrumbSchema(items)
    injectStructuredData(breadcrumbSchema, 'breadcrumb-schema')
  }, [items])

  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <svg
                className="h-6 w-6 text-gray-400"
                className="h-6 w-6 text-gray-400"
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
  )
}
  )
}

export default Breadcrumbs
export default Breadcrumbs
