<template>
  <div class="recipeCard-container" @click="goToRecipeDetail">
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
  </div>
</template>
<script>
export default {
  name: 'RecipeCard',
  props: {
    picture: String,
    time: Number,
    title: String,
    category: String,
  },
  methods: {
    goToRecipeDetail() {
      this.$router.push({ name: 'RecipeDetailView', params: { id: this.id }, state: { recipe: this.recipe } })
    },
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

.recipe-info {
  display: flex;
  gap: 16px;
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
