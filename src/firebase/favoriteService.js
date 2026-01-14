// src/firebase/favoriteService.js
import { doc, onSnapshot, setDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import db from '@/firebase/firebase.js'

const userId = 'user123'
const userRef = doc(db, 'users', userId)

export function subscribeToUserFavorites(callback) {
  if (typeof callback !== 'function') {
    throw new Error('subscribeToUserFavorites expects a function as argument')
  }

  return onSnapshot(userRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data().favorites || [])
    } else {
      callback([])
    }
  })
}

export async function addFavorite(recipeId) {
  await setDoc(userRef, { favorites: arrayUnion(recipeId) }, { merge: true })
}

export async function removeFavorite(recipeId) {
  await setDoc(userRef, { favorites: arrayRemove(recipeId) }, { merge: true })
}
