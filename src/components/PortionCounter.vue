<template>
  <div class="portion-counter-container">
    <p>Aantal personen</p>
    <div class="counter-controls">
      <v-icon @click="decrement" :disabled="modelValue <= 1">mdi-minus</v-icon>

      <span>{{ modelValue }}</span>
      <v-icon @click="increment">mdi-plus</v-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PortionCounter',
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    increment() {
      this.$emit('update:modelValue', this.modelValue + 1)
    },
    decrement() {
      if (this.modelValue > 1) {
        this.$emit('update:modelValue', this.modelValue - 1)
      }
    },
  },
}
</script>
<style scoped>
.portion-counter-container {
  display: flex;
  color: var(--primary-color);
  align-items: center;
  background-color: var(--secondary-color);
  border-radius: 8px;
  padding: 12px;
  justify-content: space-between;
  margin-bottom: 16px;
}
.counter-controls {
  gap: 16px;
  display: flex;
  align-items: center;
}
</style>
