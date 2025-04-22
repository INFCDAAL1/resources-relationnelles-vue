<script lang="ts" setup>
import {definePage} from "unplugin-vue-router/runtime";

definePage({
  meta: {
    layout: 'auth',
    requiresAuth: false,
  },
})
const router = useRouter()
</script>

<template>
  <h1>Page d'authentifiaction</h1>
  <div class="d-flex justify-center align-center ga-3">
    <v-btn height="250" prepend-icon="mdi-login" width="250" @click="router.push('/auth/login')">Connexion</v-btn>
    <v-btn height="250" prepend-icon="mdi-account-plus-outline" width="250" @click="router.push('/auth/register')">
      Inscription
    </v-btn>
  </div>
</template>

<style lang="sass" scoped>

</style>

