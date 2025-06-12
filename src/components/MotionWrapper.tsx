'use client'

import { motion } from 'motion/react'

import Image from 'next/image'
import dynamic from 'next/dynamic'

export const MotionDiv = dynamic(() => import('motion/react').then(mod => mod.motion.div), { ssr: false })
export const MotionSpan = dynamic(() => import('motion/react').then(mod => mod.motion.span), { ssr: false })
export const MotionLi = dynamic(() => import('motion/react').then(mod => mod.motion.li), { ssr: false })
export const MotionDt = dynamic(() => import('motion/react').then(mod => mod.motion.dt), { ssr: false })
export const MotionDd = dynamic(() => import('motion/react').then(mod => mod.motion.dd), { ssr: false })
export const MotionH1 = dynamic(() => import('motion/react').then(mod => mod.motion.h1), { ssr: false })
export const MotionH2 = dynamic(() => import('motion/react').then(mod => mod.motion.h2), { ssr: false })
export const MotionP = dynamic(() => import('motion/react').then(mod => mod.motion.p), { ssr: false })
export const MotionPath = dynamic(() => import('motion/react').then(mod => mod.motion.path), { ssr: false })
export const MotionSvg = motion.svg
export const MotionImage = motion.create(Image)
