<!-- <template>
  <router-link class="recipeCard-container" :to="{ name: 'recipe-detail', params: { id: id } }">
    <div class="recipeCard-image">
      <img :src="picture" alt="recipe image" />
    </div>
    <div class="recipeCard-description">
      <div class="recipe-info">
        <p class="recipe-time">{{ time }} minuten</p>
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
    picture: String,
    time: Number,
    title: String,
    category: String,
    id: String,
    recipe: Object,
  },
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

.recipe-info {
  display: flex;
  gap: 16px;
}

.recipe-title {
  font-weight: bold;
  margin-top: 8px;
}
</style> -->

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
  justify-content: space-between;
  font-size: 14px;
}

.recipe-title {
  font-weight: bold;
  margin-top: 8px;
}
</style>
