import React from 'react'
import clsx from 'clsx'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListWithButtons } from '@/components/grid/GridList'
import {
  GridListItem,
  GridListItemWithButton,
} from '@/components/grid/GridListItem'

interface Feature {
  title: string
  href?: string
  description: string
  description2?: string
}

export interface GridIntroProps {
  eyebrow: string
  title: string
  description: React.ReactNode
  features: Feature[]
  centered?: boolean
  className?: string
  columns?: number
}

export function GridIntro({
  eyebrow,
  title,
  description,
  features,
  centered = false,
  className,
  columns = 3,
}: GridIntroProps) {
  return (
    <Container
      className={clsx(
        'mt-16 sm:mt-24 md:mt-32 lg:mt-40',
        centered && 'text-center',
        className,
      )}
    >
      <FadeIn>
        <div className="mb-16 sm:mb-20 lg:mb-24">
          <h1>
            <span className="font-display block text-sm font-semibold text-emerald-700 sm:text-base dark:text-white">
              {eyebrow}
            </span>
            <span className="sr-only"> - </span>
            <span
              className={clsx(
                'font-display mt-4 block max-w-5xl text-balance text-2xl font-medium tracking-tight text-neutral-950 sm:mt-6 sm:text-2xl md:text-4xl lg:text-5xl',
                centered && 'mx-auto',
              )}
            >
              {title}
            </span>
          </h1>
          <div
            className={clsx(
              'mt-4 max-w-3xl text-lg leading-relaxed text-neutral-600 sm:mt-6 lg:text-xl',
              centered && 'mx-auto',
            )}
          >
            {description}
          </div>
        </div>

        <GridList columns={columns}>
          {features.map(({ title, href, description, description2 }) => (
            <GridListItem key={title} title={title} href={href}>
              {description}
              {description2 && (
                <p className="mt-2 text-sm text-neutral-500">{description2}</p>
              )}
            </GridListItem>
          ))}
        </GridList>
      </FadeIn>
    </Container>
  )
}

export function GridIntroWithButtons({
  eyebrow,
  title,
  description,
  features,
  centered = false,
  className,
  columns = 3,
}: GridIntroProps) {
  return (
    <Container
      className={clsx(
        'mt-16 sm:mt-24 md:mt-32 lg:mt-40',
        centered && 'text-center',
        className,
      )}
    >
      <FadeIn>
        {/* Header Section - Similar to PageIntro but more compact */}
        <div className="mb-16 sm:mb-20 lg:mb-24">
          <h1>
            <span className="font-display block text-sm font-semibold text-emerald-700 sm:text-base dark:text-white">
              {eyebrow}
            </span>
            <span className="sr-only"> - </span>
            <span
              className={clsx(
                'font-display mt-4 block max-w-5xl text-balance text-2xl font-medium tracking-tight text-neutral-950 sm:mt-6 sm:text-2xl md:text-4xl lg:text-5xl',
                centered && 'mx-auto',
              )}
            >
              {title}
            </span>
          </h1>
          <div
            className={clsx(
              'mt-4 max-w-3xl text-lg leading-relaxed text-neutral-600 sm:mt-6 lg:text-xl',
              centered && 'mx-auto',
            )}
          >
            {description}
          </div>
        </div>

        <GridListWithButtons columns={columns}>
          {features.map(({ title, href, description, description2 }) => (
            <GridListItemWithButton key={title} title={title} href={href}>
              {description}
              <br />
              <br />
              {description2}
            </GridListItemWithButton>
          ))}
        </GridListWithButtons>
      </FadeIn>
    </Container>
  )
}
