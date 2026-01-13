<template>
  <button
    class="favorite-button"
    @click.stop.prevent="toggle"
    :aria-pressed="modelValue"
    aria-label="Toggle favorite"
  >
    <v-icon>{{ modelValue ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
  </button>
</template>
<script>
export default {
  name: 'FavoriteButton',
  props: {
    modelValue: { type: Boolean, required: true },
  },
  emits: ['update:modelValue'], // Declare the emitted event
  methods: {
    toggle() {
      this.$emit('update:modelValue', !this.modelValue) // Emit the updated value
    },
  },
}
</script>
<style scoped>
.favorite-button {
  border-radius: 50%;
  border: none;
  width: 32px;
  height: 32px;
  background-color: var(--background-color);
}

.mdi-heart {
  color: var(--accent-color);
}
.mdi-heart-outline {
  color: var(--font-color);
}
</style>
