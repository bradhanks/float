'use client'

import React, { useEffect, useRef, useState, useId } from 'react'
import dynamic from 'next/dynamic'
import { MotionConfig } from 'motion/react'
import { useReducedMotion } from 'motion/react'

const Header = dynamic(() => import('@/components/Header'))
const Footer = dynamic(() => import('@/components/Footer')

)
const BackgroundPattern = dynamic(() => import('@/components/BackgroundPattern'))

const MotionDiv = dynamic(() => import('@/components/MotionWrapper').then((mod) => (mod.MotionDiv
)))

export default function PageShell({ children }: { children: React.ReactNode }) {
  const mobileMenuId = useId()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null!)
  const closeButtonRef = useRef<HTMLButtonElement>(null!)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    function handleLinkClick(event: MouseEvent) {
      if (
        event.target instanceof HTMLElement &&
        event.target.closest('a')?.href === window.location.href
      ) {
        setIsAnimating(false)
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('click', handleLinkClick)
    return () => window.removeEventListener('click', handleLinkClick)
  }, [])

  const toggleMobileMenu = () => {
    setIsAnimating(true)
    setIsMobileMenuOpen((prev) => !prev)
  }

  return (
    <MotionConfig
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }
      }
    >
      <Header
        mobileMenuId={mobileMenuId}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={toggleMobileMenu}
        menuButtonRef={menuButtonRef}
        closeButtonRef={closeButtonRef}
      />

      <MotionDiv
        layout
        style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        className="relative flex flex-auto overflow-hidden bg-white pt-14"
        transition={{
          layout: { duration: shouldReduceMotion ? 0 : 0.3 }
        }}
      >
        <MotionDiv
          layout
          className="relative isolate flex w-full flex-col pt-9"
          animate={{
            x: 0,
            opacity: 1
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.2,
            delay: isAnimating ? 0.1 : 0
          }}
        >
          <BackgroundPattern className="absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full mask-[linear-gradient(to_bottom_left,white_40%,transparent_50%)] fill-neutral-50 stroke-emerald-950/5"
            yOffset={-96}
            interactive
          />

          <main className="w-full flex-auto">{children}</main>

          <Footer />
        </MotionDiv>
      </MotionDiv>
    </MotionConfig>
  )
}
