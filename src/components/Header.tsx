'use client'

import { useContext } from 'react'
import { AppLayoutContext } from '@/components/AppLayout'
import dynamic from 'next/dynamic'

const TopBar = dynamic(() => import('@/components/TopBar')
)
const MobileMenu = dynamic(() => import('@/components/MobileMenu')

)

interface HeaderProps {
  mobileMenuId: string
  isMobileMenuOpen: boolean
  onToggleMobileMenu: () => void
  menuButtonRef: React.RefObject<HTMLButtonElement>
  closeButtonRef: React.RefObject<HTMLButtonElement>
}

export default function Header({
  mobileMenuId,
  isMobileMenuOpen,
  onToggleMobileMenu,
  menuButtonRef,
  closeButtonRef,
}: HeaderProps) {
  return (
    <header>
      {/* Fixed top bar */}
      <div
        className="absolute left-0 right-0 top-2 z-40 pt-14"
        aria-hidden={isMobileMenuOpen ? 'true' : undefined}
      >
        <TopBar
          mobileMenuId={mobileMenuId}
          isMenuOpen={isMobileMenuOpen}
          onToggleMenu={onToggleMobileMenu}
          menuButtonRef={menuButtonRef}
        />
      </div>

      {/* Mobile navigation menu */}
      <MobileMenu
        menuId={mobileMenuId}
        isOpen={isMobileMenuOpen}
        onToggle={onToggleMobileMenu}
        closeButtonRef={closeButtonRef}
      />
    </header>
  )
}
