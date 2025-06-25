// role.ts
import type {DirectiveBinding, ObjectDirective} from 'vue'
import {useUserStore} from '@/stores/user'
import type {User} from "@/types";

const roleDirective: ObjectDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding<User["role"] | User["role"][]>) {
    const store = useUserStore()
    const currentRole: User["role"] = store.user?.role || 'user'

    const allowedRoles = Array.isArray(binding.value)
      ? binding.value
      : [binding.value]

    if (!allowedRoles.includes(currentRole)) {
      el.remove()
    }
  },

  updated(el: HTMLElement, binding: DirectiveBinding<User["role"] | User["role"][]>) {
    const store = useUserStore()
    const currentRole: User["role"] = store.user?.role || 'user'

    const allowedRoles = Array.isArray(binding.value)
      ? binding.value
      : [binding.value]

    if (!allowedRoles.includes(currentRole)) {
      el.remove()
    }
  }
}

export default roleDirective
