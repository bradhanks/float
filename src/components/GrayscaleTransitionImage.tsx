'use client'

import { useRef } from 'react'
import Image, { type ImageProps } from 'next/image'
import { useMotionTemplate, useScroll, useTransform } from 'motion/react'
import { MotionImage } from '@/components/MotionWrapper'

export function GrayscaleTransitionImage(
  props: Pick<
    ImageProps,
    'src' | 'quality' | 'className' | 'sizes' | 'priority'
  > & { alt?: string },
) {
  let ref = useRef<React.ComponentRef<'div'>>(null)
  let { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 65%', 'end 35%'],
  })
  let grayscale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, 1])
  let filter = useMotionTemplate`grayscale(${grayscale})`

  return (
    <div ref={ref} className="group relative">
      <MotionImage
        alt=""
        style={{ filter } as any}
        {...props}
        src={typeof props.src === 'string' ? props.src : (props.src as any)}
      />
      <div
        className="pointer-events-none absolute top-0 left-0 w-full opacity-0 transition duration-300 group-hover:opacity-100"
        aria-hidden="true"
      >
        <Image alt="" {...props} />
      </div>
    </div>
  )
}
