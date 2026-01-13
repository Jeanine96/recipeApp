<template>
  <router-link class="recipeCard-container" :to="{ name: 'RecipeDetailView', params: { id: id } }">
    <div class="recipeCard-image">
      <img :src="picture" alt="recipe image" />
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
export default {
  name: 'RecipeCard',
  props: {
    id: { type: String, required: true },
    picture: { type: String, required: true },
    time: { type: Number, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
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

.recipeCard-image img {
  width: 100%;
  height: auto;
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
