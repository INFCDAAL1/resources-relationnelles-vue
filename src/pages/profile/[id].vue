<script lang="ts" setup>
import {definePage} from 'unplugin-vue-router/runtime'
import {useRoute, useRouter} from 'vue-router'
import axios from '@/lib/axios'
import type {RouteParams, User} from '@/types'
import {onMounted, ref} from 'vue'
import {useUserStore} from '@/stores/user'
import ProfilCard from '@/components/profile/ProfilCard.vue'

definePage({
  meta: {
    layout: 'default',
    requiresAuth: true,
  },
})

const route = useRoute()
const router = useRouter()
const store = useUserStore()

const user = ref<User | null>(null)

onMounted(async () => {
  const {id} = route.params as RouteParams
  const userId = Number(id)

  if (store.user && store.user.id === userId) {
    user.value = store.user
    return
  }

  try {
    const res = await axios.get(`users/${userId}`)
    user.value = res.data.data
  } catch (err) {
    console.error(`Utilisateur avec l'ID ${id} introuvable`, err)
    router.back()
  }
})
</script>

<template>
  <div class="d-flex flex-column ga-5 align-center">
    <v-card v-if="!user" title="Chargement du profil..."></v-card>
    <ProfilCard v-else :user="user"/>
  </div>
</template>

<style lang="sass" scoped>
</style>
