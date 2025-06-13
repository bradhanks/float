import Link from 'next/link'
import dynamic from 'next/dynamic'
const Container = dynamic(() =>
  import('@/components/Container').then((mod) => mod.Container),
)
const FadeIn = dynamic(() =>
  import('@/components/FadeIn').then((mod) => mod.FadeIn),
)
const Logo = dynamic(() => import('@/components/Logo').then((mod) => mod.Logo))
const NewsletterForm = dynamic(() =>
  import('@/components/NewsletterForm').then((mod) => mod.NewsletterForm),
)

const navigation = [
  {
    title: 'Services',
    links: [
      { title: 'Fractional CMO', href: '/services/fractional-cmo' },
      { title: 'User Growth', href: '/services/user-growth' },
      { title: 'Martech Solutions', href: '/services/martech-solutions' },
      {
        title: 'Attribution & Analytics',
        href: '/services/attribution-analytics',
      },
    ],
  },
  // {
  //   title: 'Customers',
  //   links: [
  //     { title: 'Lucid Software', href: '/customers/lucid-software' },
  //     { title: 'NewtonX', href: '/customers/newtonx' },
  //     { title: 'Zight', href: '/customers/zight' },
  //     { title: 'Einblick', href: '/customers/einblick-ai' },
  //   ],
  // },
  // {
  //   title: 'Company',
  //   links: [
  //     { title: 'About Us', href: '/about' },
  //     { title: 'Blog', href: '/blog' },
  //     // { title: 'What about AI?', href: '/blog/b2b-saas-startup-ai' },
  //     { title: 'Contact us', href: '/contact' },
  //   ],
  // },
]
function Navigation() {
  return (
    <nav>
      <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
        {navigation.map((section, sectionIndex) => (
          <li key={sectionIndex}>
            <div className="font-display text-sm font-semibold tracking-wider text-neutral-950">
              {section.title}
            </div>
            <ul role="list" className="mt-4 text-sm text-neutral-700">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex} className="mt-4">
                  <Link
                    href={link.href}
                    className="transition hover:text-neutral-950"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function Footer() {
  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-start lg:justify-between">
          <div className="w-full text-center lg:w-auto lg:text-left">
            <Navigation />
          </div>

          <div className="w-full max-w-md text-center lg:w-auto lg:text-right">
            <NewsletterForm />
          </div>
        </div>

        <div className="mb-20 mt-24 flex flex-col items-center justify-center gap-4 border-t border-neutral-950/10 pt-12 text-center">
          <Link href="/" aria-label="Home" className="shrink-0">
            <Logo className="h-8" fillOnHover />
          </Link>

          <p className="text-sm text-neutral-700">
            © Float Consulting, LLC. {new Date().getFullYear()}
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}
