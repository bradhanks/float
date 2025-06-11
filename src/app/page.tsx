'use cache'

import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { TravelingImage } from '@/components/TravelingImage'
import { Testimonial } from '@/components/Testimonial'
import imagePostLucid from '@/images/post-lucid.jpg'
import { type CaseStudy, type MDXEntry, loadCaseStudies } from '@/lib/mdx'
import { RootLayout } from '@/components/RootLayout'
import { ListCustomers, customers } from '@/lib/customers'

function Customers() {
  return (
    <div className="rounded-4xl mt-24 bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="font-display text-center text-sm font-semibold tracking-wider text-white sm:text-left">
            B2B SaaS industry leaders start as B2B SaaS seed-stage startups.
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
          >
            <ListCustomers customers={customers} />
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}

function CaseStudies({
  caseStudies,
}: {
  caseStudies: Array<MDXEntry<CaseStudy>>
}) {
  return (
    <>
      <SectionIntro
        title="Getting down to brass tacks with B2B SaaS startups."
        eyebrow="Case Studies"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          If you are an early-stage B2B SaaS startup, we&apos;re confident
          we&apos;ve delivered results for a startup like yours.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <FadeIn key={caseStudy.href} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  <Link href={caseStudy.href}>
                    <span className="absolute inset-0 rounded-3xl" />
                    <Image
                      src={caseStudy.logo}
                      alt={caseStudy.client}
                      className="h-16 w-16"
                      unoptimized
                    />
                  </Link>
                </h3>
                <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                  <span className="font-semibold">{caseStudy.client}</span>

                  <span className="text-emerald-200" aria-hidden="true">
                    /
                  </span>
                  <span>Case study</span>
                </p>
                <p className="font-display mt-6 text-2xl font-semibold text-neutral-950">
                  {caseStudy.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {caseStudy.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}

function Services() {
  return (
    <>
      <SectionIntro
        eyebrow="Services"
        title="Maximum B2B SaaS startup valuation without the rigmarole."
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          As long as those opportunities involve giving us money to re-purpose
          old projects — we can come up with an endless number of those.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-135 lg:w-180 flex-none">
              <TravelingImage
                alt=""
                src={imagePostLucid}
                sizes="(max-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="lg:min-w-132 mt-16 lg:mt-0 lg:w-1/2 lg:pl-4">
            <ListItem title="Martech Solutions">
              Tech stack audits, integrations, and scalable implementations—from
              vanilla setups to complex AI/ML-driven systems. We specialise in
              crafting beautiful, high quality marketing pages. The rest of the
              website will be a shell that uses lorem ipsum everywhere.
            </ListItem>
            <ListItem title="User Growth">
              Demand generation, SEM, and lifecycle marketing to accelerate
              traction.We specialise in crafting beautiful, high quality
              marketing pages. The rest of the website will be a shell that uses
              lorem ipsum everywhere.
            </ListItem>
            <ListItem title="Attribution Analytics">
              Cradle-to-grave metrics to prove ROI and attract investors.We
              specialise in crafting beautiful, high quality marketing pages.
              The rest of the website will be a shell that uses lorem ipsum
              everywhere.
            </ListItem>
            <ListItem title="Fractional CMO">
              Hands-on leadership for startups needing a revenue-focused
              marketing strategist.We specialise in crafting beautiful, high
              quality marketing pages. The rest of the website will be a shell
              that uses lorem ipsum everywhere.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}

export const metadata: Metadata = {
  title: 'B2B SaaS Martech Consulting',
  description:
    'B2B SaaS marketing consultancy specializing in startups from Day 0 to Series A.',
}

export default async function Home() {
  const caseStudies = (await loadCaseStudies()).slice(0, 3)

  return (
    <RootLayout>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-balance text-5xl font-medium tracking-tight text-neutral-950 sm:text-7xl">
            B2B SaaS startup <span className="text-emerald-700">valuation</span>{' '}
            consulting
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            We deliver on this promise —{' '}
            <span className="text-emerald-700">
              superior terms on your next funding round.
            </span>
            <br />
            Bring your team, technology and learnings. We can help with
            traction, user growth and nailing down the unit economics of your
            business model.
          </p>
        </FadeIn>
      </Container>

      <Customers />
      <Services />
      <CaseStudies caseStudies={caseStudies} />
      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        customer={{
          name: customers.lucid.name,
          logo: customers.lucid.logoLight,
        }}
      >
        The team at SeriesLab went above and beyond with our onboarding, even
        finding a way to access the user&apos;s microphone without triggering
        one of those annoying permission dialogs.
      </Testimonial>

      <ContactSection />
    </RootLayout>
  )
}
