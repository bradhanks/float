// src/app/api/firebase/route.ts

import { NextRequest } from 'next/server'
import { db } from '@/lib/firebase'

export async function POST(request: NextRequest) {
  let data
  try {
    data = await request.json()
  } catch (e) {
    return Response.json({ error: e }, { status: 400 })
  }

  const { distinct_id, ...userData } = data

  if (!distinct_id) {
    return Response.json({ error: 'distinct_id is required' }, { status: 400 })
  }

  const docRef = db.collection('users').doc(distinct_id)

  try {
    await docRef.set(
      {
        distinct_id,
        first: 'Ada',
        last: 'Lovelace',
        born: 1815,
        last_seen: new Date().toISOString(),
        ...userData,
      },
      { merge: true },
    )

    return Response.json({
      success: true,
      distinct_id,
      message: 'User data saved!',
    })
  } catch (error) {
    return Response.json({
      success: false,
      data: null,
      error:
        'Failed to send email: ' +
        (error instanceof Error ? error.message : 'Unknown error'),
    })
  }
}
