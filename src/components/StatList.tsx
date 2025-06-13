'use client'

import Border from '@/components/Border'

import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { MotionDiv, MotionDt, MotionDd } from '@/components/MotionWrapper'

export function StatList({
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof FadeInStagger>, 'children'> & {
  children: React.ReactNode
}) {
  return (
    <FadeInStagger {...props}>
      <dl className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none">
        {children}
      </dl>
    </FadeInStagger>
  )
}

export function StatListItem({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <Border as={FadeIn} position="left" className="flex flex-col-reverse pl-8">
      <MotionDiv
        className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-gradient-to-b from-emerald-400 to-emerald-600 transition-transform duration-700"
        whileHover={{
          scaleY: 1,
          transition: {
            duration: 0.5,
            ease: [0.19, 1, 0.22, 1],
          },
        }}
      />

      <MotionDt
        className="mt-2 text-base text-neutral-600"
        whileHover={{
          x: 8,
          transition: { duration: 0.3 },
        }}
      >
        {label}
      </MotionDt>

      <MotionDd
        className="font-display text-3xl font-semibold text-neutral-950 sm:text-4xl"
        whileHover={{
          scale: 1.03,
          x: 4,
          transition: {
            duration: 0.4,
            ease: 'backOut',
          },
        }}
      >
        {value}
      </MotionDd>
    </Border>
  )
}
