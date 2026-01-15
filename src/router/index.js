import { createRouter, createWebHistory } from 'vue-router'
import RecipeView from '@/views/RecipeView.vue'

const routes = [
  {
    path: '/',
    name: 'recipe-view',
    component: RecipeView,
  },
  {
    path: '/views/RecipeDetailView/:id',
    name: 'RecipeDetailView',
    component: () => import('@/views/RecipeDetailView.vue'),
    props: true,
    meta: { section: 'recipes' },
  },
  {
    path: '/views/FavoriteListView',
    name: 'FavoriteListView',
    component: () => import('@/views/FavoriteListView.vue'),
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to) => {
  document.title = to.meta.title || 'Recepten App'
})

export default router
