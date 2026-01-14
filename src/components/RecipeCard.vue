<template>
  <router-link class="recipeCard-container" :to="{ name: 'RecipeDetailView', params: { id: id } }">
    <div class="recipeCard-image">
      <img :src="picture[0]" loading="lazy" alt="recipe image" />
      <div class="favorite-overlay">
        <FavoriteButton v-model="isFavorite" @update:modelValue="handleFavoriteToggled" />
      </div>
    </div>
    <div class="recipeCard-description">
      <div class="recipe-info">
        <p class="recipe-time">{{ time }} min</p>
        <p class="recipe-category">{{ category }}</p>
      </div>
      <p class="recipe-title">{{ title }}</p>
    </div>
  </router-link>
</template>

<script>
import FavoriteButton from '@/components/FavoriteButton.vue'
import { addFavorite, removeFavorite } from '@/firebase/favoriteService.js'

export default {
  name: 'RecipeCard',
  components: { FavoriteButton },
  props: {
    id: { type: String, required: true },
    picture: { type: Array, required: true },
    time: { type: Number, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    favorite: { type: Boolean, default: false },
  },
  data() {
    return { isFavorite: this.favorite }
  },
  watch: {
    favorite(val) {
      this.isFavorite = val //change the prop to true or false
      console.log('Favorite prop changed to:', this.isFavorite)
    },
  },
  methods: {
    async handleFavoriteToggled(val) {
      this.isFavorite = val
      if (val) {
        await addFavorite(this.id) // Add to favorites in Firestore
      } else {
        await removeFavorite(this.id) // Remove from favorites in Firestore
      }
      this.$emit('favorite-toggled', { id: this.id, value: val })
    },
  },
  computed: {
    smallPicture() {
      return this.picture[0] || this.picture[1] || ''
    },
  },
}
</script>

<style scoped>
.recipeCard-container {
  display: block;
  border: 1px solid #ccc;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  overflow: hidden;
}

.recipeCard-image {
  position: relative;
}

.recipeCard-image img {
  width: 100%;
  height: auto;
}

.favorite-overlay {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  display: flex;
}

.recipeCard-description {
  padding: 12px;
}

.recipe-info {
  display: flex;
  gap: 12px;
  font-size: 14px;
}

.recipe-title {
  font-weight: bold;
  margin-top: 8px;
}
</style>
