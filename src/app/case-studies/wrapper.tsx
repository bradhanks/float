import Image from 'next/image'
import Link from 'next/link'

import AppLayout from '@/components/AppLayout'
import { Blockquote } from '@/components/Blockquote'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { showDrafts } from '@/components/OpenQuestion'
import { type ClientStory, type MDXEntry, loadClientStories } from '@/lib/mdx'

const sections = [
  'Executive Summary',
  'Background',
  'The Problem',
  'The Approach',
  'Results',
]

function anchor(heading: string) {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

export default async function CaseStudyLayout({
  caseStudy,
  children,
}: {
  caseStudy: MDXEntry<ClientStory>
  children: React.ReactNode
}) {
  const others = (await loadClientStories())
    .filter(({ metadata }) => metadata !== caseStudy)
    .filter((study) => showDrafts() || !study.draft)
    .slice(0, 2)

  return (
    <AppLayout>
      {caseStudy.draft && showDrafts() && (
        <div className="border-b border-amber-200 bg-amber-50">
          <Container className="py-3 text-sm text-amber-900">
            Draft preview. Highlighted notes are open questions and do not
            appear on the live site.
          </Container>
        </div>
      )}

      <article>
        <header>
          <Container className="mt-16 sm:mt-24 lg:mt-32">
            <FadeIn>
              <Link
                href="/case-studies"
                className="text-sm font-semibold text-emerald-700 hover:text-emerald-900"
              >
                Case studies
              </Link>
              <div className="mt-8 flex items-center gap-x-4">
                <Image
                  src={caseStudy.logo}
                  alt=""
                  className="h-12 w-12 flex-none"
                  unoptimized
                />
                <p className="font-display text-lg font-semibold text-neutral-950">
                  {caseStudy.client}
                </p>
              </div>
              <h1 className="font-display mt-6 max-w-4xl text-4xl font-medium tracking-tight text-balance text-neutral-950 sm:text-5xl">
                {caseStudy.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg text-neutral-600 sm:text-xl">
                {caseStudy.description}
              </p>
            </FadeIn>
          </Container>

          <div className="mt-16 bg-neutral-950 py-12 sm:mt-20 sm:py-16">
            <Container>
              <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                {caseStudy.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col border-l border-emerald-400 pl-6"
                  >
                    <dt className="text-sm text-neutral-300">{stat.label}</dt>
                    <dd className="font-display order-first text-3xl font-semibold text-white sm:text-4xl">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Container>
          </div>
        </header>

        <Container className="mt-16 sm:mt-24">
          <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12">
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-8">
                <dl className="space-y-6 text-sm">
                  <div>
                    <dt className="font-semibold text-neutral-950">Company</dt>
                    <dd className="mt-1 text-neutral-600">{caseStudy.client}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-neutral-950">Years</dt>
                    <dd className="mt-1 text-neutral-600">{caseStudy.years}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-neutral-950">Role</dt>
                    <dd className="mt-1 text-neutral-600">{caseStudy.role}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-neutral-950">
                      What we did
                    </dt>
                    <dd className="mt-1 text-neutral-600">
                      <ul role="list" className="space-y-1">
                        {caseStudy.services.map((service) => (
                          <li key={service}>{service}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
                <nav
                  aria-label="On this page"
                  className="mt-10 hidden border-t border-neutral-200 pt-6 lg:block"
                >
                  <p className="text-sm font-semibold text-neutral-950">
                    On this page
                  </p>
                  <ul role="list" className="mt-3 space-y-2 text-sm">
                    {sections.map((section) => (
                      <li key={section}>
                        <a
                          href={`#${anchor(section)}`}
                          className="text-neutral-600 hover:text-neutral-950"
                        >
                          {section}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            <div className="lg:col-span-9">
              <div className="max-w-3xl [&_.typography]:text-lg [&_.typography]:leading-8 [&_.typography>:first-child]:mt-0 [&_h2]:scroll-mt-8 [&_.footnotes]:mt-16 [&_.footnotes]:border-t [&_.footnotes]:border-neutral-200 [&_.footnotes]:pt-8 [&_.footnotes]:text-sm [&_.footnotes]:leading-6 [&_.footnotes]:text-neutral-600 [&_.footnotes_li]:mt-2 [&_sup_a]:text-emerald-700">
                {children}
              </div>

              {caseStudy.testimonial && (
                <Blockquote
                  author={caseStudy.testimonial.author}
                  className="mt-20 max-w-3xl"
                >
                  {caseStudy.testimonial.content}
                </Blockquote>
              )}
            </div>
          </div>
        </Container>
      </article>

      {others.length > 0 && (
        <Container className="mt-24 sm:mt-32">
          <h2 className="font-display text-2xl font-semibold text-neutral-950">
            More case studies
          </h2>
          <ul
            role="list"
            className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2"
          >
            {others.map((study) => (
              <li key={study.href}>
                <Link
                  href={study.href}
                  className="block rounded-3xl border border-neutral-200 p-8 transition hover:border-neutral-950"
                >
                  <p className="text-sm font-semibold text-emerald-700">
                    {study.client}
                  </p>
                  <p className="font-display mt-3 text-xl font-medium text-neutral-950">
                    {study.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      )}

      <ContactSection />
    </AppLayout>
  )
}
