'use client'

import { useId, useActionState } from 'react'
import Form from 'next/form'
import { FadeIn } from '@/components/FadeIn'
import { PostHogButton } from '@/components/PostHogButton'
import Post from '@/lib/send-email'

function TextInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  const id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="text"
        id={id}
        {...props}
        placeholder=" "
        className="focus:outline-hidden peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
      />
      <label
        htmlFor={id}
        className="peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-neutral-950 pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950"
      >
        {label}
      </label>
    </div>
  )
}

function RadioInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  return (
    <label className="flex gap-x-3">
      <input
        type="radio"
        {...props}
        className="outline-hidden h-6 w-6 flex-none appearance-none rounded-full border border-neutral-950/20 checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
      />
      <span className="text-base/6 text-neutral-950">{label}</span>
    </label>
  )
}

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(Post, {
    success: false,
    error: null,
    data: null,
  })

  return (
    <FadeIn className="lg:order-last">
      <Form
        action={formAction}
        className="mx-auto max-w-2xl rounded-2xl border border-neutral-300 bg-white px-6 py-10 sm:px-12 sm:py-16 lg:px-16 lg:py-20"
      >
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Work inquiries
        </h2>

        {state?.success && (
          <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
            <p className="text-green-800">
              Thank you! Your message has been sent successfully.
            </p>
          </div>
        )}

        {state?.error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-red-800">{state.error}</p>
          </div>
        )}

        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput label="Name" name="name" autoComplete="name" required />
          <TextInput
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            required
          />
          <TextInput
            label="Company"
            name="company"
            autoComplete="organization"
          />
          <TextInput label="Phone" type="tel" name="phone" autoComplete="tel" />
          <TextInput label="Message" name="message" required />
          <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <fieldset>
              <legend className="text-base/6 text-neutral-500">Budget</legend>
              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <RadioInput label="<$5K – $50K" name="budget" value="5" />
                <RadioInput label="$5K – $10K" name="budget" value="10" />
                <RadioInput label="$10K – $15K" name="budget" value="15" />
                <RadioInput label="More than $15K" name="budget" value="15+" />
              </div>
            </fieldset>
          </div>
        </div>
        <PostHogButton type="submit" className="mt-10" disabled={isPending}>
          {isPending ? 'Sending...' : "Let's work together"}
        </PostHogButton>
      </Form>
    </FadeIn>
  )
}
