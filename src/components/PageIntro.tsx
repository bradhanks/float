import clsx from 'clsx'
import dynamic from 'next/dynamic'

const Container = dynamic(() =>
  import('@/components/Container').then((mod) => mod.Container),
)
const FadeIn = dynamic(() =>
  import('@/components/FadeIn').then((mod) => mod.FadeIn),
)

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
        centered && 'text-center',
      )}
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
