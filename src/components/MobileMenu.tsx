'use client'

import { MotionDiv } from '@/components/MotionWrapper'
import { AnimatePresence } from 'motion/react'
import dynamic from 'next/dynamic'
const Container = dynamic(() =>
  import('@/components/Container').then((mod) => mod.Container),

)
import { Offices } from '@/components/Offices'
import { QuickContact } from '@/components/QuickContact'


const MainNavigation = dynamic(() => import('@/components/MainNavigation'))


// const MobileMenuFooter = dynamic(() =>
//   import('@/components/MobileMenu').then((mod) => mod.MobileMenuFooter),
// )
const TopBar = dynamic(() =>
  import('@/components/TopBar')
)

interface MobileMenuProps {
  menuId: string
  isOpen: boolean
  onToggle: () => void
  closeButtonRef: React.RefObject<HTMLButtonElement>
}

export default function MobileMenu({
  menuId,
  isOpen,
  onToggle,
  closeButtonRef,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <MotionDiv
          key="mobile-menu-panel"
          id={menuId}
          initial={{
            height: 0,
            opacity: 0
          }}
          animate={{
            height: 'auto',
            opacity: 1
          }}
          exit={{
            height: 0,
            opacity: 0
          }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
            height: { duration: 0.3 },
            opacity: { duration: 0.2 }
          }}
          className="relative z-50 overflow-hidden bg-neutral-950 pt-2"
          aria-hidden={isOpen ? undefined : 'true'}
        >
          <MotionDiv
            className="bg-neutral-800"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{
              delay: 0.1,
              duration: 0.25,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            {/* Mobile menu header with close button */}
            <div className="bg-neutral-950 pb-16 pt-14">
              <TopBar
                mobileMenuId={menuId}
                isMenuOpen={isOpen}
                onToggleMenu={onToggle}
                menuButtonRef={closeButtonRef}
                inverted={true}
              />
            </div>

            {/* Main navigation links */}
            <NavigationSection delay={0.15}>
              <MainNavigation />
            </NavigationSection>

            {/* Footer with offices and contact */}
            <NavigationSection delay={0.2}>
              <MobileMenuFooter />
            </NavigationSection>
          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  )
}

// Helper component for staggered animations
function NavigationSection({
  children,
  delay = 0
}: {
  children: React.ReactNode
  delay?: number
}) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{
        delay,
        duration: 0.2
      }}
    >
      {children}
    </MotionDiv>
  )
}

function MobileMenuFooter() {
  return (
    <div className="relative bg-neutral-950 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-neutral-800">
      <Container>
        <div className="grid grid-cols-1 gap-y-10 pb-16 pt-10 sm:grid-cols-2 sm:pt-16">
          <div>
            <h2 className="font-display text-base font-semibold text-white">
              Our offices
            </h2>
            <Offices
              invert
              className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2"
            />
          </div>
          <div className="sm:border-l sm:border-transparent sm:pl-16">
            <h2 className="font-display text-base font-semibold text-white"></h2>
            <QuickContact
              invert
              className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2"
            />
          </div>
        </div>
      </Container>
    </div>
  )
}
import Link from 'next/link'
