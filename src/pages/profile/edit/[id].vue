<script lang="ts" setup>
import {definePage} from "unplugin-vue-router/runtime"
import {useRoute, useRouter} from "vue-router"
import axios from "@/lib/axios"
import type {RouteParams, User} from "@/types"
import {onMounted, ref} from "vue"
import ProfilForm from "@/components/profile/ProfilForm.vue"
import {useUserStore} from "@/stores/user.ts"

definePage({
  meta: {
    layout: 'default',
    requiresAuth: true,
  },
})

const route = useRoute()
const router = useRouter()
const store = useUserStore()

const user = ref<User | undefined>(undefined)

const alert = ref('')
const alertType = ref<'success' | 'error'>('success')

const submit = async (formData: Partial<User>) => {
  try {
    if (!user.value) return

    const res = await axios.put(`/users/${user.value.id}`, {
      id: user.value.id,
      email: formData.email,
      name: formData.name,
      role: formData.role,
    })
    console.log("Utilisateur mis à jour :", res.data.data)

    alert.value = 'Profil mis à jour avec succès.'
    alertType.value = 'success'

    // Optionnel : attendre 1-2 secondes avant de rediriger
    setTimeout(() => {
      router.push(`/profile/${user.value!.id}`)
    }, 1500)

  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", error)
    alert.value = "Une erreur est survenue lors de la mise à jour du profil."
    alertType.value = 'error'
  }
}

onMounted(async () => {
  const {id} = route.params as RouteParams
  const userId = Number(id)

  if (store.user && store.user.id === userId) {
    user.value = store.user
    return
  }

  try {
    const res = await axios.get(`/users/${id}`)
    user.value = res.data.data
  } catch (error) {
    console.error("Erreur lors du chargement de l'utilisateur :", error)
    router.back()
  }
})
</script>

<template>
  <div>
    <h1 class="text-h5 mb-4">
      Modification du profil
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

    <v-card
      v-if="!user"
      title="Chargement du profil..."
    />
    <ProfilForm
      v-else
      :model-value="user"
      @submit="submit"
    />
  </div>
</template>

<style scoped>
</style>
