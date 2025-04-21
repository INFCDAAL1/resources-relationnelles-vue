import { useAuthStore } from '@/stores/auth.ts'

export default {
  mounted (el: HTMLElement, binding: Ref<Array<String> | String>) {
    const userStore = useAuthStore()
    const currentRole = userStore.role

    const allowedRoles = Array.isArray(binding.value)
      ? binding.value
      : [binding.value]

    if (!allowedRoles.includes(currentRole)) {
      el.remove() // Cache complètement l'élément
    }
  },

  updated (el: HTMLElement, binding: Ref<Array<String> | String>) {
    // Gère le cas où le rôle change dynamiquement
    const userStore = useAuthStore()
    const currentRole = userStore.role

    const allowedRoles = Array.isArray(binding.value)
      ? binding.value
      : [binding.value]

    if (!allowedRoles.includes(currentRole)) {
      el.remove()
    }
  },
}
