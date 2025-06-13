import { type Metadata } from 'next'
import { ContactSection } from '@/components/ContactSection'
import { PageIntro } from '@/components/PageIntro'
import AppLayout from '@/components/AppLayout'
import FeatureGrid from '@/components/grid/FeatureGrid'
import ServiceSection from '@/components/ServiceSection'
import { Blockquote } from '@/components/Blockquote'
import { List, ListItem } from '@/components/List'
import purpleFlower from '@/images/services/attribution-analytics/purple-flower.jpg'
import yellowFlower from '@/images/services/attribution-analytics/yellow-flower.jpg'
import oceanView from '@/images/services/attribution-analytics/ocean-view.jpg'
import { TagList, TagListItem } from '@/components/TagList'

const services = [
  {
    title: 'SaaS Attribution Assessment & Strategy',
    image: { src: purpleFlower },
    content: (
      <>
        <div className="space-y-6 text-base text-neutral-600">
          <p>
            We start by understanding your unique SaaS customer acquisition
            funnel, from initial awareness through trial conversion to paid
            subscription. Our comprehensive audit maps every touchpoint in your{' '}
            <strong className="font-medium text-neutral-950">
              multi-channel customer journey
            </strong>
            , identifying critical gaps that are costing you revenue.
          </p>
          <p>
            Working directly with your team, we analyze your current attribution
            blind spots—those mysterious traffic sources showing up as
            &quot;direct&quot; in Google Analytics, the true impact of your
            content marketing on trial-to-paid conversion, and the hidden
            influence of your product-led growth motions. We then design a
            custom attribution framework that captures the full complexity of
            modern SaaS customer acquisition.
          </p>
          <p>
            <strong className="font-medium text-neutral-950">
              For SaaS founders:
            </strong>{' '}
            Stop wondering which marketing channels actually drive your best
            customers. Get clarity on whether your $50K/month paid search spend
            is generating profitable LTV or just vanity metrics.
          </p>
        </div>
        <h3 className="font-display mt-12 text-base font-semibold text-neutral-950">
          Strategic Deliverables
        </h3>
        <TagList className="mt-4">
          <TagListItem>SaaS Funnel Attribution Audit</TagListItem>
          <TagListItem>Customer Journey Mapping</TagListItem>
          <TagListItem>Channel Performance Gaps Analysis</TagListItem>
          <TagListItem>LTV-Focused KPI Framework</TagListItem>
          <TagListItem>Multi-Touch Model Architecture</TagListItem>
          <TagListItem>Product-Led Growth Attribution</TagListItem>
        </TagList>
      </>
    ),
  },
  {
    title: 'Advanced Implementation & Integration',
    image: { src: yellowFlower, shape: 1 },
    content: (
      <>
        <div className="space-y-6 text-base text-neutral-600">
          <p>
            Our technical team implements enterprise-grade attribution tracking
            that goes far beyond basic Google Analytics. We deploy sophisticated
            multi-touch attribution models that accurately track your prospects
            across devices, sessions, and months-long consideration
            cycles—critical for B2B SaaS where purchase decisions rarely happen
            in a single session.
          </p>
          <p>
            We integrate data from your entire marketing and sales tech stack:
            HubSpot, Salesforce, Mixpanel, Amplitude, Google Ads, LinkedIn, and
            more. Our custom data pipelines create a unified customer view that
            connects every marketing touchpoint to actual revenue outcomes, not
            just superficial engagement metrics.
          </p>
          <p>
            <strong className="font-medium text-neutral-950">
              Technical highlights:
            </strong>{' '}
            Server-side tracking for iOS 14.5+ compliance, cross-domain
            attribution for complex SaaS funnels, cohort-based LTV attribution,
            and real-time revenue impact measurement.
          </p>
        </div>
        <Blockquote
          author={{ name: 'Sarah Mitchell', role: 'CMO, TechFlow SaaS' }}
          className="mt-12"
        >
          Before working with them, we were flying blind on a $200K monthly
          marketing budget. Their attribution system revealed that our
          &apos;lowest performing&apos; content channels were actually driving
          our highest-LTV customers. We reallocated spend and increased MRR
          growth by 40% in just three months.
        </Blockquote>
      </>
    ),
  },
  {
    title: 'Revenue-Focused Optimization & Growth',
    image: { src: oceanView, shape: 2 },
    content: (
      <>
        <div className="space-y-6 text-base text-neutral-600">
          <p>
            We deliver executive-ready dashboards that show exactly which
            marketing activities drive qualified pipeline, trial-to-paid
            conversion, and long-term customer value. No more vanity
            metrics—just clear ROI data that helps you make confident budget
            allocation decisions.
          </p>
          <p>
            Our ongoing optimization includes monthly strategy sessions where we
            analyze attribution insights and recommend specific tactical
            changes. We help you identify underperforming channels to cut,
            high-potential opportunities to scale, and the optimal marketing mix
            for your growth stage and market.
          </p>
          <p>
            <span className="font-medium text-neutral-950">
              Growth acceleration:{' '}
            </span>{' '}
            We don&apos;t just measure—we help you act on the insights. Expect
            regular recommendations on campaign optimization, budget
            reallocation, and new channel testing based on your attribution
            data.
          </p>
        </div>
        <h3 className="font-display mt-12 text-base font-semibold text-neutral-950">
          Proven SaaS Results
        </h3>
        <List className="mt-8">
          <ListItem title="Customer Acquisition Cost (CAC) Reduction">
            Average 28% decrease in blended CAC through elimination of
            ineffective spend and optimization of high-performing channels.
          </ListItem>
          <ListItem title="Marketing-Attributed Revenue Growth">
            Clients typically see 45-60% improvement in marketing-influenced
            pipeline within the first quarter post-implementation.
          </ListItem>
          <ListItem title="Attribution Accuracy & Speed">
            99.5% data accuracy with real-time attribution updates and executive
            reporting delivered within 2-4 weeks of engagement.
          </ListItem>
          <ListItem title="LTV:CAC Ratio Improvement">
            Most SaaS clients achieve 20-35% improvement in LTV:CAC ratios
            through better channel mix optimization and customer quality
            insights.
          </ListItem>
        </List>
      </>
    ),
  },
]

const features = [
  {
    title: 'SaaS-Specific Multi-Touch Attribution',
    description:
      'Track complex B2B customer journeys that span months and multiple stakeholders. Understand which touchpoints actually drive high-value trials and conversions.',
  },
  {
    title: 'Revenue-First Data Integration',
    description:
      'Connect marketing spend directly to MRR growth with unified tracking across your CRM, analytics, and advertising platforms.',
  },
  {
    title: 'LTV-Based Channel Optimization',
    description:
      'Make budget decisions based on long-term customer value, not just conversion volume. Identify which channels drive your most profitable customer segments.',
  },
  {
    title: 'Product-Led Growth Attribution',
    description:
      'Measure the marketing impact on product adoption, feature usage, and organic growth loops—critical for modern SaaS success.',
  },
  {
    title: 'Executive-Ready Reporting',
    description:
      "Get board-level visibility into marketing ROI with clear, actionable dashboards that show marketing's direct contribution to revenue growth.",
  },
  {
    title: 'Continuous Growth Optimization',
    description:
      'Ongoing strategic guidance and monthly optimization recommendations to accelerate growth and improve marketing efficiency.',
  },
]

const painPoints = [
  {
    problem: "Can't prove marketing ROI to investors or board",
    solution:
      'Executive dashboards showing direct marketing contribution to ARR growth',
  },
  {
    problem: "Wasting budget on channels that don't convert to revenue",
    solution: 'Revenue-based attribution revealing true channel performance',
  },
  {
    problem: 'Long sales cycles make attribution nearly impossible',
    solution: 'Multi-touch models designed for complex B2B customer journeys',
  },
  {
    problem: 'Analytics show conversions but revenue stays flat',
    solution:
      'LTV-focused measurement that optimizes for customer quality, not just quantity',
  },
]

export default async function AttributionAnalytics() {
  return (
    <AppLayout>
      <PageIntro
        eyebrow="SaaS Attribution Analytics"
        title="Stop guessing which marketing channels actually drive revenue growth."
      >
        <p>
          You&apos;re spending six figures on marketing, but can&apos;t
          definitively prove which channels drive your best customers. Our&nbsp;
          <span className="text-emerald-700">
            revenue-focused attribution system
          </span>
          gives SaaS founders and marketing leaders the clarity they need to
          scale efficiently and demonstrate ROI to stakeholders.
        </p>
        <div className="mt-8 rounded-2xl bg-slate-50 p-8">
          <h3 className="mb-4 text-lg font-semibold text-neutral-950">
            Are you experiencing these attribution challenges?
          </h3>
          <div className="space-y-3">
            {painPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-500"></div>
                <div>
                  <p className="text-sm font-medium text-neutral-600">
                    {point.problem}
                  </p>
                  <p className="mt-1 text-xs text-emerald-700">
                    → {point.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageIntro>

      <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        {services.map(({ title, image, content }) => (
          <ServiceSection key={title} title={title} image={image}>
            {content}
          </ServiceSection>
        ))}
      </div>

      <div className="mx-auto mt-24 max-w-7xl px-6 sm:mt-32 lg:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-emerald-600">
            Complete Attribution Solution
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to optimize your SaaS marketing spend
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Purpose-built for SaaS companies who need to prove marketing ROI and
            accelerate profitable growth.
          </p>
        </div>
      </div>

      <FeatureGrid features={features} columns={3} />

      <div className="mx-auto mt-24 max-w-7xl px-6 sm:mt-32 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Ready to see which marketing channels actually drive your growth?
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-emerald-100">
            Join 200+ SaaS companies who&apos;ve eliminated attribution
            guesswork and accelerated profitable growth with our revenue-focused
            attribution system.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="text-sm text-emerald-100">
              ✓ Implementation in 2-4 weeks &nbsp;&nbsp; ✓ ROI guarantee
              &nbsp;&nbsp; ✓ Dedicated growth strategist
            </div>
          </div>
        </div>
      </div>

      <ContactSection
        cta="Stop flying blind with your marketing budget. Get complete visibility into what's driving your SaaS growth."
        btn="Schedule your attribution strategy call"
      />
    </AppLayout>
  )
}

export const metadata: Metadata = {
  title: 'SaaS Attribution Analytics | Prove Marketing ROI & Accelerate Growth',
  description:
    'Stop guessing which marketing channels drive revenue. Our SaaS-focused attribution system shows exactly which activities generate your best customers and highest LTV.',
}
