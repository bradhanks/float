import { type Metadata } from 'next'
import { ContactSection } from '@/components/ContactSection'
import { PageIntro } from '@/components/PageIntro'
import FeatureGrid from '@/components/FeatureGrid'
import { RootLayout } from '@/components/RootLayout'

const services_as_features = [
  {
    title: 'Forum',
    description:
      'The first part of any partnership is getting our designer to put your logo in our template. The second step is getting them to do the colors.',
  },
  {
    title: 'UGC',
    description:
      'We pride ourselves on never missing a deadline which is easy because most of the work was done years ago.',
  },
  {
    title: 'SEO',
    description:
      'Every business has unique needs and our greatest challenge is shoe-horning those needs into something we already built.',
  },
  {
    title: 'Paid Search',
    description:
      'We are transparent about all of our processes, banking on the simple fact our clients never actually read anything.',
  },
  {
    title: 'Loyal',
    description:
      'We foster long-term relationships with our clients that go beyond just delivering a product, allowing us to invoice them for decades.',
  },
  {
    title: 'Innovative',
    description:
      'The technological landscape is always evolving and so are we. We are constantly on the lookout for new open source projects to clone.',
  },
]

export default function Services() {
  return (
    <RootLayout>
      <PageIntro
        eyebrow="User Growth"
        title="We are shameless about growing revenue."
      >
        <p>
          Series-A VC funds are demanding, so there&apos;s no shame in a bridge
          round to find product-market fit — except yes.
          <span className="text-emerald-700">
            {' '}
            Let&apos;s get shameless
          </span>{' '}
          with paying user growth.
        </p>
      </PageIntro>

      <FeatureGrid features={services_as_features} />

      <ContactSection cta="Traction is one click away." btn="Schedule call" />
    </RootLayout>
  )
}

export const metadata: Metadata = {
  title: 'B2B SaaS Marketing Services',
  description:
    'We believe in efficiency and maximizing our resources to provide the best value to our clients.',
}
