<template>
  <RecipeView></RecipeView>
  <BottomNavigationBar></BottomNavigationBar>
  <div id="app">
    <router-view :key="$route.fullPath" />
  </div>
  <!-- <RecipeDetailView></RecipeDetailView> -->
</template>
<script>
import RecipeView from './views/RecipeView.vue'
import BottomNavigationBar from './components/BottomNavigationBar.vue'
// import RecipeDetailView from './views/RecipeDetailView.vue'

export default {
  components: {
    RecipeView,
    BottomNavigationBar,
    // RecipeDetailView,
  },
}
</script>

<style scoped></style>
