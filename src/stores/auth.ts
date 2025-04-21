// Utilities
import { defineStore } from 'pinia'
import type { User } from '@/types';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    role:'admin' as User['role'],
    token: "" as User['token'] | null,
    validity: null as Date | null,
    name: 'Anonymous' as User['name'],
  }),

  getters: {
    isLoggedIn: state => !!state.token,
    isAdmin: state => state.role === 'admin',
  },
})
