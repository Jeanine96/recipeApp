<template>
  <div v-if="recipe" class="recipe-detail">
    <!-- Recipe image -->
    <div class="recipe-image">
      <img :src="recipe.picture[1]" loading="lazy" alt="recipe detail image" />
    </div>

    <!-- Recipe details -->
    <div class="recipe-details">
      <h1>{{ recipe.title }}</h1>

      <div class="recipe-info">
        <p>{{ recipe.time }} minutes</p>
        <p>{{ recipe.category }}</p>
      </div>

      <!-- Portion counter -->
      <PortionCounter v-model="persons" />

      <!-- Ingredients -->
      <h2>Ingredienten</h2>
      <ul>
        <li v-for="(ingredient, index) in adjustedIngredients" :key="index">
          <label class="ingredient">
            <input
              type="checkbox"
              :checked="ingredient.checked"
              @change="toggleIngredient(index)"
            />

            <span :class="{ done: ingredient.checked }">
              {{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient.name }}
            </span>
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
</template>

<script>
import { doc, getDoc } from 'firebase/firestore'
import db from '@/firebase/firebase.js'
import PortionCounter from '@/components/PortionCounter.vue'
export default {
  name: 'RecipeDetailView',
  components: { PortionCounter },
  props: {
    id: String,
  },
  data() {
    return {
      recipe: null,
      persons: 2, // base recipe is for 2 persons
    }
  },
  watch: {
    id: {
      immediate: true,
      handler(newId) {
        this.fetchRecipe(newId)
      },
    },
  },
  methods: {
    async fetchRecipe(id) {
      // Fetch recipe details from Firestore
      if (!id) return

      const docRef = doc(db, 'recipes', id) // Reference to the recipe document
      const docSnap = await getDoc(docRef) // Await the document snapshot

      if (!docSnap.exists()) {
        // If recipe does not exist
        this.recipe = null
        return
      }

      const data = docSnap.data() // Get recipe data

      this.recipe = {
        id: docSnap.id, // Include document ID in recipe
        ...data, // Spread the rest of the data
        ingredients: data.ingredients.map((i) => ({
          // Add 'checked' property to each ingredient
          amount: i.amount,
          unit: i.unit,
          name: i.name,
          checked: false,
        })),
      }
    },
    toggleIngredient(index) {
      this.recipe.ingredients[index].checked = !this.recipe.ingredients[index].checked // Toggle the 'checked' state
    },
  },
  computed: {
    adjustedIngredients() {
      // Adjust ingredient amounts based on selected persons
      if (!this.recipe) return []

      const factor = this.persons / 2

      return this.recipe.ingredients.map((ingredient) => ({
        ...ingredient,
        amount: Number.isInteger(ingredient.amount * factor)
          ? ingredient.amount * factor
          : (ingredient.amount * factor).toFixed(1),
      }))
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
