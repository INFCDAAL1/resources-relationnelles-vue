<script setup lang="ts">
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
  <v-btn @click="router.push('/auth/login')" height="250" width="250" prepend-icon="mdi-login">Connexion</v-btn>
   <v-btn @click="router.push('/auth/register')" height="250" width="250" prepend-icon="mdi-account-plus-outline">Inscription</v-btn>
 </div>
</template>

<style scoped lang="sass">

</style>

