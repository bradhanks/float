'use client'

import { useRef } from 'react'
import Image, { type ImageProps } from 'next/image'
import { useMotionTemplate, useScroll, useTransform } from 'framer-motion'
import { MotionImage } from '@/components/MotionWrapper'

export function GrayscaleTransitionImage(
  props: Pick<ImageProps, 'src' | 'quality' | 'className' | 'sizes'> & {
    alt?: string
  },
) {
  const ref = useRef<React.ComponentRef<'div'>>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 65%', 'end 35%'],
  })
  const grayscale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, 1])
  const filter = useMotionTemplate`grayscale(${grayscale})`
  return (
    <div ref={ref} className="group relative">
      <MotionImage alt="" style={{ filter }} {...props} />
      <div
        className="pointer-events-none absolute left-0 top-0 w-full opacity-0 transition duration-300 group-hover:opacity-100"
        aria-hidden="true"
      >
        <Image alt="" {...props} />
      </div>
    </div>
  )
}
