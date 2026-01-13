<template>
  <BottomNavigationBar></BottomNavigationBar>
  <div id="app">
    <router-view :key="$route.fullPath" />
  </div>
  <!-- <RecipeDetailView></RecipeDetailView> -->
  <FavoriteListView></FavoriteListView>
</template>
<script>
import BottomNavigationBar from './components/BottomNavigationBar.vue'
// import RecipeDetailView from './views/RecipeDetailView.vue'
import FavoriteListView from './views/FavoriteListView.vue'
export default {
  components: {
    BottomNavigationBar,
    // RecipeDetailView,
    FavoriteListView,
  },
}
</script>

<style scoped></style>
