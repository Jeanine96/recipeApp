const routes = [
  {
    path: '/recipe/:id',
    name: 'recipe-detail',
    component: () => import('@/views/RecipeDetailView.vue'),
    props: true,
  },
]

export default routes
