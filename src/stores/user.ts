// Utilities
import {defineStore} from 'pinia'
import type {User} from '@/types';
import {useStorage} from '@vueuse/core';
import axios from "@/lib/axios.ts";

export const useUserStore = defineStore('auth', {
  state: () => ({
    token: useStorage('token', '' as User['token'] | null, localStorage),
    validity: useStorage('validity', null as Date | null, localStorage),
    user: useStorage<User | null>('user', null, localStorage, {
      serializer: {
        read: (v: string) => JSON.parse(v),
        write: (v: User | null) => JSON.stringify(v),
      },
    }),
  }),

  getters: {
    isLoggedIn: state => !!state.token,
    isAdmin: state => state.user ? state.user.role === 'admin' : false,
  },
  actions: {
    setUser(user: User) {
      this.user = user
    },
    setToken(token: User['token']) {
      this.token = token
    },
    setValidity(validity: Date) {
      this.validity = validity
    },
    logout() {
      axios.post('logout').then(() => {
        console.log('Déconnexion réussie')
      }).catch(() => {
        console.error('Erreur lors de la déconnexion')
      }).finally(() => {
        this.token = null
        this.user = null
        this.validity = null
        location.reload()
      })

    },
  },
})
