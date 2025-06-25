<script lang="ts" setup>
import type {User} from '@/types'
import {useUserStore} from "@/stores/user.ts"

const props = defineProps<{
  modelValue: User | undefined
}>()

const emit = defineEmits<{
  (e: 'submit', form: Partial<User>): void
}>()

const {modelValue} = toRefs(props)
const store = useUserStore()


const form = ref<Partial<User>>({
  name: '',
  email: '',
  role: 'user',
})

watch(modelValue, (value) => {
  if (value) {
    form.value = {...value}
  }
}, {immediate: true})

const handleSubmit = () => {
  emit('submit', form.value)
}
</script>

<template>
  <v-form @submit.prevent="handleSubmit">
    <v-text-field
      v-model="form.name"
      label="Nom"
      required
    />

    <v-text-field
      v-model="form.email"
      label="Email"
      required
      type="email"
    />

    <v-select
      v-if="store.user&&store.user.role !== 'user' && store.user.id === modelValue?.id"
      v-model="form.role"
      :items="['user', 'admin', 'moderator', 'superadmin']"
      label="Rôle"
      required
    />

    <v-btn
      class="mt-4"
      color="primary"
      type="submit"
    >
      Valider
    </v-btn>
  </v-form>
</template>

<style scoped>
</style>
