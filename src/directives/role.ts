// role.ts
import type {DirectiveBinding, ObjectDirective} from 'vue'
import {useUserStore} from '@/stores/user'

const roleDirective: ObjectDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string | string[]>) {
    const store = useUserStore()
    const currentRole = store.user?.role || ''

    const allowedRoles = Array.isArray(binding.value)
      ? binding.value
      : [binding.value]

    if (!allowedRoles.includes(currentRole)) {
      el.remove()
    }
  },

  updated(el: HTMLElement, binding: DirectiveBinding<string | string[]>) {
    const store = useUserStore()
    const currentRole = store.user?.role || ''

    const allowedRoles = Array.isArray(binding.value)
      ? binding.value
      : [binding.value]

    if (!allowedRoles.includes(currentRole)) {
      el.remove()
    }
  }
}

export default roleDirective
