<template>
  <div class="recipe-view">
    <h1>Recepten</h1>
    <div class="recipe-list">
      <RecipeCard
        v-for="recipe in recipes"
        :key="recipe.id"
        :picture="recipe.picture"
        :time="recipe.time"
        :title="recipe.title"
        :category="recipe.category"
        :id="recipe.id"
        :favorite="favorites.includes(recipe.id)"
        @favorite-toggled="handleFavoriteToggled"
      />
    </div>
  </div>
</template>

<script>
import RecipeCard from '@/components/RecipeCard.vue'
import { collection, getDocs } from 'firebase/firestore'
import db from '@/firebase/firebase.js'
import { getUserFavorites } from '@/firebase/favoriteService.js'

export default {
  components: { RecipeCard },
  data() {
    return {
      recipes: [],
      favorites: [],
    }
  },
  async created() {
    await this.fetchRecipes() // Fetch all recipes
    this.favorites = await getUserFavorites() // Fetch user's favorite recipe IDs
  },
  methods: {
    async fetchRecipes() {
      const q = collection(db, 'recipes') // Fetch all recipes
      const querySnap = await getDocs(q) // Await the query snapshot
      this.recipes = [] // Clear existing recipes
      querySnap.forEach((doc) => this.recipes.push({ id: doc.id, ...doc.data() })) // Populate recipes array
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
.recipe-view {
  margin: 16px 16px 80px 16px;
}

h1 {
  margin-bottom: 16px;
}

.recipe-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}
</style>
