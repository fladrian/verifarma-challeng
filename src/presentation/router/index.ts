import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@application/stores'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/movies',
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../pages/LoginPage.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/movies',
      name: 'Movies',
      component: () => import('../pages/MoviesPage.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/movies/:id',
      name: 'MovieDetail',
      component: () => import('../pages/MovieDetailPage.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' })
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next({ name: 'Movies' })
  } else {
    next()
  }
})

export default router
