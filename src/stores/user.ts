// Utilities
import {defineStore} from 'pinia'
import type {User} from '@/types';

export const useUserStore = defineStore('auth', {
  state: () => ({
    token: "" as User['token'] | null,
    validity: null as Date | null,
    user: null as User | null,
  }),

  getters: {
    isLoggedIn: state => !!state.token,
    isAdmin: state => state.user ? state.user.role === 'admin':false,
  },
})
