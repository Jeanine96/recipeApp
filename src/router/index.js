import { createRouter, createWebHistory } from 'vue-router'
import RecipeView from '@/views/RecipeView.vue'

const routes = [
  {
    path: '/',
    name: 'recipe-view',
    component: RecipeView,
  },
  {
    path: '/recipe/:id',
    name: 'recipe-detail',
    component: () => import('@/views/RecipeDetailView.vue'),
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
