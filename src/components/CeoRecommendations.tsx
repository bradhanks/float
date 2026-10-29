import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import Border from '@/components/Border'

// LinkedIn recommendations from people who are CEOs today, quoted word for word.
const recommendations = [
  {
    name: 'Dave Grow',
    title: 'CEO',
    company: 'Lucid',
    quote: [
      'Brad was our first marketing hire at Lucid and we made the right decision!  Brad is exactly the type of person you want in a startup -- result-oriented, creative, and simply gets things done.  In addition, he has knowledge and expertise across an incredibly diverse array of areas.  One of my favorite things about Brad is that upon hire, he immediately became a champion for Lucid and developed strong relationships with many influencers in the industry.',
      'In addition, Brad is a great colleague and was incredibly well-liked by everyone; this enabled him to have influence on projects and decisions that extended well beyond marketing.  There are a number of features within Lucidchart, for example, that originated from Brad and his external relationships.',
      'We miss Brad at Lucid but are very excited for him with his new venture.  No doubt he will find a way to crush it!',
    ],
  },
  {
    name: 'Dan Cook',
    title: 'CEO',
    company: 'PDQ',
    quote: [
      "If you need something done... really anything done, Brad is the man for the job.  At Lucid he's helped to build the company's freemium model marketing funnel, but on the side he's also helped to lead our efforts in Education and our Salesforce integration among other things.  The guy knows how to get things done.",
    ],
  },
  {
    name: 'Aaron Kelly',
    title: 'CEO',
    company: 'LiTiL Labs',
    quote: [
      "When I met Brad, I had just ended my relationship with a well known marketing firm in the area.  They didn't understand how to get the results I needed and my rankings were suffering. Within days Brad had restored my rankings and even helped me finish my new site.  I don't know how he did it, but the results speak for themselves.  I have significantly more leads calling my law firm looking for my services. The best thing about working with Brad is he didn't mind the chaos of the situation. He came in with a plan and quarterbacked my employees to get the job done.  It was nice to not have to deal with the headache.",
    ],
  },
  {
    name: 'Mary Hagen',
    title: 'CEO',
    company: 'Colossal',
    quote: [
      "Brad is one of the most multi-talented businessmen I've had the pleasure of working with. He is efficient and trustworthy, and has an excellent sense of direction when pushing a project across the goal line. Brad and I have worked together on multiple occasions, and I have been extremely pleased with his performance each and every time. I consider him my go-to developer and project manager.",
    ],
  },
]

export function CeoRecommendations() {
  return (
    <>
      <SectionIntro
        eyebrow="Recommendations"
        title="What CEOs say about working with Brad"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>From LinkedIn recommendations.</p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          {recommendations.map((rec) => (
            <FadeIn key={rec.name}>
              <Border as="figure" className="pt-12">
                <blockquote className="space-y-4 text-base text-neutral-600">
                  {rec.quote.map((paragraph, i) => (
                    <p key={i}>
                      {i === 0 && '“'}
                      {paragraph}
                      {i === rec.quote.length - 1 && '”'}
                    </p>
                  ))}
                </blockquote>
                <figcaption className="mt-6">
                  <div className="font-display font-semibold text-neutral-950">
                    {rec.name}
                  </div>
                  <div className="text-sm text-neutral-600">
                    {rec.company ? `${rec.title}, ${rec.company}` : rec.title}
                  </div>
                </figcaption>
              </Border>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}
