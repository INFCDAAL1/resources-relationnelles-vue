// Utilities
import {defineStore} from 'pinia'
import type {User} from '@/types';

export const useUserStore = defineStore('auth', {
  state: () => ({
    token: "oui" as User['token'] | null,
    validity: null as Date | null,
    user: {id:0,name:"Bob",role:"admin"} as User,
  }),

  getters: {
    isLoggedIn: state => !!state.token,
    isAdmin: state => state.user ? state.user.role === 'admin':false,
  },
})
