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
        :recipe="recipe"
      ></RecipeCard>
    </div>
  </div>
</template>
<script>
import RecipeCard from '@/components/RecipeCard.vue'
import { collection, getDocs } from 'firebase/firestore'
import db from '@/firebase/firebase.js'

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

<style scoped>
.recipe-view {
  margin: 16px 16px 80px 16px;
}

h1 {
  margin-bottom: 16px;
  color: var(--primary-color);
}

.recipe-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}
</style>
