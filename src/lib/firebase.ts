import { initializeApp, applicationDefault, cert } from 'firebase-admin/app'

let firebaseApp: ReturnType<typeof initializeApp> | null = null

function initializeFirebase() {
  if (firebaseApp) return firebaseApp

  if (process.env.NODE_ENV === 'development') {
    firebaseApp = initializeApp({
      credential: applicationDefault(),
    })
  } else if (process.env.NODE_ENV === 'production') {
    try {
      if (!process.env.CREDENTIALS_BASE64) {
        throw new Error('Missing CREDENTIALS_BASE64 environment variable')
      }

      const serviceAccount = JSON.parse(
        Buffer.from(process.env.CREDENTIALS_BASE64, 'base64').toString(),
      )

      firebaseApp = initializeApp({
        credential: cert(serviceAccount),
      })
    } catch (error) {
      return error
    }
  }

  return firebaseApp
}
