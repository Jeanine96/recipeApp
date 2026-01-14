<template>
  <div class="favorite-list">
    <h1>Favorieten</h1>
    <div v-if="favorites.length === 0">No favorites yet</div>
    <FavoriteCard
      v-for="recipe in favoriteRecipes"
      :key="recipe.id"
      :id="recipe.id"
      :picture="recipe.picture"
      :time="recipe.time"
      :title="recipe.title"
      :category="recipe.category"
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
</style>
