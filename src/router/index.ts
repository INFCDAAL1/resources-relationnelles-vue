/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {createRouter, createWebHistory} from 'vue-router/auto'
import {setupLayouts} from 'virtual:generated-layouts'
import {routes} from 'vue-router/auto-routes'
import {useUserStore} from '@/stores/user.ts';
import type {NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded} from 'vue-router';
import NotFound from "@/components/core/NotFound.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts([
    {
      path: '/',
      redirect: '/resource'
    },
    ...routes,
    {
      path: '/:pathMatch(.*)*', // Cela attrape toutes les routes non définies
      component: NotFound,
    },
  ]),
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

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) => {
  const store = useUserStore();

  const isRequiredAuth = to.meta.requiresAuth
  const isRequiredAdmin = to.meta.isAdmin

  if (isRequiredAuth) {
    if (
      !store.isLoggedIn &&
      to.name !== '/auth/')
      next({name: '/auth/'})
    else {
      if (isRequiredAdmin && !store.isAdmin) {
        next({name: '/'})
        return
      } else
        next()
    }
  } else
    next()
});

export default router
