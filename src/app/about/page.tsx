import { type Metadata } from 'next'
import Image from 'next/image'
import dynamic from 'next/dynamic'

// Dynamic imports for other components
const Border = dynamic(() => import('@/components/Border'))

const AppLayout = dynamic(() =>
  import('@/components/AppLayout')
)

const ContactSection = dynamic(() =>
  import('@/components/ContactSection').then((mod) => mod.ContactSection),
)
const Container = dynamic(() =>
  import('@/components/Container').then((mod) => mod.Container),
)
const FadeIn = dynamic(() =>
  import('@/components/FadeIn').then((mod) => mod.FadeIn),
)
const FadeInStagger = dynamic(() =>
  import('@/components/FadeIn').then((mod) => mod.FadeInStagger),
)
const GridList = dynamic(() =>
  import('@/components/grid/GridList').then((mod) => mod.GridList),
)
const GridListItem = dynamic(() =>
  import('@/components/grid/GridListItem').then((mod) => mod.GridListItem),
)
const PageIntro = dynamic(() =>
  import('@/components/PageIntro').then((mod) => mod.PageIntro),
)
const PageLinks = dynamic(() =>
  import('@/components/PageLinks').then((mod) => mod.PageLinks),
)
const SectionIntro = dynamic(() =>
  import('@/components/SectionIntro').then((mod) => mod.SectionIntro),
)
const StatList = dynamic(() =>
  import('@/components/StatList').then((mod) => mod.StatList),
)
const StatListItem = dynamic(() =>
  import('@/components/StatList').then((mod) => mod.StatListItem),
)

import imageAngelaFisher from '@/images/team/angela-fisher.jpg'
import imageBenjaminRussel from '@/images/team/benjamin-russel.jpg'
import imageBlakeReid from '@/images/team/blake-reid.jpg'
import imageChelseaHagon from '@/images/team/chelsea-hagon.jpg'
import imageDriesVincent from '@/images/team/dries-vincent.jpg'
import imageEmmaDorsey from '@/images/team/emma-dorsey.jpg'
import imageJeffreyWebb from '@/images/team/jeffrey-webb.jpg'
import imageKathrynMurphy from '@/images/team/kathryn-murphy.jpg'
import imageLeonardKrasner from '@/images/team/leonard-krasner.jpg'
import imageLeslieAlexander from '@/images/team/leslie-alexander.jpg'
import imageMichaelFoster from '@/images/team/michael-foster.jpg'
import imageWhitneyFrancis from '@/images/team/whitney-francis.jpg'
import { loadArticles } from '@/lib/mdx'
import { MotionDiv, MotionSpan, MotionP } from '@/components/MotionWrapper'

function Culture() {
  return (
    <div className="rounded-4xl mt-24 bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow="Our culture"
        title="Balance your passion with your passion for life."
        invert
      >
        <p>
          We are a group of like-minded people who share the same core values.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Loyalty" invert>
            Our team has been with us since the beginning because none of them
            are allowed to have LinkedIn profiles.
          </GridListItem>
          <GridListItem title="Trust" invert>
            We don&apos;t care when our team works just as long as they are
            working every waking second.
          </GridListItem>
          <GridListItem title="Compassion" invert>
            You never know what someone is going through at home and we make
            sure to never find out.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

const team = [
  {
    title: 'Leadership',
    people: [
      {
        name: 'Leslie Alexander',
        role: 'Co-Founder / CEO',
        image: { src: imageLeslieAlexander },
      },
      {
        name: 'Michael Foster',
        role: 'Co-Founder / CTO',
        image: { src: imageMichaelFoster },
      },
      {
        name: 'Dries Vincent',
        role: 'Partner & Business Relations',
        image: { src: imageDriesVincent },
      },
    ],
  },
  {
    title: 'Team',
    people: [
      {
        name: 'Chelsea Hagon',
        role: 'Senior Developer',
        image: { src: imageChelseaHagon },
      },
      {
        name: 'Emma Dorsey',
        role: 'Senior Designer',
        image: { src: imageEmmaDorsey },
      },
      {
        name: 'Leonard Krasner',
        role: 'VP, User Experience',
        image: { src: imageLeonardKrasner },
      },
      {
        name: 'Blake Reid',
        role: 'Junior Copywriter',
        image: { src: imageBlakeReid },
      },
      {
        name: 'Kathryn Murphy',
        role: 'VP, Human Resources',
        image: { src: imageKathrynMurphy },
      },
      {
        name: 'Whitney Francis',
        role: 'Content Specialist',
        image: { src: imageWhitneyFrancis },
      },
      {
        name: 'Jeffrey Webb',
        role: 'Account Coordinator',
        image: { src: imageJeffreyWebb },
      },
      {
        name: 'Benjamin Russel',
        role: 'Senior Developer',
        image: { src: imageBenjaminRussel },
      },
      {
        name: 'Angela Fisher',
        role: 'Front-end Developer',
        image: { src: imageAngelaFisher },
      },
    ],
  },
]

function Team() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="space-y-24">
        {team.map((group) => (
          <FadeInStagger key={group.title}>
            <Border as={FadeIn} />
            <div className="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
              <FadeIn>
                <h2 className="font-display text-2xl font-semibold text-neutral-950">
                  {group.title}
                </h2>
              </FadeIn>
              <div className="lg:col-span-3">
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
                >
                  {group.people.map((person) => (
                    <MotionSpan
                      key={person.name}
                      initial="rest"
                      whileHover="hover"
                      className="relative"
                    >
                      <FadeIn>
                        <MotionDiv
                          className="group relative overflow-hidden rounded-3xl bg-neutral-100"
                          variants={{
                            rest: { scale: 1 },
                            hover: { scale: 1.03 },
                          }}
                          transition={{
                            duration: 0.4,
                            ease: [0.19, 1, 0.22, 1],
                          }}
                        >
                          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/30 to-transparent" />
                        </MotionDiv>
                        <MotionDiv
                          className="absolute inset-0 z-0"
                          variants={{
                            rest: { opacity: 0 },
                            hover: { opacity: 1 },
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-emerald-800/20" />
                          <div className="absolute inset-0 bg-[radial-gradient(at_center_center,rgba(16,185,129,0.1),transparent_70%)]" />
                        </MotionDiv>

                        <Image
                          alt=""
                          {...person.image}
                          className="h-96 w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
                        />

                        <MotionDiv
                          className="absolute inset-0 z-20 flex flex-col justify-end p-6"
                          variants={{
                            rest: { y: 0 },
                            hover: { y: -20 },
                          }}
                        >
                          <MotionP
                            className="font-display text-base/6 font-semibold tracking-wide text-white"
                            variants={{
                              rest: { opacity: 1 },
                              hover: { opacity: 0.8 },
                            }}
                          >
                            {person.name}
                          </MotionP>
                          <MotionP
                            className="mt-2 text-sm text-white"
                            variants={{
                              rest: { opacity: 0.7 },
                              hover: { opacity: 1 },
                            }}
                          >
                            {person.role}
                          </MotionP>
                        </MotionDiv>
                      </FadeIn>

                      <MotionDiv
                        className="absolute -inset-4 z-0 rounded-3xl bg-emerald-500/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                        variants={{
                          rest: { scale: 0.9 },
                          hover: { scale: 1 },
                        }}
                      />
                    </MotionSpan>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInStagger>
        ))}
      </div>
    </Container>
  )
}
export const metadata: Metadata = {
  title: 'About Us',
  description:
    'We believe that our strength lies in our collaborative approach, which puts our clients at the center of everything we do.',
}

export default async function About() {
  const blogArticles = (await loadArticles()).slice(0, 2)

  return (
    <AppLayout>
      <PageIntro eyebrow="About us" title="Our strength is collaboration">
        <p>
          We believe that our strength lies in our collaborative approach, which
          puts our clients at the center of everything we do.
        </p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>
            SeriesLab was started by three friends who noticed that developer
            studios were charging clients double what an in-house team would
            cost. Since the beginning, we have been committed to doing things
            differently by charging triple instead.
          </p>
          <p>
            At SeriesLab , we&apos;re more than just colleagues — we&apos;re a
            family. This means we pay very little and expect people to work
            late. We want our employees to bring their whole selves to work. In
            return, we just ask that they keep themselves there until at least
            6:30pm.
          </p>
        </div>
      </PageIntro>
      <Container className="mt-16">
        <StatList>
          <StatListItem value="35" label="Underpaid employees" />
          <StatListItem value="52" label="Placated clients" />
          <StatListItem value="$25M" label="Invoices billed" />
        </StatList>
      </Container>

      <Culture />

      <Team />

      <PageLinks
        className="mt-24 sm:mt-32 lg:mt-40"
        title="From the blog"
        intro="Our team of experienced designers and developers has just one thing on their mind; working on your ideas to draw a smile on the face of your users worldwide. From conducting Brand Sprints to UX Design."
        pages={blogArticles}
      />

      <ContactSection />
    </AppLayout>
  )
}
