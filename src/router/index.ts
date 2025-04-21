/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import { useAuthStore } from '@/stores/auth.ts';
import type { NavigationGuardNext,RouteLocationNormalized,RouteLocationNormalizedLoaded } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

router.beforeEach(( to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) => {
  const authStore = useAuthStore();

  const isRequiredAuth = to.meta.requiresAuth
  const isRequiredAdmin = to.meta.isAdmin

  if(isRequiredAuth) {
    if (
      !authStore.isLoggedIn &&
      to.name !== '/auth/')
      next({ name: '/auth/' })
    else {
      if(isRequiredAdmin && !authStore.isAdmin) {
        next({ name: '/' })
        return
      } else
      next()
    }
  }
  else
    next()
});

export default router
