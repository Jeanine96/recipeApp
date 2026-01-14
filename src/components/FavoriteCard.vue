<template>
  <router-link
    class="favorite-card-container"
    :to="{ name: 'RecipeDetailView', params: { id: id } }"
  >
    <div class="favorite-card">
      <div class="image-wrapper">
        <img :src="picture[0]" loading="lazy" alt="favorite icon" />
        <div class="favorite-overlay">
          <FavoriteButton v-model="isFavorite" @update:modelValue="onFavoriteToggled" />
        </div>
      </div>
      <div class="favorite-text">
        <p class="favorite-title">{{ title }}</p>
        <p>{{ category }} • {{ time }} minuten</p>
      </div>
    </div>
  </router-link>
</template>
<script>
import FavoriteButton from '@/components/FavoriteButton.vue'
import { addFavorite, removeFavorite } from '@/firebase/favoriteService.js'
export default {
  name: 'FavoriteCard',
  components: { FavoriteButton },
  props: {
    id: { type: String, required: true },
    picture: { type: Array, required: true },
    time: { type: Number, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    favorite: { type: Boolean, required: true },
  },

  data() {
    return {
      isFavorite: this.favorite,
    }
  },
  watch: {
    favorite(val) {
      this.isFavorite = val
    },
  },
  methods: {
    async onFavoriteToggled(val) {
      this.isFavorite = val
      if (val) {
        await addFavorite(this.id) // Add to favorites in Firestore
      } else {
        await removeFavorite(this.id) // Remove from favorites in Firestore
      }
      this.$emit('favorite-toggled', { id: this.id, value: val })
    },
  },
}
</script>
<style scoped>
.favorite-card-container {
  display: block;
  text-decoration: none;
  color: inherit; /* Ensure text color is inherited */
}
.favorite-card {
  display: flex;
  width: 100%;
  border: var(--border-stroke) var(--stroke-color);
  gap: 16px;
}
.image-wrapper {
  position: relative;
  flex: 1;
}
.image-wrapper img {
  object-fit: cover;
  min-width: 0; /* Prevent image from growing too large */
  width: 100%;
  display: block;
}

.favorite-overlay {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
  display: flex;
}

.favorite-text {
  flex: 1;
  gap: 4px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 16px;
}

.favorite-title {
  font-weight: bold;
}
</style>
