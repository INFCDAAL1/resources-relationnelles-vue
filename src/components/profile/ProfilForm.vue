<script lang="ts" setup>
import type { User } from '@/types'
import { ref, watch, toRefs } from 'vue'

const props = defineProps<{
  modelValue: User | undefined
}>()

const emit = defineEmits<{
  (e: 'submit', form: Partial<User>): void
}>()

const { modelValue } = toRefs(props)

const form = ref<Partial<User>>({
  name: '',
  email: '',
  role: 'user',
})

watch(modelValue, (value) => {
  if (value) {
    form.value = { ...value }
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('submit', form.value)
}
</script>

<template>
  <v-form @submit.prevent="handleSubmit">
    <v-text-field
      label="Nom"
      v-model="form.name"
      required
    />

    <v-text-field
      label="Email"
      type="email"
      v-model="form.email"
      required
    />

    <v-select
      label="Rôle"
      :items="['user', 'admin', 'moderator', 'superadmin']"
      v-model="form.role"
      required
    />

    <v-btn type="submit" color="primary" class="mt-4">Valider</v-btn>
  </v-form>
</template>

<style scoped>
</style>
