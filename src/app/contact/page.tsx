import { type Metadata } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const Border = dynamic(() => import('@/components/Border'))
const Container = dynamic(() =>
  import('@/components/Container').then((mod) => mod.Container),
)
const FadeIn = dynamic(() =>
  import('@/components/FadeIn').then((mod) => mod.FadeIn),
)
const PageIntro = dynamic(() =>
  import('@/components/PageIntro').then((mod) => mod.PageIntro),
)
const ContactForm = dynamic(() => import('@/components/ContactForm'))
const QuickContact = dynamic(() =>
  import('@/components/QuickContact').then((mod) => mod.QuickContact),
)
const Offices = dynamic(() =>
  import('@/components/Offices').then((mod) => mod.Offices),
)
const AppLayout = dynamic(() =>
  import('@/components/AppLayout')
)

function ContactDetails() {
  return (
    <FadeIn>
      <h2 className="font-display text-base font-semibold text-neutral-950">
        Our offices
      </h2>
      <p className="mt-6 text-base text-neutral-600">
        Prefer doing things in person?
      </p>

      <Offices className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2" />

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Email us
        </h2>
        <dl className="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
          {[
            ['General Inquires', 'admin@seedtoseries.com'],
            ['Press', 'press@seedtoseries.com'],
          ].map(([label, email]) => (
            <div key={email}>
              <dt className="font-semibold text-neutral-950">{label}</dt>
              <dd>
                <Link
                  href={`mailto:${email}`}
                  className="text-neutral-600 hover:text-neutral-950"
                >
                  {email}
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      </Border>

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950"></h2>
        <QuickContact className="mt-6" />
      </Border>
    </FadeIn>
  )
}

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Let&apos;s work together. We can&apos;t wait to hear from you.',
}

export default function Contact() {
  return (
    <AppLayout>
      <PageIntro eyebrow="Let's talk." title="Contact us">
        <p>We can&apos;t wait to hear from you.</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactForm />
          <ContactDetails />
        </div>
      </Container>
    </AppLayout>
  )
}
