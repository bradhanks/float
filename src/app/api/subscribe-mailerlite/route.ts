import { NextRequest, NextResponse } from 'next/server'
import MailerLite from '@mailerlite/mailerlite-nodejs'

type ParamsType = {
  email: string
  fields?: {
    name?: string
  }
  groups?: string[]
  status?:
    | 'active'
    | 'unsubscribed'
    | 'unconfirmed'
    | 'bounced'
    | 'junk'
    | undefined
}

type ErrorResponse = {
  response?: {
    data?: {
      message?: string
    }
  }
  message?: string
}

const mailerLite = new MailerLite({
  api_key: process.env.MAILERLITE_API_KEY!,
})

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 },
      )
    }

    const params: ParamsType = {
      email,
      fields: {
        name: name || '',
      },
      groups: [process.env.MAILERLITE_GROUP_ID!],
      status: 'active',
    }

    const response = await mailerLite.subscribers.createOrUpdate(params)

    return NextResponse.json({
      message: 'Successfully subscribed!',
      subscriber: response.data,
    })
  } catch (error: unknown) {
    const mailerLiteError = error as ErrorResponse

    // Handle specific MailerLite errors
    if (mailerLiteError.response?.data) {
      return NextResponse.json(
        {
          message:
            mailerLiteError.response.data.message || 'Subscription failed',
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { message: 'Failed to subscribe. Please try again later.' },
      { status: 500 },
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
}
