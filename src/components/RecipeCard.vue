<template>
    <div class="recipeCard-container">
      <div class="recipeCard-image">
        <img src="https://images.pexels.com/photos/842142/pexels-photo-842142.jpeg" alt="recipe image" />
      </div>
      <div class="recipeCard-description">
        <p class="recipe-time">tijd</p>
        <p class="recipe-title">titel</p>
      </div>
    </div>
</template>
<script>
    import { query, collection, getDocs } from "firebase/firestore"
import db from "../firebase/firebase.js"

export default {
  data() {
    return {
      recipes: []
    }
  },
  async created() {
    await this.getRecipes()
  },
  methods: {
    async getRecipes() {
      const q = query(collection(db, 'recipes'))
      const querySnap = await getDocs(q)

      this.recipes = [] 

      querySnap.forEach((doc) => {
        this.recipes.push({
          id: doc.id,
          ...doc.data()
        })
      })
        console.log(this.recipes)
    }
  }
}




</script>
<style scoped>
    .recipeCard-container {
      width: 100%;
      border: var(--border-color) var(--border-width) solid;
      border-radius: var(--border-radius);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .recipeCard-image img {
      width: 100%;
      height: auto;
      border-top-left-radius: var(--border-radius);
      border-top-right-radius: var(--border-radius);
    }
    .recipeCard-description {
      padding: 16px;
    }

    .recipe-time {
      font-size: var(--font-size-bodytext);
    }

    .recipe-title {
      font-size: var(--font-size-bodytext);
      font-weight: bold;
      margin-top: 8px;
    }
</style>