<script setup lang="ts">
import {useAuthStore} from "@/stores/auth.ts";

const authStore = useAuthStore();
const router = useRouter();
onMounted(() => {
  if (authStore.isLoggedIn) {
    router.push({ name: '/' });
  }
})
</script>

<template>
  <v-card title="Authentification" subtitle="CESIZEN">
    <template #text>
      <v-btn block color="primary" @click="router.push({ name: '/auth/login/' })">
        Connexion
      </v-btn>
      <v-btn block color="primary" @click="router.push({ name: '/auth/forgot/' })">
        Oubli de mot de passe
      </v-btn>
      <v-btn block color="primary" @click="router.push({ name: '/auth/register/' })">
        Inscription
      </v-btn>
    </template>
  </v-card>
</template>

<style scoped lang="sass">

</style>
<route lang="yaml">
meta:
  layout: 'auth'
  requiresAuth : false
</route>
