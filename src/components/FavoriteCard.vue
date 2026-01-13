<template>
  <div class="favorite-card">
    <img :src="picture" alt="favorite icon" />
    <div class="favorite-text">
      <p1>{{ title }}</p1>
      <p>{{ category }} • {{ time }} minuten</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FavoriteCard',
  props: {
    id: { type: String, required: true },
    picture: { type: String, required: true },
    time: { type: Number, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    favorite: { type: Boolean, required: true },
  },
}
</script>
<style scoped>
.favorite-card {
  display: flex;
  width: 100%;
  border: var(--border-stroke) var(--stroke-color);
  gap: 16px;
}
.favorite-card img {
  flex: 1;
  object-fit: cover;
  min-width: 0; /* Prevent image from growing too large */
  width: 100%;
}
.favorite-text {
  flex: 1;
  gap: 4px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
