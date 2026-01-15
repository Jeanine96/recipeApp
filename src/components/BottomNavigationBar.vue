<template>
  <v-layout class="overflow-visible">
    <v-bottom-navigation :model-value="activeTab" @update:model-value="handleTabChange" bg-color="var(--secondary-color)" grow>
      <v-btn value="recipes" :to="{ name: 'recipe-view' }">
        <v-icon>mdi-silverware-fork-knife</v-icon>
        <span>Recepten</span>
      </v-btn>

      <v-btn value="favorites" :to="{ name: 'FavoriteListView' }">
        <v-icon>mdi-heart</v-icon>
        <span>Favorieten</span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()

    const activeTab = computed(() => { // Determine active tab based on current route
      if (route.name === 'recipe-view' || route.name === 'RecipeDetailView') {
        return 'recipes'
      } else if (route.name === 'FavoriteListView') {
        return 'favorites'
      }
      return 'recipes'
    })

    const handleTabChange = (value) => { // value is either 'recipes' or 'favorites'
      if (value === 'recipes') {
        router.push({ name: 'recipe-view' })
      } else if (value === 'favorites') {
        router.push({ name: 'FavoriteListView' })
      }
    }

    return { activeTab, handleTabChange }
  },
}
</script>

<style scoped>
/* Force the color for ALL buttons in the nav */
:deep(.v-btn) {
  --v-theme-overlay-multiplier: 1; /* Ensures text is fully opaque */
  color: var(--font-color) !important;
}

/* Force the color for the SELECTED button */
:deep(.v-btn--selected) {
  color: var(--primary-color) !important;
}

/* Ensure the icon follows the text color */
:deep(.v-icon) {
  color: inherit !important;
}
</style>
