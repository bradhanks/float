import React, { useEffect, useState } from 'react'
import { PopupButton } from 'react-calendly'
import clsx from 'clsx'
import { usePostHog } from 'posthog-js/react'

export default function CalendlyButton({
  invert = false,
}: {
  invert?: boolean
}) {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)
  const posthog = usePostHog()

  useEffect(() => {
    setMounted(true)
    const header = document.querySelector<HTMLElement>('header')
    setRootElement(header || document.body)
  }, [buttonClick])

  function buttonClick() {
    posthog.capture('calendly_button_clicked')
  }

  return (
    <div>
      {mounted && rootElement && (
        <PopupButton
          url="https://calendly.com/float-consulting/meet"
          rootElement={rootElement}
          text="Schedule call"
          className={clsx(
            'bg-inherit font-sans text-sm font-semibold text-neutral-900 hover:text-emerald-700',
            'active:text-emerald-500',
            'dark:bg-inherit dark:text-white',
            invert &&
              'hover:text-emerald-500active:text-emerald-400 text-white',
          )}
          pageSettings={{
            backgroundColor: 'ffffff',
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
            primaryColor: '00a2ff',
            textColor: '4d5055',
          }}
          utm={{
            utmCampaign: 'Spring Sale 2019',
            utmContent: 'Shoe and Shirts',
            utmMedium: 'Ad',
            utmSource: 'Facebook',
            utmTerm: 'Spring',
          }}
        />
      )}
    </div>
  )
}
