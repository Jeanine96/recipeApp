<template>
  <RecipeCard
    v-for="recipe in recipes"
    :key="recipe.id"
    :picture="recipe.picture"
    :time="recipe.time"
    :title="recipe.title"
    :category="recipe.category"
  ></RecipeCard>
</template>
<script>
import RecipeCard from './components/RecipeCard.vue'
import './assets/main.css'

import { collection, getDocs } from 'firebase/firestore'
import db from './firebase/firebase.js'

export default {
  components: {
    RecipeCard,
  },
  data() {
    return {
      recipes: [],
    }
  },
  async created() {
    await this.getRecipes()
  },
  methods: {
    async getRecipes() {
      const q = collection(db, 'recipes')
      const querySnap = await getDocs(q)

      this.recipes = []

      querySnap.forEach((doc) => {
        this.recipes.push({
          id: doc.id,
          ...doc.data(),
        })
      })
      console.log(this.recipes.title)
    },
  },
}
</script>

<style scoped></style>
