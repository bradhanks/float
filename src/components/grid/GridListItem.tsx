import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import Border from '@/components/Border'

import { FadeIn } from '@/components/FadeIn'
import DynamicIcon from '@/components/Icon'

export function GridListItem({
  title,
  children,
  className,
  invert = false,
  href,
}: {
  title: string
  children: React.ReactNode
  className?: string
  invert?: boolean
  href?: string
}) {
  return (
    <li
      className={clsx(
        'group flex flex-col text-base',
        invert ? 'text-neutral-300' : 'text-neutral-600',
        (href && 'cursor-pointer transition-all') || 'hover:bg-emerald-100/10',
        className,
      )}
    >
      <div className="flex flex-1 flex-col">
        <Border
          position="left"
          className="relative h-full pl-8"
          invert={invert}
        >
          <div
            className={clsx(
              'flex-1 rounded-lg px-4 transition-all duration-200',
              href && 'group-hover:scale-[1.02]',
            )}
          >
            <FadeIn>
              {href ? (
                <Link
                  href={href}
                  className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <strong
                    className={clsx(
                      'font-semibold',
                      'transition-colors group-hover:text-emerald-700',
                      invert ? 'text-white' : 'text-neutral-950',
                    )}
                  >
                    {title}. &nbsp;
                  </strong>
                  {children}
                </Link>
              ) : (
                <>
                  <strong
                    className={clsx(
                      'font-semibold',
                      'transition-colors group-hover:text-emerald-700',
                      invert ? 'text-white' : 'text-neutral-950',
                    )}
                  >
                    {title}. &nbsp;
                  </strong>
                  {children}
                </>
              )}
            </FadeIn>
          </div>
        </Border>
      </div>
    </li>
  )
}

export function GridListItemWithButton({
  title,
  children,
  className,
  invert = false,
  href,
}: {
  title: string
  children: React.ReactNode
  className?: string
  invert?: boolean
  href?: string
}) {
  return (
    <li
      className={clsx(
        'group flex flex-col text-base',
        invert ? 'text-neutral-300' : 'text-neutral-600',
        (href && 'cursor-pointer transition-all') || 'hover:bg-emerald-100/10',
        className,
      )}
    >
      <div className="flex flex-1 flex-col">
        <Border
          position="left"
          className="relative h-full p-8"
          invert={invert}
        >
          <div
            className={clsx(
              'flex-1 rounded-lg px-4 transition-all duration-200',
            )}
          >
            <FadeIn>
              {href ? (
                <Link
                  href={href}
                  className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <strong
                    className={clsx(
                      'font-semibold',
                      'transition-colors group-hover:text-emerald-700',
                      invert ? 'text-white' : 'text-neutral-950',
                    )}
                  >
                    {title}. &nbsp;
                  </strong>
                  {children}
                </Link>
              ) : (
                <>
                  <strong
                    className={clsx(
                      'font-semibold',
                      'transition-colors group-hover:text-emerald-700',
                      invert ? 'text-white' : 'text-neutral-950',
                    )}
                  >
                    {title}. &nbsp;
                  </strong>
                  {children}
                </>
              )}
            </FadeIn>
          </div>
          <a
            href={href}
            className="group sm:absolute  sm:-bottom-3 lg:bottom-0 right-0 z-10 sm:flex sm:gap-x-3 text-base font-semibold text-neutral-950 transition-all duration-200 hover:opacity-80 group-hover:text-emerald-700"
            aria-label={`Read more: ${title}`}
          >
            Learn More
            <DynamicIcon
              name="ArrowLongRightIcon"
              className={clsx(
                'duration-50 hidden lg:block sm:flex-none self-center fill-current transition-transform group-hover:translate-x-0.5',
              )}
              ariaHidden
            />
            <span className="absolute inset-0" />
          </a>

          {/* //   <Button */}
          {/* //   mode="primary" */}
          {/* //   className={clsx( */}
          {/* //     'absolute bottom-0 right-0 z-10 transition-all duration-200 mt-4', */}
          {/* //     'bg-gray-300 text-gray-500 pointer-events-none cursor-not-allowed', */}
          {/* //     'group-hover:bg-emerald-600 group-hover:text-white group-hover:pointer-events-auto' */}
          {/* //   )} */}
          {/* //   disabled={false} */}
          {/* // > */}
          {/* //   Click Me */}
          {/* // </Button> */}
        </Border>
      </div>
    </li>
  )
}
