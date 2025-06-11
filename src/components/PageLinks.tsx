import Link from 'next/link'
import clsx from 'clsx'

import { Border } from '@/components/Border'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridPattern } from '@/components/GridPattern'
import { SectionIntro } from '@/components/SectionIntro'
import { formatDate } from '@/lib/formatDate'
import { DynamicIcon } from '@/components/Icon'
interface Page {
  href: string
  date: string
  title: string
  description: string
}

export function ReadMoreLink({
  page,
  cta = 'CTA',
}: {
  page: Page
  cta?: string
}) {
  return (
    <Link
      href={page.href}
      className="group mt-6 flex gap-x-3 text-base font-semibold text-neutral-950 transition hover:opacity-80"
      aria-label={`Read more: ${page.title}`}
    >
      {cta}

      <DynamicIcon
        name="ArrowLongRightIcon"
        className="duration-50 flex-none self-center fill-current transition-transform group-hover:translate-x-0.5"
        ariaHidden
      />
      <span className="absolute inset-0" />
    </Link>
  )
}

export function PageLink({ page }: { page: Page }) {
  return (
    <article key={page.href}>
      <Border
        position="left"
        className="relative flex flex-col items-start pl-8"
      >
        <h3 className="mt-6 text-base font-semibold text-neutral-950">
          {page.title}
        </h3>
        <time
          dateTime={page.date}
          className="order-first text-sm text-neutral-600"
        >
          {formatDate(page.date)}
        </time>
        <p className="mt-2.5 text-base text-neutral-600">{page.description}</p>
        <Link
          href={page.href}
          className="group mt-6 flex gap-x-3 text-base font-semibold text-neutral-950 transition hover:opacity-80"
          aria-label={`Read more: ${page.title}`}
        >
          Read more
          <DynamicIcon
            name="ArrowLongRightIcon"
            className="duration-50 flex-none self-center fill-current transition-transform group-hover:translate-x-0.5"
            ariaHidden
          />
          <span className="absolute inset-0" />
        </Link>
      </Border>
    </article>
  )
}

export function PageLinks({
  title,
  pages,
  intro,
  className,
}: {
  title: string
  pages: Array<Page>
  intro?: string
  className?: string
}) {
  return (
    <div className={clsx('relative pt-24 sm:pt-32 lg:pt-40', className)}>
      <div className="rounded-t-4xl bg-linear-to-b absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden from-neutral-50">
        <GridPattern
          className="mask-[linear-gradient(to_bottom_left,white_40%,transparent_50%)] absolute inset-0 h-full w-full fill-neutral-100 stroke-neutral-950/5"
          yOffset={-270}
        />
      </div>

      <SectionIntro title={title} smaller>
        {intro && <p>{intro}</p>}
      </SectionIntro>

      <Container className={intro ? 'mt-24' : 'mt-16'}>
        <FadeInStagger className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          {pages.map((page) => (
            <FadeIn key={page.href}>
              <PageLink page={page} />
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </div>
  )
}
