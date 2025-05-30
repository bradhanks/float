'use server'

import { Resend, type CreateEmailResponse } from 'resend'
import { EmailTemplate } from '@/components/ContactEmail'

const resend = new Resend(process.env.RESEND_API_KEY)
const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev'
const toEmail = 'brad@seedtoseries.com'

// Define the state type
type FormState = {
  success: boolean
  error: string | null
  data: CreateEmailResponse | null
}

export default async function Post(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    // Extract form data - note your form uses 'name', not 'firstName'
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const company = formData.get('company') as string
    const phone = formData.get('phone') as string
    const message = formData.get('message') as string
    const budget = formData.get('budget') as string

    // Validate required fields
    if (!name || !email || !message) {
      return {
        success: false,
        error: 'Please fill in all required fields.',
        data: null,
      }
    }

    // Send email using await
    const response = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `New Contact Form Submission from ${name}`,
      react: EmailTemplate({
        firstName: name, // Map 'name' to 'firstName' for the template
        email,
        company,
        phone,
        message,
        budget,
      }),
      replyTo: email,
      headers: {
        'X-Email-Template': 'contact-form',
      },
    })

    return {
      success: true,
      data: response,
      error: null,
    }
  } catch (error) {
    console.error('Error sending email:', error)

    return {
      success: false,
      data: null,
      error: 'Failed to send email. Please try again later.',
    }
  }
}
