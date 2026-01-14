<template>
  <div class="favorite-list">
    <h1>Mijn Favorieten</h1>
    <div v-if="favorites.length === 0" class="no-favorites-wrapper">
      <div class="no-favorites-message">
        <v-icon>mdi-heart-outline</v-icon>
        <p class="titleText">Nog geen recepten opgeslagen</p>
        <p>Voeg deze toe door op het hartje te klikken bij het recept.</p>
      </div>
    </div>
    <FavoriteCard
      v-for="recipe in favoriteRecipes"
      :key="recipe.id"
      :id="recipe.id"
      :picture="recipe.picture"
      :time="recipe.time"
      :title="recipe.title"
      :category="recipe.category"
      :favorite="favorites.includes(recipe.id)"
      @favorite-toggled="handleFavoriteToggled"
    ></FavoriteCard>
  </div>
</template>
<script>
import FavoriteCard from '@/components/FavoriteCard.vue'
import { collection, getDocs } from 'firebase/firestore'
import db from '@/firebase/firebase.js'
import { subscribeToUserFavorites } from '@/firebase/favoriteService.js'

export default {
  name: 'FavoriteListView',
  components: {
    FavoriteCard,
  },
  data() {
    return {
      favorites: [],
      recipes: [],
      unsubscribeFavorites: null,
    }
  },
  computed: {
    favoriteRecipes() {
      return this.recipes.filter((recipe) => this.favorites.includes(recipe.id))
    },
  },
  async created() {
    await this.fetchRecipes()
    this.unsubscribe = subscribeToUserFavorites((favoriteIds) => {
      // Real-time updates for favorites
      this.favorites = favoriteIds
    })
  },
  beforeUnmount() {
    // Unsubscribe from favorites listener to prevent memory leaks
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  },
  methods: {
    async fetchRecipes() {
      const q = collection(db, 'recipes')
      const querySnap = await getDocs(q)
      this.recipes = []
      console.log('Fetched recipes:', this.recipes)
      querySnap.forEach((doc) => this.recipes.push({ id: doc.id, ...doc.data() }))
    },
    handleFavoriteToggled({ id, value }) {
      // Update local favorites list
      if (value) {
        if (!this.favorites.includes(id)) this.favorites.push(id) // Add to favorites if not already present
        console.log('Added to favorites:', id)
      } else {
        this.favorites = this.favorites.filter((favId) => favId !== id) // Remove from favorites
        console.log('Removed from favorites:', id)
      }
    },
  },
}
</script>
<style scoped>
h1 {
  margin: 16px;
}

.favorite-list {
  margin-bottom: 80px;
}
.mdi-heart-outline {
  font-size: 64px;
  margin-bottom: 24px;
  color: var(--accent-color);
}
.no-favorites-message {
  text-align: center;
  margin-top: 0;
}
.titleText {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 4px;
}

.no-favorites-wrapper {
  display: flex; /* Use flexbox for centering */
  align-items: center;
  justify-content: center;
  min-height: 80vh; /* Ensure it takes enough vertical space */
}
</style>
