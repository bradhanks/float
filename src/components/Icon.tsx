import { ComponentType, SVGAttributes } from 'react'
import * as HeroIcons from '@heroicons/react/24/solid'

import clsx from 'clsx'

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface IconProps {
  icon: ComponentType<SVGAttributes<SVGElement>>
  size?: IconSize
  className?: string
  ariaHidden?: boolean
}

function Icon({
  icon: IconComponent,
  size = 'md',
  className,
  ariaHidden = false,
}: IconProps) {
  const sizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-7 w-7',
  }[size]

  return (
    <IconComponent
      className={clsx(sizeClasses, 'shrink-0', className)}
      aria-hidden={ariaHidden}
    />
  )
}

export interface ButtonIconProps extends Omit<IconProps, 'icon'> {
  invert?: boolean
}

interface DynamicIconProps extends ButtonIconProps {
  name: keyof typeof HeroIcons
}

export default function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const IconComponent = HeroIcons[name]
  return <Icon icon={IconComponent} {...props} />
}

export function XMarkIcon(props: ButtonIconProps) {
  return <DynamicIcon name="XMarkIcon" {...props} />
}
export function MenuIcon(props: ButtonIconProps) {
  return <DynamicIcon name="Bars3Icon" {...props} />
}
