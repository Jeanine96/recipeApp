<template>
  <div v-if="recipe" class="recipe-detail">
    <!-- Recipe image -->
    <div class="recipe-image">
      <img :src="recipe.picture" alt="recipe detail image" />
    </div>

    <!-- Recipe details -->
    <div class="recipe-details">
      <h1>{{ recipe.title }}</h1>
      <div class="recipe-info">
        <p>{{ recipe.time }} minutes</p>
        <p>{{ recipe.category }}</p>
      </div>

      <!-- Ingredients -->
      <h2>Ingredienten</h2>
      <ul>
        <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
          <label class="ingredient">
            <input type="checkbox" v-model="ingredient.checked" />
            <span :class="{ done: ingredient.checked }">{{ ingredient.text }}</span>
          </label>
        </li>
      </ul>

      <!-- Instructions -->
      <h2>Bereidingswijze</h2>
      <ol>
        <li v-for="(instruction, index) in recipe.instructions" :key="index">
          {{ instruction }}
        </li>
      </ol>
    </div>
  </div>

  <!-- Loading fallback removed to avoid showing message during navigation -->
</template>

<script>
import { doc, getDoc } from 'firebase/firestore'
import db from '@/firebase/firebase.js'
export default {
  name: 'RecipeDetailView',
  props: {
    id: String, // This comes from route.params.id if using props:true in router
  },
  data() {
    return {
      recipe: null,
    }
  },
  async mounted() {
    // Initial fetch when component mounts
    await this.fetchRecipe(this.id)
  },
  watch: {
    // Watch for changes to the id prop (when navigating to another recipe)
    id: {
      immediate: true,
      handler(newId) {
        this.fetchRecipe(newId)
      },
    },
  },
  methods: {
    async fetchRecipe(id) {
      console.log('Fetching recipe for ID:', id) // check ID received
      if (!id) return

      try {
        const docRef = doc(db, 'recipes', id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          console.log('Recipe data:', data) // data fetched from Firestore

          // Convert ingredients to objects with checked
          const ingredients = data.ingredients.map((i) => ({ text: i, checked: false }))
          const instructions = data.instructions

          this.recipe = {
            id: docSnap.id,
            ...data,
            ingredients,
            instructions,
          }

          console.log('Recipe assigned:', this.recipe) // final recipe object
        } else {
          console.warn('No such document!')
          this.recipe = null
        }
      } catch (error) {
        console.error('Error fetching recipe:', error)
        this.recipe = null
      }
    },
  },
}
</script>

<style scoped>
.recipe-image img {
  width: 100%;
  height: auto;
}
h1 {
  margin-bottom: 8px;
}
.recipe-details {
  padding: 16px 16px 64px 16px;
}

li {
  list-style-type: none;
}

ul {
  padding-bottom: 20px;
}

.recipe-info {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.ingredient {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  position: relative;
  padding-bottom: 8px;
}
.ingredient input {
  /* visually hide native control but keep it accessible */
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.ingredient span {
  position: relative;
  padding-left: 44px; /* space for custom box */
}
/* unchecked stroke (box) */
.ingredient span::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid var(--primary-color);
  background: transparent;
  box-sizing: border-box;
}
/* checkmark (hidden when unchecked) */
.ingredient span::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg) scale(0);
  width: 6px;
  height: 10px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transition: transform 0.12s ease-in-out;
}
/* checked state: fill box and show white check */
.ingredient input:checked + span::before {
  background: var(--primary-color);
  border-color: var(--primary-color);
}
.ingredient input:checked + span::after {
  transform: translateY(-50%) rotate(45deg) scale(1);
}

.done {
  text-decoration: line-through;
  opacity: 0.7;
}

/* Numbered circular markers for instruction steps (flex layout for controllable gaps) */
ol {
  counter-reset: step;
  padding-left: 0;
}
ol li {
  counter-increment: step;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 18px;
}
ol li::before {
  content: counter(step);
  width: 36px;
  height: 36px;
  min-width: 36px;
  min-height: 36px;
  flex: 0 0 36px;
  box-sizing: border-box;
  border-radius: 50%;
  background: var(--secondary-color);
  color: var(--primary-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: var(--font-size-bodytext);
  line-height: 1;
  padding: 0;
  overflow: hidden;
}
</style>
