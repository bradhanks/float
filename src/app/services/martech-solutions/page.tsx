'use cache'
import { type Metadata } from 'next'
import { ContactSection } from '@/components/ContactSection'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import FeatureGrid from '@/components/grid/FeatureGrid'
import ServiceSection from '@/components/ServiceSection'
import { Blockquote } from '@/components/Blockquote'
import { List, ListItem } from '@/components/List'
import australiaCraggyCoast from '@/images/services/marketing-technology/australia-craggy-coast.jpg'
import australiaRockyCoast from '@/images/services/marketing-technology/australia-rocky-coast.jpg'
import australia from '@/images/services/marketing-technology/australia.jpg'
import { TagList, TagListItem } from '@/components/TagList'

const services = [
  {
    title: 'Strategy & Discovery',
    image: { src: australiaCraggyCoast, shape: 0 },
    content: (
      <>
        <div className="space-y-6 text-base text-neutral-600">
          <p>
            We begin by conducting a comprehensive assessment of your current{' '}
            <span className="font-medium">Marketing Techonolgy</span> stack,
            business objectives, and customer journey touchpoints. Our experts
            analyze technical architecture, data flows, and integration points
            to identify optimization opportunities.
          </p>
          <p>
            Through collaborative workshopping and stakeholder interviews, we
            map your marketing workflows against industry benchmarks. This phase
            culminates in a tailored Marketing Techonolgy roadmap that aligns
            with your growth goals while ensuring technical feasibility and cost
            efficiency.
          </p>
        </div>
        <h3 className="font-display mt-12 text-base font-semibold text-neutral-950">
          Key Activities
        </h3>
        <TagList className="mt-4">
          <TagListItem>Marketing Techonolgy Health Check</TagListItem>
          <TagListItem>Integration Audit</TagListItem>
          <TagListItem>Workflow Optimization</TagListItem>
          <TagListItem>Platform Gap Analysis</TagListItem>
          <TagListItem>ROI Modeling</TagListItem>
        </TagList>
      </>
    ),
  },
  {
    title: 'Custom Implementation',
    image: { src: australiaRockyCoast, shape: 1 },
    content: (
      <>
        <div className="space-y-6 text-base text-neutral-600">
          <p>
            Leveraging our proven implementation frameworks, we configure and
            customize solutions that solve your specific challenges. Our
            engineers specialize in building seamless integrations between
            marketing platforms, CRMs, and data warehouses using modern tech
            stacks (AWS, Azure, Snowflake, Segment).
          </p>
          <p>
            We prioritize modular development with API-first architecture,
            ensuring your Marketing Techonolgy ecosystem remains adaptable to
            future innovations. All implementations follow strict governance
            protocols with continuous testing at every stage to maintain data
            integrity and system reliability.
          </p>
        </div>
        <Blockquote
          author={{ name: 'Sarah Chen', role: 'CMO at GrowthTech' }}
          className="mt-12"
        >
          Their implementation transformed our disjointed tools into a cohesive
          engine that drives 30% faster campaign execution.
        </Blockquote>
      </>
    ),
  },
  {
    title: 'Deployment & Optimization',
    image: { src: australia, shape: 2 },
    content: (
      <>
        <div className="space-y-6 text-base text-neutral-600">
          <p>
            We ensure smooth go-lives through phased rollouts and comprehensive
            training programs. Post-launch, our team monitors system performance
            metrics and conducts quarterly business reviews to optimize ROI
            through continuous improvement.
          </p>
          <p>
            Our support includes proactive maintenance, security updates, and
            strategic roadmap refreshes to keep your Marketing Techonolgy
            investments aligned with evolving business needs. We provide
            detailed documentation and knowledge transfer sessions to ensure
            internal teams can leverage the full capabilities of your solutions.
          </p>
        </div>
        <h3 className="font-display mt-12 text-base font-semibold text-neutral-950">
          Success Metrics
        </h3>
        <List className="mt-8">
          <ListItem title="Time-to-Value">
            Average 60% reduction in deployment timelines through reusable
            components and agile methodologies.
          </ListItem>
          <ListItem title="System Performance">
            99.95% uptime SLA with automated monitoring and failover mechanisms.
          </ListItem>
          <ListItem title="ROI Tracking">
            Custom dashboards measuring business impact across CAC, LTV, and
            conversion rates.
          </ListItem>
        </List>
      </>
    ),
  },
]

const features = [
  {
    title: 'Martech Solutions',
    href: '/services/martech-solutions',
    description:
      'Building integrated marketing ecosystems that unify data, automation, and analytics to drive measurable business outcomes.',
  },
  {
    title: 'Data Engineering',
    href: '/services/data-engineering',
    description:
      'Creating scalable data architectures that power intelligent marketing decisions and personalized customer experiences.',
  },
  {
    title: 'Platform Integration',
    href: '/services/platform-integration',
    description:
      'Connecting disparate systems through robust APIs and middleware solutions that eliminate data silos.',
  },
  {
    title: 'Cloud Migration',
    href: '/services/cloud-migration',
    description:
      'Modernizing legacy infrastructure with secure cloud implementations that enhance agility and reduce operational costs.',
  },
]

export default async function MartechSolutions() {
  return (
    <RootLayout>
      <PageIntro
        eyebrow="Martech Services"
        title="Transform marketing complexity into competitive advantage."
      >
        <p>
          In today&apos;s fragmented digital landscape,marketing technology
          should be an accelerator, not a constraint. Our proven framework
          delivers Marketing Techonolgy ecosystems that scale with your
          ambitions while maximizing existing investments.
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
        cta="Ready to future-proof your marketing technology?"
        btn="Start free assessment"
      />
    </RootLayout>
  )
}

export const metadata: Metadata = {
  title:
    'Marketing Technology Solutions | B2B SaaS Marketing Technology Services',
  description:
    'Expert implementation of integrated Marketing Techonolgy stacks that unify data, automation, and analytics to drive measurable business growth.',
}
