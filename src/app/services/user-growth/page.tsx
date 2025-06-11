'use cache'

import { type Metadata } from 'next'
import { ContactSection } from '@/components/ContactSection'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import FeatureGrid from '@/components/grid/FeatureGrid'
import ServiceSection from '@/components/ServiceSection'
import { Blockquote } from '@/components/Blockquote'
import { List, ListItem } from '@/components/List'
import jacobsCorner from '@/images/services/user-growth/jacobs-corner.jpg'
import bigColdSpring from '@/images/services/user-growth/big-cold-spring.jpg'
import downstream from '@/images/services/user-growth/downstream.jpg'
import { TagList, TagListItem } from '@/components/TagList'

const services = [
  {
    title: 'Growth Strategy',
    image: { src: bigColdSpring },
    content: (
      <>
        <div className="space-y-6 text-base text-neutral-600">
          <p>
            We begin with a comprehensive growth audit to identify high-impact
            opportunities across your customer lifecycle. Our experts analyze
            acquisition channels, conversion funnels, and retention mechanisms
            to build a data-driven growth roadmap.
          </p>
          <p>
            Through cohort analysis and customer segmentation, we uncover hidden
            growth levers specific to your business model. This phase delivers a
            prioritized execution plan with clear KPIs and ROI projections.
          </p>
        </div>
        <h3 className="font-display mt-12 text-base font-semibold text-neutral-950">
          Key Activities
        </h3>
        <TagList className="mt-4">
          <TagListItem>Growth Audit</TagListItem>
          <TagListItem>Funnel Analysis</TagListItem>
          <TagListItem>Cohort Segmentation</TagListItem>
          <TagListItem>Channel Benchmarking</TagListItem>
          <TagListItem>Experiment Roadmap</TagListItem>
        </TagList>
      </>
    ),
  },
  {
    title: 'Execution & Testing',
    image: { src: jacobsCorner, shape: 1 },
    content: (
      <>
        <div className="space-y-6 text-base text-neutral-600">
          <p>
            Our growth engineers implement A/B tests, conversion experiments,
            and channel-specific campaigns across your digital properties. We
            utilize both qualitative and quantitative research methods to
            validate hypotheses at scale.
          </p>
          <p>
            Through continuous experimentation, we optimize landing pages, CTAs,
            and user journeys while building scalable infrastructure for ongoing
            testing. Our approach combines behavioral psychology with
            statistical rigor to maximize learning velocity.
          </p>
        </div>
        <Blockquote
          author={{ name: 'Alex Morgan', role: 'CEO at GrowthTech' }}
          className="mt-12"
        >
          Their systematic approach increased our trial-to-paid conversion rate
          by 47% within 90 days while establishing a sustainable experimentation
          framework.
        </Blockquote>
      </>
    ),
  },
  {
    title: 'Scale & Optimize',
    image: { src: downstream, shape: 2 },
    content: (
      <>
        <div className="space-y-6 text-base text-neutral-600">
          <p>
            We transition successful experiments into scalable growth systems,
            implementing automation workflows and predictive analytics to
            maintain momentum. Our team builds custom dashboards that track
            growth health metrics and surface optimization opportunities.
          </p>
          <p>
            Through quarterly business reviews and performance recalibration, we
            ensure sustained growth velocity. We provide hands-on training to
            transfer knowledge and methodologies to your internal teams for
            long-term success.
          </p>
        </div>
        <h3 className="font-display mt-12 text-base font-semibold text-neutral-950">
          Success Metrics
        </h3>
        <List className="mt-8">
          <ListItem title="Growth Velocity">
            Average 3x increase in monthly growth rate within first 6 months.
          </ListItem>
          <ListItem title="Experiment Velocity">
            15+ validated experiments per quarter with 30%+ success rate.
          </ListItem>
          <ListItem title="System Scalability">
            Infrastructure designed to support 10x user growth without
            performance degradation.
          </ListItem>
        </List>
      </>
    ),
  },
]

const features = [
  {
    title: 'Growth Strategy',
    description:
      'Data-driven planning that identifies high-impact opportunities across acquisition, activation, and monetization.',
  },
  {
    title: 'Conversion Optimization',
    description:
      'Scientific experimentation framework to maximize conversion rates across the customer journey.',
  },
  {
    title: 'Channel Scaling',
    description:
      'Performance marketing expertise across paid, organic, and partnership channels.',
  },
  {
    title: 'Retention Engineering',
    description:
      'Behavioral analytics and proactive interventions to improve user engagement and lifetime value.',
  },
]

export default async function UserGrowth() {
  return (
    <RootLayout>
      <PageIntro
        eyebrow="User Growth Services"
        title="Transform growth from theory into measurable outcomes."
      >
        <p>
          In today&apos;s competitive landscape,&nbsp;
          <span className="font-semibold text-blue-600">user growth</span>
          requires more than just tactics - it demands a systematic approach
          combining strategy, experimentation, and execution excellence. Our
          proven framework delivers sustainable growth at any business stage.
        </p>
      </PageIntro>

      <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        {services.map(({ title, image, content }) => (
          <ServiceSection key={title} title={title} image={image}>
            {content}
          </ServiceSection>
        ))}
      </div>

      <FeatureGrid features={features} columns={2} />

      <ContactSection
        cta="Ready to unlock exponential growth potential?"
        btn="Start growth audit"
      />
    </RootLayout>
  )
}

export const metadata: Metadata = {
  title: 'User Growth Services | Data-Driven Customer Acquisition',
  description:
    'Proven growth strategies that deliver scalable user acquisition, retention, and monetization through systematic experimentation and data-driven optimization.',
}
