// Utilities
import { defineStore } from 'pinia'
import type {User} from "@/types";

export const useUserStore = defineStore('user', {
  state: () => ({
   role:'admin' as User['role'],
    token: null as User['token'] | null,
    name: "Anonymous" as User['name'],
  }),
})
