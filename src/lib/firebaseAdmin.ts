import { initializeApp, applicationDefault, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

let firebaseApp
if (!getApps().length) {
  firebaseApp = initializeApp({
    credential: applicationDefault(),
  })
} else {
  firebaseApp = getApps()[0]
}

const db = getFirestore(firebaseApp)
export { db }
