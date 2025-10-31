import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

const SITE_DOC_PATH = ['siteConfig', 'main']

export async function fetchSiteConfig() {
  const docRef = doc(db, SITE_DOC_PATH[0], SITE_DOC_PATH[1])
  const snap = await getDoc(docRef)
  return snap.exists() ? snap.data() : null
}

export async function saveSiteConfig(config) {
  const docRef = doc(db, SITE_DOC_PATH[0], SITE_DOC_PATH[1])
  await setDoc(docRef, config, { merge: true })
}

