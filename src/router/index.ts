import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ResultsView from '../views/ResultsView.vue'
const SwaggerView = () => import('@/views/SwaggerView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/results/:genome/:location/',
      name: 'results',
      component: ResultsView
    },
    {
      path: '/swagger',
      name: 'swagger',
      component: SwaggerView
    }
  ]
})

export default router
