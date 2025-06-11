'use cache'

import { Metadata } from 'next'
import { GridIntroWithButtons } from '@/components/grid/GridIntro'
import { ContactSection } from '@/components/ContactSection'
import { RootLayout } from '@/components/RootLayout'

const services_as_features = [
  {
    title: 'Martech Solutions',
    href: '/services/martech-solutions',
    description:
      'Bridging marketing innovation with technical precision, we architect solutions that balance cutting-edge capabilities with operational practicality. From greenfield implementations to optimizing legacy stacks, our experts transform ad hoc processes into scalable marketing engines.',
    description2:
      'Leverage our deep platform expertise (AWS, Azure, GCP, Tealium) to build future-ready Marketing Techonolgy ecosystems that adapt to evolving customer expectations while maximizing ROI.',
  },
  {
    title: 'User Growth',
    href: '/services/user-growth',
    description:
      'Transform growth from abstract theory into measurable outcomes through data-driven strategies tailored to your unique business model. We identify high-potential channels and optimize customer acquisition funnels with precision.',
    description2:
      'Our proprietary growth framework combines proven methodologies with experimental approaches, creating sustainable acquisition pathways that scale with your business maturity.',
  },
  {
    title: 'Attribution Analytics',
    href: '/services/attribution-analytics',
    description:
      'Unlock the complete customer journey with multi-touch attribution that reveals true marketing impact. We connect fragmented data points across channels to expose performance gaps and hidden opportunities.',
    description2:
      'Gain actionable insights through advanced analytics that map customer behavior from first interaction to conversion, enabling strategic allocation of marketing resources.',
  },
  {
    title: 'Fractional CMO',
    href: '/services/fractional-cmo',
    description:
      'Accelerate growth momentum while building long-term marketing leadership capabilities. Our experienced executives deliver immediate strategic direction while creating seamless transitions for permanent hires.',
    description2:
      'We combine executive-level strategy with hands-on execution, documenting processes in real-time to ensure continuity and rapid onboarding for future leaders.',
  },
]

export default async function Services() {
  return (
    <RootLayout>
      <GridIntroWithButtons
        eyebrow="Consulting Services"
        title="Building value starts here."
        description={
          <p>
            Whether you&apos;re a VC-backed startup or private equity portfolio
            company, we provide the strategic expertise and technical
            capabilities to accelerate growth. Our full-spectrum services
            combine industry-leading practices with customized solutions for B2B
            SaaS businesses.
          </p>
        }
        columns={2}
        features={services_as_features}
      />

      <ContactSection
        cta="Ready to transform potential into performance?"
        btn="Schedule a strategy session"
      />
    </RootLayout>
  )
}

export const metadata: Metadata = {
  title: 'B2B SaaS Marketing Services | Data-Driven Growth Solutions',
  description:
    'Delivering measurable growth through integrated Marketing Techonolgy strategy, user acquisition, and analytics. Our proven frameworks accelerate results while building long-term marketing capabilities.',
}
