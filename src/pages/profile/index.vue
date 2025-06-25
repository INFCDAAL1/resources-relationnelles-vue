<script lang="ts" setup>
import {definePage} from "unplugin-vue-router/runtime"
import {useRoute, useRouter} from "vue-router"
import axios from "@/lib/axios"
import type {User} from "@/types"
import {ref, shallowRef, watch} from "vue"
import {watchDebounced} from "@vueuse/core"

definePage({
  meta: {
    layout: 'default',
    requiresAuth: true,
  },
})

const users = ref<User[]>([])
const isLoading = ref(true)
const error = ref<Error | null>(null)

const search = shallowRef('')
const route = useRoute()
const router = useRouter()

// Fetch users based on the current search term
const fetchUsers = async () => {
  isLoading.value = true
  error.value = null
  try {
    const response = await axios.get('users/list', {
      params: {
        search: search.value || undefined, // Send undefined if search is empty to omit from query
      },
    })
    users.value = response.data.data
  } catch (err: any) {
    console.error('Erreur de récupération des utilisateurs :', err)
    error.value = err
  } finally {
    isLoading.value = false
  }
}

// Update the URL query when search input changes (debounced)
watchDebounced(search, (newSearch) => {
  // Only push to router if the query param is different to avoid redundant navigation
  if (newSearch !== (route.query.search || '')) {
    router.push({query: {search: newSearch || undefined}})
  }
}, {debounce: 300, maxWait: 1000})


// Watch for changes in the URL query to trigger a fetch
watch(() => route.query.search, (newSearchQuery) => {
  const newSearch = Array.isArray(newSearchQuery) ? newSearchQuery[0] : newSearchQuery
  search.value = newSearch || ''
  fetchUsers()
}, {immediate: true}) // immediate: true runs the watcher on component mount, replacing onMounted
</script>

<template>
  <div class="d-flex flex-column ga-5">
    <h1>Liste des utilisateurs ({{ users.length }})</h1>

    <v-alert
      v-if="error"
      title="Erreur"
      type="error"
    >
      Une erreur est survenue lors du chargement des utilisateurs.
    </v-alert>

    <v-text-field
      v-model="search"
      append-inner-icon="mdi-magnify"
      class="mb-4"
      clearable
      label="Rechercher un utilisateur"
    />

    <div
      v-if="isLoading"
      class="d-flex flex-wrap ga-4 justify-center"
    >
      <v-skeleton-loader
        v-for="n in 6"
        :key="n"
        type="card"
        width="800"
      />
    </div>


    <v-empty-state
      v-if="!isLoading && users.length === 0"
      icon="mdi-account-off-outline"
      title="Aucun utilisateur trouvé"
    />

    <div
      v-if="!isLoading"
      class="d-flex flex-wrap ga-4 justify-center"
    >
      <ProfilCard
        v-for="user in users"
        :key="user.id"
        :item="user"
      />
    </div>

    <v-fab
      v-role="['admin', 'user','moderator','superadmin']"
      app
      color="primary"
      icon="mdi-plus"
      size="75"
      to="/profile/add"
    />
  </div>
</template>

<style lang="sass" scoped>
</style>
