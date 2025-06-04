import React from 'react';
import { Container } from '@/components/Container';
import { GridList, GridListItem } from '@/components/GridList';
import { SectionIntro } from '@/components/SectionIntro';
import { GridPattern } from '@/components/GridPattern';

interface Feature {
  title: string;
  description: string;
}


export interface FeatureGridProps {
  features: Feature[]
  className?: string
}


export default function FeatureGrid({ features, className = "" }: FeatureGridProps) {
  return (
    <div className="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
      <div className="rounded-t-4xl bg-linear-to-b absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden from-neutral-50">
        <GridPattern
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
        <GridList>
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
