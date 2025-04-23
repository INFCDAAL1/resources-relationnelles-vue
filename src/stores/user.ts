// Utilities
import { defineStore } from 'pinia'
import type { User } from '@/types';
import { useStorage } from '@vueuse/core';

export const useUserStore = defineStore('auth', {
  state: () => ({
    token: useStorage('token','' as User['token'] | null,localStorage),
    validity:  useStorage('validity',null as Date | null,localStorage),
    user:  useStorage('user',null as User | null,localStorage),
  }),

  getters: {
    isLoggedIn: state => !!state.token,
    isAdmin: state => state.user ? state.user.role === 'admin':false,
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
    logout () {
      this.token = null
      this.validity = null
      this.user = null
    },
  },
})
