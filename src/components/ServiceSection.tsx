import React from 'react'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { TravelingImage } from '@/components/TravelingImage'
import type { StaticImageData } from 'next/image'
import { SectionIntro } from '@/components/SectionIntro'
import { List, ListItem } from '@/components/List'
import imagePostLucid from '@/images/post-lucid.jpg'

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
              className="font-display text-base font-semibold before:text-emerald-200 before:content-['/_'] after:text-emerald-700 after:content-[counter(section,decimal-leading-zero)]"
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

export function Services() {
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
