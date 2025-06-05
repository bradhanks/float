'use client'

import { useState } from 'react'

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
    <form onSubmit={handleSubmit} className="max-w-sm">
      <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
        Sign up for our quarterly newsletter
      </h2>
      <p className="mt-4 text-sm text-neutral-700">
        We ruthlessly curate content for B2B SaaS founders.
      </p>

      <div className="relative mt-6">
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-4 text-base text-neutral-950 placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none"
        />
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
          className="mt-4 block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base text-neutral-950 placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none"
        />

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="mt-4 flex w-full items-center justify-center rounded-xl bg-neutral-950 px-4 py-3 text-white transition hover:bg-neutral-800 disabled:opacity-70"
        >
          {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
        </button>
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
