import React from 'react';
import { Container } from '@/components/Container';
import { FadeIn } from '@/components/FadeIn';
import { TravelingImage } from '@/components/TravelingImage';
import type { StaticImageData } from 'next/image';



interface SectionProps {
  title: string
  image: { src: StaticImageData; shape?: number }
  children: React.ReactNode
}

export default function Section({ title, image, children }: SectionProps) {
  return (
    <Container className="group/section [counter-increment:section]">
      <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
        <div className="flex justify-center">
          <FadeIn className="w-135 lg:w-180 flex-none">
            <TravelingImage
              alt=""
              {...image}
              sizes="(min-width: 1024px) 41rem, 31rem"
              className="justify-center lg:justify-end lg:group-even/section:justify-start"
            />
          </FadeIn>
        </div>
        <div className="lg:w-148 mt-12 lg:mt-0 lg:flex-none lg:group-even/section:order-first">
          <FadeIn>
            <div
              className="font-display text-base font-semibold before:text-neutral-300 before:content-['/_'] after:text-neutral-950 after:content-[counter(section,decimal-leading-zero)]"
              aria-hidden="true"
            />
            <h2 className="font-display mt-2 text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              {title}
            </h2>
            <div className="mt-6">{children}</div>
          </FadeIn>
        </div>
      </div>
    </Container>
  )
}
