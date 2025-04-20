import { useUserStore } from '@/stores/user.ts'

export default {
  mounted(el: HTMLElement, binding: any) {
    const userStore = useUserStore()
    const currentRole = userStore.role

    const allowedRoles = Array.isArray(binding.value)
      ? binding.value
      : [binding.value]

    if (!allowedRoles.includes(currentRole)) {
      el.remove() // Cache complètement l'élément
    }
  },

  updated(el: HTMLElement, binding: any) {
    // Gère le cas où le rôle change dynamiquement
    const userStore = useUserStore()
    const currentRole = userStore.role

    const allowedRoles = Array.isArray(binding.value)
      ? binding.value
      : [binding.value]

    if (!allowedRoles.includes(currentRole)) {
      el.remove()
    }
  }
}
