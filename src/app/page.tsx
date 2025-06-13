import { type Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
// import { customers } from '@/lib/customers'
import { type CaseStudy, type MDXEntry, loadCaseStudies } from '@/lib/mdx'

// const Testimonial = dynamic(() => import('@/components/Testimonial').then((mod) => mod.Testimonial))
// const ListCustomers = dynamic(() => import('@/lib/customers').then((mod) => mod.ListCustomers))
const FadeInStagger = dynamic(() =>
  import('@/components/FadeIn').then((mod) => mod.FadeInStagger),
)
const FadeIn = dynamic(() =>
  import('@/components/FadeIn').then((mod) => mod.FadeIn),
)
const ContactSection = dynamic(() =>
  import('@/components/ContactSection').then((mod) => mod.ContactSection),
)
const Services = dynamic(() =>
  import('@/components/ServiceSection').then((mod) => mod.Services),
)
const Container = dynamic(() =>
  import('@/components/Container').then((mod) => mod.Container),
)
const SectionIntro = dynamic(() =>
  import('@/components/SectionIntro').then((mod) => mod.SectionIntro),
)
const AppLayout = dynamic(() =>
  import('@/components/AppLayout'),
)

// async function Customers() {
//   return (
//     <div className="rounded-4xl mt-24 bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56">
//       <Container>
//         <FadeIn className="flex items-center gap-x-8">
//           <h2 className="font-display text-center text-sm font-semibold tracking-wider text-white sm:text-left">
//             B2B SaaS industry leaders start as B2B SaaS seed-stage startups.
//           </h2>
//           <div className="h-px flex-auto bg-neutral-800" />
//         </FadeIn>
//         <FadeInStagger faster>
//           <ul
//             role="list"
//             className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
//           >
//             <ListCustomers customers={customers} />
//           </ul>
//         </FadeInStagger>
//       </Container>
//     </div>
//   )
// }

function CaseStudies({
  caseStudies,
}: {
  caseStudies: Array<MDXEntry<CaseStudy>>
}) {
  return (
    <>
      <SectionIntro
        title="Getting down to brass tacks with B2B SaaS startups."
        eyebrow="Case Studies"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          If you are an early-stage B2B SaaS startup, we&apos;re confident
          we&apos;ve delivered results for a startup like yours.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <FadeIn key={caseStudy.href} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  <Link href={caseStudy.href}>
                    <span className="absolute inset-0 rounded-3xl" />
                    <Image
                      src={caseStudy.logo}
                      alt={caseStudy.client}
                      className="h-16 w-16"
                    />
                  </Link>
                </h3>
                <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                  <span className="font-semibold">{caseStudy.client}</span>

                  <span className="text-emerald-200" aria-hidden="true">
                    /
                  </span>
                  <span>Case study</span>
                </p>
                <p className="font-display mt-6 text-2xl font-semibold text-neutral-950">
                  {caseStudy.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {caseStudy.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}

export default async function Home() {
  const caseStudies = (await loadCaseStudies()).slice(0, 3)

  return (
    <AppLayout>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-balance text-5xl font-medium tracking-tight text-neutral-950 sm:text-7xl">
            B2B SaaS startup <span className="text-emerald-700">valuation</span>{' '}
            consulting
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            We deliver on this promise —{' '}
            <span className="text-emerald-700">
              superior terms on your next funding round.
            </span>
            <br />
            Bring your team, technology and learnings. We can help with
            traction, user growth and nailing down the unit economics of your
            business model.
          </p>
        </FadeIn>
      </Container>

      {/* <Customers /> */}
      <Services />
      <CaseStudies caseStudies={caseStudies} />

      <ContactSection />
    </AppLayout>
  )
}
