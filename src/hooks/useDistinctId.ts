'use client'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

let distinctIdCache: string | null = null

export function useDistinctId(): string {
  const [distinctId, setDistinctId] = useState<string>('')

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Use cached value if available
    if (distinctIdCache) {
      setDistinctId(distinctIdCache)
      return
    }

    const key = '__lets_talk'
    let id = localStorage.getItem(key)

    if (!id) {
      id = uuidv4()
      localStorage.setItem(key, id)
    }

    distinctIdCache = id
    setDistinctId(id)
  }, [])

  return distinctId
}
