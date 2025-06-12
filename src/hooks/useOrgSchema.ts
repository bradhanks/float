import { useEffect, useState } from 'react'
import { generateOrganizationSchema } from '@/utils/structuredData'

export function useOrgSchema() {
  const [orgSchema, setOrgSchema] = useState<object | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return // Only run on client

    const generatedSchema = generateOrganizationSchema({
      name: 'SeriesLab',
      url: 'https://serieslab.com',
      logo: 'https://serieslab.com/logo.png',
      phone: '+1-555-0123',
      socialMedia: [
        'https://twitter.com/serieslab',
        'https://linkedin.com/company/serieslab',
      ],
    })

    setOrgSchema(generatedSchema)
  }, [orgSchema])
  return orgSchema
}
