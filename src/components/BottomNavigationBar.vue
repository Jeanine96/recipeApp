<template>
  <v-layout class="overflow-visible">
    <v-bottom-navigation v-model="active" bg-color="var(--secondary-color)" grow>
      <v-btn value="recipe-view" :to="{ name: 'recipe-view' }">
        <v-icon>mdi-silverware-fork-knife</v-icon>
        <span>Recepten</span>
      </v-btn>

      <v-btn value="favorite-list" :to="{ name: 'FavoriteListView' }">
        <v-icon>mdi-heart</v-icon>
        <span>Favorieten</span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const active = ref('recipe-view')

    watch(
      () => route.name, // Watch for route name changes
      (name) => {
        active.value = name // Update active button based on route name
      },
      { immediate: true }, // Run immediately to set initial value
    )

    return {
      active, // Bind active to the template
    }
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
