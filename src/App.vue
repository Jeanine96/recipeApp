<template>
  <BottomNavigationBar></BottomNavigationBar>
  <div id="app">
    <router-view :key="$route.fullPath" />
  </div>
  <RecipeDetailView></RecipeDetailView>
</template>
<script>
import BottomNavigationBar from './components/BottomNavigationBar.vue'
import RecipeDetailView from './views/RecipeDetailView.vue'

export default {
  components: {
    BottomNavigationBar,
    RecipeDetailView,
  },
}
</script>

<style scoped></style>
