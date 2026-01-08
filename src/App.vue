<template>
  <RecipeView></RecipeView>
  <BottomNavigationBar></BottomNavigationBar>
</template>
<script>
import RecipeView from './views/RecipeView.vue'
import BottomNavigationBar from './components/BottomNavigationBar.vue'

export default {
  components: {
    RecipeView,
    BottomNavigationBar,
  },
}
</script>

<style scoped></style>
