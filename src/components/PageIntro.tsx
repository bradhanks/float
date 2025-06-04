import clsx from 'clsx'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

export function PageIntro({
  eyebrow,
  title,
  children,
  centered = false,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
  centered?: boolean
}) {
  return (
    <Container
      className={clsx(
        'mt-16 sm:mt-24 md:mt-32 lg:mt-40',
        centered && 'text-center'
      )}
    >
      <FadeIn>
        <h1>
          <span
            className="font-display block text-sm sm:text-base font-semibold dark:text-white text-emerald-700"
          >
            {eyebrow}
          </span>
          <span className="sr-only"> - </span>
          <span
            className={clsx(
              'font-display mt-4 sm:mt-6 block max-w-5xl text-balance text-2xl sm:text-2xl md:text-4xl lg:text-5xl font-medium tracking-tight text-neutral-950',
              centered && 'mx-auto'
            )}
          >
            {title}
          </span>
        </h1>
        <div
          className={clsx(
            'mt-4 sm:mt-6 max-w-3xl text-lg lg:text-xl leading-relaxed text-neutral-600',
            centered && 'mx-auto'
          )}
        >
          {children}
        </div>
      </FadeIn>
    </Container>
  )
}
