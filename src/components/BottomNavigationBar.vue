<template>
  <v-layout class="overflow-visible" style="height: 56px;">
    <v-bottom-navigation
      v-model="value"
      color="primary"
      active
    >
      <v-btn>
        <v-icon>mdi-silverware-fork-knife</v-icon>
        Recepten
      </v-btn>

      <v-btn>
        <v-icon>mdi-heart</v-icon>
        Favorites
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>
<script setup>
  import { ref } from 'vue'
  const value = ref(0)
</script>