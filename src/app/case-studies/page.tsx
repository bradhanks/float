import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import AppLayout from '@/components/AppLayout'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { showDrafts } from '@/components/OpenQuestion'
import { PageIntro } from '@/components/PageIntro'
import { loadClientStories } from '@/lib/mdx'

export const metadata: Metadata = {
  title: 'Case studies',
  description:
    'What the problem was, what we did about it and what changed, for B2B SaaS teams from seed to Series A.',
}

export default async function CaseStudies() {
  const studies = (await loadClientStories()).filter(
    (study) => showDrafts() || !study.draft,
  )

  return (
    <AppLayout>
      <PageIntro eyebrow="Case studies" title="How the growth happened">
        <p>
          Each one covers the problem, the approach and the results, with the
          numbers we can share.
        </p>
      </PageIntro>

      <Container className="mt-16 sm:mt-20">
        {studies.length === 0 ? (
          <p className="text-lg text-neutral-600">
            New case studies are on the way.
          </p>
        ) : (
          <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {studies.map((study) => (
              <FadeIn key={study.href} className="flex">
                <article className="relative flex w-full flex-col rounded-3xl border border-neutral-200 p-8 transition hover:border-neutral-950 sm:p-10">
                  <div className="flex items-center gap-x-4">
                    <Image
                      src={study.logo}
                      alt=""
                      className="h-10 w-10 flex-none"
                      unoptimized
                    />
                    <p className="text-sm font-semibold text-neutral-950">
                      {study.client}
                    </p>
                    <p className="ml-auto text-sm text-neutral-500">
                      {study.years}
                    </p>
                  </div>
                  {study.draft && (
                    <p className="mt-6 w-fit rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
                      Draft, only visible on previews
                    </p>
                  )}
                  <h2 className="font-display mt-6 text-2xl font-medium text-neutral-950">
                    <Link href={study.href}>
                      <span className="absolute inset-0 rounded-3xl" />
                      {study.title}
                    </Link>
                  </h2>
                  <p className="mt-4 text-base text-neutral-600">
                    {study.description}
                  </p>
                  {study.stats[0] && (
                    <div className="mt-auto pt-8">
                      <p className="border-l border-emerald-500 pl-4">
                        <span className="font-display block text-3xl font-semibold text-neutral-950">
                          {study.stats[0].value}
                        </span>
                        <span className="text-sm text-neutral-600">
                          {study.stats[0].label}
                        </span>
                      </p>
                    </div>
                  )}
                </article>
              </FadeIn>
            ))}
          </FadeInStagger>
        )}
      </Container>

      <ContactSection />
    </AppLayout>
  )
}
