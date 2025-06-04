'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { Container } from '@/components/Container'

function NavigationRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="even:mt-px sm:bg-neutral-950">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2">{children}</div>
      </Container>
    </div>
  )
}

function NavigationItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={clsx(
        'group relative isolate -mx-6 bg-neutral-950 px-6 py-10 even:mt-px sm:mx-0 sm:px-0 sm:py-16 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l sm:even:border-neutral-800 sm:even:pl-16',
        isActive && 'bg-emerald-900/20',
      )}
    >
      <span className="absolute inset-y-0 -z-10 w-screen bg-neutral-900 opacity-0 transition group-odd:right-0 group-even:left-0 group-hover:opacity-100" />
      <span
        className={clsx(
          'relative after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:origin-left after:scale-x-0 after:bg-emerald-400 after:transition-transform after:ease-[cubic-bezier(0.95,0.05,0.795,0.035) after:duration-300 group-hover:after:scale-x-100',
          isActive && 'after:scale-x-100'
        )}
      >
        {children}
      </span>
    </Link >
  )
}

export default function Navigation() {
  return (
    <nav className="font-display mt-px text-5xl font-medium tracking-tight text-white">
      <NavigationRow>
        <NavigationItem href="/services/martech-solutions">
          Martech Solutions
        </NavigationItem>
        <NavigationItem href="/services/user-growth">
          User Growth
        </NavigationItem>
      </NavigationRow>
      <NavigationRow>
        <NavigationItem href="/services/attribution-analytics">
          Attribution Analytics
        </NavigationItem>
        <NavigationItem href="/services/fractional-cmo">
          Fractional CMO
        </NavigationItem>
      </NavigationRow>
    </nav>
  )
}
