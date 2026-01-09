<template>
  <v-layout class="overflow-visible" style="height: 56px;">
    <v-bottom-navigation
      v-model="value"
      bg-color="var(--secondary-color)"
      grow
    >
      <v-btn>
        <v-icon>mdi-silverware-fork-knife</v-icon>
        <span>Recepten</span>
      </v-btn>

      <v-btn>
        <v-icon>mdi-heart</v-icon>
        <span>Favorieten</span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script setup>
  import { ref } from 'vue'
  const value = ref(0)
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