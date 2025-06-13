'use client'

import { createContext, useState } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const PageShell = dynamic(() => import('@/components/PageShell'))

export const AppLayoutContext = createContext<{
  logoHovered: boolean
  setLogoHovered: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [logoHovered, setLogoHovered] = useState(false)

  return (
    <AppLayoutContext.Provider value={{ logoHovered, setLogoHovered }}>
      <PageShell key={pathname}>{children}</PageShell>
    </AppLayoutContext.Provider>
  )
}
