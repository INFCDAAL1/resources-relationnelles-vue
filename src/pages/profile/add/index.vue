<script lang="ts" setup>
import {definePage} from "unplugin-vue-router/runtime"
import type {User} from "@/types"
import axios from "@/lib/axios"
import ProfilForm from "@/components/profile/ProfilForm.vue"
import {useRouter} from "vue-router"
import {ref} from "vue"

definePage({
  meta: {
    layout: 'default',
    requiresAuth: true,
  },
})

const router = useRouter()
const user: Ref<User | undefined> = ref()

const alert = ref('')
const alertType = ref<'success' | 'error'>('success')

const submit = async (formData: Partial<User>) => {
  try {
    const res = await axios.post('/users', formData)
    console.log("Utilisateur créé :", res.data.data)

    alert.value = 'Utilisateur créé avec succès.'
    alertType.value = 'success'

    setTimeout(() => {
      router.push(`/profile/${res.data.data.id}`)
    }, 1500)

  } catch (error) {
    console.error("Erreur lors de la création du profil :", error)
    alert.value = "Une erreur est survenue lors de la création de l'utilisateur."
    alertType.value = 'error'
  }
}
</script>

<template>
  <div>
    <h1 class="text-h5 mb-4">
      Ajout d’un utilisateur
    </h1>

    <v-alert
      v-if="alert"
      :type="alertType"
      border="start"
      class="mb-4"
      closable
      variant="tonal"
      @click:close="alert = ''"
    >
      {{ alert }}
    </v-alert>

    <ProfilForm
      :model-value="user"
      @submit="submit"
    />
  </div>
</template>

<style scoped>
</style>
