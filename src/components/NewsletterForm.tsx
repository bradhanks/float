'use client'

import { useState } from 'react'
import ArrowIcon from '@/components/ArrowIcon'

interface FormData {
  email: string
  name?: string
}

export function NewsletterForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
  })
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle')
  const [message, setMessage] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setMessage('')

    try {
      const response = await fetch('/api/subscribe-mailerlite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message || 'Thanks for subscribing!')
        setFormData({ email: '', name: '' }) // Reset form
      } else {
        throw new Error(data.message || 'Something went wrong.')
      }
    } catch (error: unknown) {
      setStatus('error')
      setMessage(
        error instanceof Error
          ? error.message
          : 'Failed to subscribe. Please try again later.',
      )
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md">
      <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950 sm:text-base">
        Sign up for our quarterly newsletter
      </h2>
      <p className="mt-4 text-sm text-neutral-700 sm:text-base">
        We curate content for B2B SaaS founders.
      </p>

      <div className="relative mt-6">
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email address"
          autoComplete="email"
          aria-label="Email address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-32 text-base text-neutral-950 placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none sm:pr-40"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <button
            type="submit"
            aria-label="Submit"
            disabled={status === 'submitting'}
            className="group flex h-10 w-full max-w-[120px] items-center justify-center rounded-xl bg-neutral-950 px-3 py-2 text-sm text-white transition hover:bg-neutral-800 sm:h-12 sm:max-w-none sm:px-6 sm:text-base"
          >
            {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
            <ArrowIcon className="ml-1 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {status === 'success' && (
        <p className="mt-2 text-sm text-green-600">{message}</p>
      )}
      {status === 'error' && (
        <p className="mt-2 text-sm text-red-600">{message}</p>
      )}
    </form>
  )
}
