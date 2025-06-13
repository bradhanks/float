import React from 'react'
import dynamic from 'next/dynamic'

const Container = dynamic(() =>
  import('@/components/Container').then((mod) => mod.Container),
)
const GridList = dynamic(() =>
  import('@/components/grid/GridList').then((mod) => mod.GridList),
)
const GridListItem = dynamic(() =>
  import('@/components/grid/GridListItem').then((mod) => mod.GridListItem),
)
const SectionIntro = dynamic(() =>
  import('@/components/SectionIntro').then((mod) => mod.SectionIntro),
)
const BackgroundPattern = dynamic(() =>
  import('@/components/BackgroundPattern')
)

interface Feature {
  title: string
  description: string
}

export interface FeatureGridProps {
  features: Feature[]
  columns?: number
}

export default function FeatureGrid({ features, columns }: FeatureGridProps) {
  return (
    <div className="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
      <div className="rounded-t-4xl bg-linear-to-b absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden from-neutral-50">
        <BackgroundPattern
          className="mask-[linear-gradient(to_bottom_left,white_40%,transparent_50%)] absolute inset-0 h-full w-full fill-neutral-100 stroke-neutral-950/5"
          yOffset={-270}
        />
      </div>
      <SectionIntro
        eyebrow="Our values"
        title="Balancing reliability and innovation"
      >
        <p>
          We strive to stay at the forefront of emerging trends and
          technologies, while completely ignoring them and forking that old
          Rails project we feel comfortable using. We stand by our core values
          to justify that decision.
        </p>
      </SectionIntro>
      <Container className="mt-24">
        <GridList columns={columns}>
          {features.map(({ title, description }) => (
            <GridListItem key={title} title={title}>
              {description}
            </GridListItem>
          ))}
        </GridList>
      </Container>
    </div>
  )
}
