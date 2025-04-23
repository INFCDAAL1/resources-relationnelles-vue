<script lang="ts" setup>
import { definePage } from "unplugin-vue-router/runtime"
import { useRouter, useRoute } from "vue-router"
import axios from "@/lib/axios"
import type { User } from "@/types"
import { ref, onMounted, shallowRef, watch } from "vue"

definePage({
  meta: {
    layout: 'default',
    requiresAuth: true,
  },
})

const users = ref<User[]>([])
const isLoading = ref(true)
const error = ref()

const search = shallowRef('')
const route = useRoute()
const router = useRouter()

// Rechercher dans les utilisateurs
watch(search, (newVal) => {
  updateQuery()
})

const fetchUsers = async () => {
  isLoading.value = true
  try {
    const response = await axios.get('users')
    users.value = response.data.data
  } catch (err) {
    console.error('Erreur de récupération des utilisateurs :', err)
    error.value = err
  } finally {
    isLoading.value = false
  }
}

const updateQuery = () => {
  const query: Record<string, any> = {}
  if (search.value) query.search = search.value
  router.push({ query })
}

onMounted(async () => {
  const searchQuery = route.query.search
  if (searchQuery) {
    search.value = searchQuery.toString()
  }
  await fetchUsers()
})
</script>

<template>
  <div class="d-flex flex-column ga-5">
    <h1>Liste des utilisateurs ({{ users.length }})</h1>

    <v-alert v-if="error" title="Erreur" type="error">
      Une erreur est survenue lors du chargement des utilisateurs.
    </v-alert>

    <div v-if="isLoading" class="d-flex justify-center my-5">
      <v-progress-circular indeterminate color="primary" />
    </div>

    <v-text-field
      v-model="search"
      label="Rechercher un utilisateur"
      append-inner-icon="mdi-magnify"
      clearable
      class="mb-4"
    />

    <v-empty-state
      v-if="!isLoading && users.length === 0"
      title="Aucun utilisateur trouvé"
      icon="mdi-account-off-outline"
    />

    <div v-if="!isLoading" class="d-flex flex-wrap ga-4">
      <ProfilCard v-for="user in users" :key="user.id" :user="user" />
    </div>

    <v-fab v-role="['admin', 'user','moderator','superadmin']" app color="primary" icon="mdi-plus" size="75"
           to="/profile/add"></v-fab>
  </div>
</template>

<style lang="sass" scoped>
</style>
