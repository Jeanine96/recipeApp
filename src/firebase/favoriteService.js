import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import db from '@/firebase/firebase.js'

// single user
const userId = 'user123'
const userRef = doc(db, 'users', userId)

export async function getUserFavorites() {
  const userSnap = await getDoc(userRef)
  if (userSnap.exists()) {
    return userSnap.data().favorites || []
  }
  return []
}

export async function addFavorite(recipeId) {
  await updateDoc(userRef, {
    favorites: arrayUnion(recipeId),
  })
}

export async function removeFavorite(recipeId) {
  await updateDoc(userRef, {
    favorites: arrayRemove(recipeId),
  })
}
