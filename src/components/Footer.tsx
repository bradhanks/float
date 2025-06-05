import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Logo } from '@/components/Logo'
import { NewsletterForm } from '@/components/NewsletterForm'

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
  {
    title: 'Company',
    links: [
      { title: 'About Us', href: '/about' },
      { title: 'Blog', href: '/blog' },
      // { title: 'What about AI?', href: '/blog/b2b-saas-startup-ai' },
      { title: 'Contact us', href: '/contact' },
    ],
  },
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

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3 10 .5v2H0v1h10v2L16 3Z"
      />
    </svg>
  )
}

export function Footer() {
  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <Navigation />
          <div className="flex lg:justify-end">
            <NewsletterForm />
          </div>
        </div>
        <div className="mb-20 mt-24 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-12">
          <Link href="/" aria-label="Home">
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
