<template>
  <div class="favorite-list">
    <h1>Favorieten</h1>
    <FavoriteCard></FavoriteCard>
  </div>
</template>
<script>
import FavoriteCard from '@/components/FavoriteCard.vue'
export default {
  name: 'FavoriteListView',
  components: {
    FavoriteCard,
  },
  props: {
    id: { type: String, required: true },
    picture: { type: String, required: true },
    time: { type: Number, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
  },
}
</script>
<style scoped>
h1 {
  margin: 16px;
}
</style>
