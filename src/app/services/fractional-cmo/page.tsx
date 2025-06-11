'use cache'
import { type Metadata } from 'next'
import { ContactSection } from '@/components/ContactSection'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import FeatureGrid from '@/components/grid/FeatureGrid'
import ServiceSection from '@/components/ServiceSection'
import { Blockquote } from '@/components/Blockquote'
import { List, ListItem } from '@/components/List'
import zionHiddenValley from '@/images/services/fractional-cmo/zion-hidden-valley.jpg'
import zionRippleRock from '@/images/services/fractional-cmo/zion-ripple-rock.jpg'
import zionSnowyRiver from '@/images/services/fractional-cmo/zion-snowy-river.jpg'
import { TagList, TagListItem } from '@/components/TagList'

const services = [
  {
    title: 'SaaS Growth Assessment & Strategic Planning',
    image: { src: zionHiddenValley, shape: 0 },
    content: (
      <>
        <div className="space-y-6 text-base text-neutral-600">
          <p>
            We start by conducting a comprehensive growth audit of your SaaS
            business, analyzing your{' '}
            <strong className="font-semibold text-neutral-950">
              product-market fit signals
            </strong>
            , customer acquisition efficiency, and revenue growth trajectory.
            Our fractional CMO integrates immediately with your leadership team
            to understand your fundraising goals, board expectations, and growth
            targets.
          </p>
          <p>
            Within the first 30 days, we deliver a data-driven growth strategy
            that identifies your biggest revenue opportunities and builds a
            roadmap for sustainable, scalable growth. This includes competitive
            positioning, ideal customer profile refinement, and a clear
            go-to-market playbook aligned with your business stage and market
            dynamics.
          </p>
          <p>
            <strong className="font-semibold text-neutral-950">
              For SaaS founders:
            </strong>{' '}
            Get the strategic clarity you need for your next board meeting or
            investor update, with a comprehensive growth plan that shows exactly
            how marketing will drive ARR growth.
          </p>
        </div>
        <h3 className="font-display mt-12 text-base font-semibold text-neutral-950">
          Strategic Deliverables
        </h3>
        <TagList className="mt-4">
          <TagListItem>SaaS Growth Maturity Assessment</TagListItem>
          <TagListItem>ICP & Market Segmentation Analysis</TagListItem>
          <TagListItem>Competitive Positioning Framework</TagListItem>
          <TagListItem>Channel Mix Optimization Strategy</TagListItem>
          <TagListItem>Revenue Growth Roadmap</TagListItem>
          <TagListItem>Board-Ready Marketing Metrics</TagListItem>
        </TagList>
      </>
    ),
  },
  {
    title: 'Hands-On Growth Execution & Team Leadership',
    image: { src: zionRippleRock, shape: 1 },
    content: (
      <>
        <div className="space-y-6 text-base text-neutral-600">
          <p>
            Our fractional CMOs don&apos;t just strategize—they roll up their
            sleeves and execute. We take ownership of your marketing outcomes,
            directly managing campaigns, optimizing funnels, and building the
            systems needed for predictable growth. This includes hands-on
            leadership of your existing marketing team and collaboration with
            sales to ensure tight alignment.
          </p>
          <p>
            We implement proven SaaS growth playbooks covering demand
            generation, product-led growth optimization, customer lifecycle
            marketing, and expansion revenue strategies. Our approach focuses on
            metrics that matter: qualified pipeline, trial-to-paid conversion,
            net revenue retention, and customer lifetime value optimization.
          </p>
          <p>
            <strong className="font-semibold text-neutral-950">
              Immediate impact areas:
            </strong>{' '}
            Marketing qualified lead (MQL) generation, sales-marketing
            alignment, customer onboarding optimization, and expansion revenue
            programs that grow your existing customer base.
          </p>
        </div>
        <Blockquote
          author={{
            name: 'Michael Chen',
            role: 'CEO & Founder, CloudFlow SaaS',
          }}
          className="mt-12"
        >
          Our fractional CMO took us from $2M to $8M ARR in 18 months. They
          didn&apos;t just build our marketing engine—they created a scalable
          growth system that continues driving results even after transitioning
          to our full-time CMO. The ROI was incredible.
        </Blockquote>
      </>
    ),
  },
  {
    title: 'Team Building & Knowledge Transfer',
    image: { src: zionSnowyRiver, shape: 2 },
    content: (
      <>
        <div className="space-y-6 text-base text-neutral-600">
          <p>
            We don&apos;t just manage your marketing—we build your marketing
            capabilities for the long term. Our fractional CMOs focus heavily on
            developing your internal team, documenting processes, and creating
            systems that continue delivering results after our engagement. This
            includes hiring and onboarding key marketing roles when you&apos;re
            ready to scale your team.
          </p>
          <p>
            The transition process is carefully planned from day one. We create
            comprehensive playbooks, establish performance tracking systems, and
            provide intensive training to ensure seamless continuity. Whether
            you&apos;re hiring a full-time CMO or promoting from within, your
            team will be equipped with proven frameworks and documented
            processes.
          </p>
          <p>
            <strong className="font-semibold text-neutral-950">
              Legacy infrastructure:
            </strong>{' '}
            Marketing automation workflows, attribution systems, performance
            dashboards, and growth playbooks that become permanent assets for
            your business.
          </p>
        </div>
        <h3 className="font-display mt-12 text-base font-semibold text-neutral-950">
          Proven SaaS Outcomes
        </h3>
        <List className="mt-8">
          <ListItem title="Revenue Growth Acceleration">
            Average 3-5x increase in marketing-influenced ARR within 6 months,
            with sustainable growth systems that continue scaling
            post-engagement.
          </ListItem>
          <ListItem title="Marketing Efficiency Improvement">
            Typical 40-60% reduction in customer acquisition cost (CAC) through
            channel optimization and conversion rate improvements across the
            funnel.
          </ListItem>
          <ListItem title="Team Development & Capability Building">
            95% of internal teams report significant skill advancement, with
            documented processes and playbooks enabling continued autonomous
            execution.
          </ListItem>
          <ListItem title="Strategic Transition Success">
            Seamless handoff to full-time leadership with 12-month advisory
            support, ensuring no disruption to growth momentum during leadership
            transitions.
          </ListItem>
        </List>
      </>
    ),
  },
]

const features = [
  {
    title: 'Seasoned SaaS Marketing Leadership',
    description:
      'Experienced CMOs who have scaled multiple SaaS companies from Series A through IPO, bringing proven playbooks and strategic expertise.',
  },
  {
    title: 'Immediate Growth Impact',
    description:
      'Hands-on execution from day one—managing campaigns, optimizing funnels, and driving measurable improvements in key SaaS metrics.',
  },
  {
    title: 'Full-Stack Growth Strategy',
    description:
      'End-to-end growth expertise covering demand gen, product-led growth, customer success marketing, and expansion revenue optimization.',
  },
  {
    title: 'Team Development & Hiring',
    description:
      'Build and develop your marketing team capabilities while establishing processes and systems for long-term autonomous success.',
  },
  {
    title: 'Board-Ready Reporting',
    description:
      "Executive-level dashboards and strategic updates that clearly demonstrate marketing's contribution to business objectives and growth targets.",
  },
  {
    title: 'Seamless Transition Planning',
    description:
      "Structured knowledge transfer and team development that ensures smooth transition to full-time leadership when you're ready to scale.",
  },
]

const idealSituations = [
  {
    scenario: 'Recently raised Series A/B and need to scale marketing quickly',
    solution: 'Immediate strategic leadership without 6-month hiring process',
  },
  {
    scenario: "Between CMOs or current marketing leader isn't scaling",
    solution:
      'Interim leadership that maintains growth momentum during transitions',
  },
  {
    scenario: 'Strong product but struggling with go-to-market execution',
    solution: 'Proven SaaS GTM playbooks and hands-on implementation',
  },
  {
    scenario: 'Need to demonstrate marketing ROI for next funding round',
    solution:
      'Board-ready metrics and attribution systems that prove growth impact',
  },
  {
    scenario: 'Marketing team exists but lacks strategic direction',
    solution: "Leadership and mentorship to unlock your team's potential",
  },
]

export default async function FractionalCMO() {
  return (
    <RootLayout>
      <PageIntro
        eyebrow="Fractional CMO for SaaS"
        title="Get the marketing leadership you need to scale, without the full-time commitment."
      >
        <p>
          You need a seasoned marketing executive who understands SaaS growth,
          but hiring a full-time CMO feels premature or too expensive. Our{' '}
          <span className="text-emerald-700">fractional CMO service</span>
          provides experienced leadership that drives immediate growth impact
          while building your team&apos;s capabilities for long-term success.
        </p>
        <div className="mt-8 rounded-2xl bg-slate-50 p-8">
          <h3 className="mb-4 text-lg font-semibold text-neutral-950">
            When is a Fractional CMO the right choice?
          </h3>
          <div className="space-y-3">
            {idealSituations.map((situation, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500"></div>
                <div>
                  <p className="text-sm font-medium text-neutral-600">
                    {situation.scenario}
                  </p>
                  <p className="mt-1 text-xs text-emerald-700">
                    → {situation.solution}
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
            Complete Marketing Leadership
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need from a world-class CMO, on your timeline
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Proven SaaS marketing executives who deliver immediate impact while
            building lasting capabilities.
          </p>
        </div>
      </div>

      <FeatureGrid features={features} columns={3} />

      <div className="mx-auto mt-24 max-w-7xl px-6 sm:mt-32 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              The difference between a consultant and a Fractional CMO
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-red-200 pl-6">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Traditional Marketing Consultants
                </h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Provide recommendations and strategies</li>
                  <li>• Limited hands-on execution</li>
                  <li>• Project-based engagements</li>
                  <li>• No ownership of results</li>
                </ul>
              </div>
              <div className="border-l-4 border-emerald-500 pl-6">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Our Fractional CMOs
                </h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Take ownership of marketing outcomes</li>
                  <li>• Hands-on execution and team leadership</li>
                  <li>• Ongoing strategic partnership</li>
                  <li>• Accountable for growth metrics and ROI</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-emerald-50 p-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              Typical Engagement Structure
            </h3>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-center justify-between border-b border-emerald-200 py-2">
                <span className="font-medium">Time Commitment:</span>
                <span>20-40 hours/week</span>
              </div>
              <div className="flex items-center justify-between border-b border-emerald-200 py-2">
                <span className="font-medium">Engagement Length:</span>
                <span>6-18 months</span>
              </div>
              <div className="flex items-center justify-between border-b border-emerald-200 py-2">
                <span className="font-medium">Team Integration:</span>
                <span>Full leadership role</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="font-medium">Transition Support:</span>
                <span>12 months advisory</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-7xl px-6 sm:mt-32 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Ready to accelerate your SaaS growth with proven marketing
            leadership?
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-emerald-100">
            Join 150+ SaaS companies who&apos;ve scaled faster and more
            efficiently with our fractional CMO expertise. Get the strategic
            leadership you need, when you need it.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="text-sm text-emerald-100">
              ✓ Start within 2 weeks &nbsp;&nbsp; ✓ Immediate growth impact
              &nbsp;&nbsp; ✓ No long-term commitment required
            </div>
          </div>
        </div>
      </div>

      <ContactSection
        cta="Stop waiting for the perfect marketing hire. Get experienced CMO leadership that drives results from day one."
        btn="Schedule your fractional CMO consultation"
      />
    </RootLayout>
  )
}

export const metadata: Metadata = {
  title: 'Fractional CMO for SaaS | Expert Marketing Leadership On-Demand',
  description:
    'Scale your SaaS faster with experienced fractional CMO leadership. Get proven marketing executives who drive growth without full-time commitment.',
}
