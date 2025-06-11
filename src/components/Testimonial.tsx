import Image, { type ImageProps } from 'next/image'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridPattern } from '@/components/GridPattern'

export function Testimonial({
  children,
  customer,
  rating = 5,
  maxRating = 5,
  className,
}: {
  children: React.ReactNode
  customer: { logo: ImageProps['src']; name: string }
  rating?: number
  maxRating?: number
  className?: string
}) {

  return (
    <div
      className={clsx(
        'relative isolate bg-neutral-50 py-16 sm:py-28 md:py-32',
        className,
      )}
    >
      <GridPattern
        className="mask-[linear-gradient(to_bottom_left,white_50%,transparent_60%)] absolute inset-0 -z-10 h-full w-full fill-neutral-100 stroke-neutral-950/5"
        yOffset={-256}
      />
      <Container>
        <FadeIn>
          <figure className="mx-auto max-w-4xl">
            <blockquote className="font-display relative text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              <p className='before:content-["\""] after:content-["\""] sm:before:absolute sm:before:right-full'>
                {children}
              </p>
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4">
              <Image src={customer.logo} alt={customer.name} unoptimized />
              <div className="flex items-center">
                {[...Array(rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </figcaption>
          </figure>
        </FadeIn>
      </Container>
    </div>
  )
}
