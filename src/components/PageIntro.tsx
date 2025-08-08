import clsx from 'clsx'
import dynamic from 'next/dynamic'
import type { RefObject } from 'react'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'


export function PageIntro({
  eyebrow,
  title,
  children,
  centered = false,
  ref
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
  centered?: boolean
  ref?: RefObject<HTMLInputElement>
}) {
  return (
    <Container
      className={clsx(
        'mt-8 sm:mt-12 md:mt-16 lg:mt-20',
        centered && 'text-center',
      )}
      {...(ref ? { ref } : {})}
    >
      <FadeIn>
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
          {children}
        </div>
      </FadeIn>
    </Container>
  )
}
