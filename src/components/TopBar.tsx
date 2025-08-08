'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { useContext } from 'react'
import { AppLayoutContext } from '@/components/AppLayout'
import DynamicIcon from '@/components/Icon'
import { Logo, Logomark } from '@/components/Logo'
import { MotionDiv } from '@/components/MotionWrapper'
import dynamic from 'next/dynamic'


export const CalendlyButtonPlaceholder = () => (
  <button className="bg-inherit font-sans text-sm font-semibold text-neutral-900 hover:text-emerald-700 active:text-emerald-500 dark:bg-inherit dark:text-white
">Schedule call
  </button>
)
const Container = dynamic(() =>
  import('@/components/Container').then((mod) => mod.Container),
)
const Button = dynamic(() =>
  import('@/components/Button').then((mod) => mod.Button),
)
const CalendlyButton = dynamic(() =>
  import('@/components/Button').then((mod) => mod.CalendlyButton),
  {
    loading: () => <CalendlyButtonPlaceholder />,
    ssr: false

  }
)
const ContactButton = dynamic(() =>
  import('@/components/Button').then((mod) => mod.PostHogButton),
)

interface TopBarProps {
  mobileMenuId: string
  isMenuOpen: boolean
  onToggleMenu: () => void
  menuButtonRef: React.RefObject<HTMLButtonElement>
  inverted?: boolean
}

export default function TopBar({
  mobileMenuId,
  isMenuOpen,
  onToggleMenu,
  menuButtonRef,
  inverted = false,
}: TopBarProps) {
  const context = useContext(AppLayoutContext)
  const logoHovered = context?.logoHovered ?? false
  const setLogoHovered = context?.setLogoHovered ?? (() => { })

  return (
    <Container>
      <nav className="flex items-center justify-between" aria-label="Main navigation">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Home"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          <Logomark
            className="h-8 sm:hidden"
            invert={inverted}
            filled={logoHovered}
          />
          <Logo
            className="hidden h-8 sm:block"
            invert={inverted}
            filled={logoHovered}
          />
        </Link>

        {/* Desktop navigation and mobile menu button */}
        <div className="flex items-center gap-x-8">
          {/* Desktop navigation items */}
          <div className="hidden md:flex items-center gap-x-6">
            <Button invert={inverted}>
              <Link href="/services">Services</Link>
            </Button>
            <CalendlyButton invert={inverted} size="sm" />
            <ContactButton invert={inverted} href="/contact" size="sm">
              Contact us
            </ContactButton>
          </div>

          {/* Mobile menu toggle */}
          <MobileMenuButton
            menuId={mobileMenuId}
            isOpen={isMenuOpen}
            onToggle={onToggleMenu}
            buttonRef={menuButtonRef}
            inverted={inverted}
          />
        </div>
      </nav>
    </Container>
  )
}


export function MobileMenuButton({
  menuId,
  isOpen,
  onToggle,
  buttonRef,
  inverted = false,
}: {
  menuId: string
  isOpen: boolean
  onToggle: () => void
  buttonRef: React.RefObject<HTMLButtonElement>
  inverted?: boolean
}) {
  return (
    <MotionDiv
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1 }}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-controls={menuId}
        aria-label="Toggle mobile menu"
        className={clsx(
          'group -m-2.5 rounded-full p-2.5 transition-all duration-200',
          inverted
            ? 'hover:bg-white/10 focus:bg-white/10 focus:ring-white/20'
            : 'hover:bg-neutral-950/10 focus:bg-neutral-950/10 focus:ring-neutral-950/20',
          'focus:outline-none focus:ring-2 focus:ring-offset-2'
        )}
      >
        <MotionDiv
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <DynamicIcon
            name={inverted ? 'XMarkIcon' : 'Bars3Icon'}
            className={clsx(
              'h-6 w-6 transition-colors duration-200',
              inverted
                ? 'fill-white group-hover:fill-neutral-200'
                : 'fill-neutral-950 group-hover:fill-neutral-700',
            )}
          />

        </MotionDiv>
      </button>
    </MotionDiv>
  )
}
