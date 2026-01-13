<template>
  <div class="favorite-card">
    <img
      src="https://images.pexels.com/photos/842142/pexels-photo-842142.jpeg"
      alt="favorite icon"
    />
    <div class="favorite-text">
      <p1>Yoghurt</p1>
      <p>15 minuten</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FavoriteCard',
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
