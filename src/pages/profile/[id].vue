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
const appVersion = import.meta.env.VITE_FRONT_VERSION
const apiUrl = import.meta.env.VITE_API_URL
const mode = import.meta.env.MODE
</script>

<template>
  <div class="d-flex flex-column ga-5 align-center">
    <v-card
      v-if="!user"
      title="Chargement du profil..."
    />
    <ProfilCard
      v-if="user"
      :item="user"
    />
    <v-card
      v-if="user&&user.role== 'admin'"
      class="w-sm-100 w-md-66"
      title="Configuration de l'application"
    >
      <v-card-text>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">
                Paramètre
              </th>
              <th class="text-left">
                Valeur
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Version de l'application</td>
              <td>{{ appVersion }}</td>
            </tr>
            <tr>
              <td>API URL</td>
              <td>{{ apiUrl }}</td>
            </tr>
            <tr>
              <td>Mode de développement</td>
              <td>{{ mode }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<style lang="sass" scoped>
</style>
