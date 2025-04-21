<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const store = useAuthStore()
</script>

<template>
  <v-list-item
    prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
    title="John Leider"
    nav
    v-if="store.isLoggedIn"
  >
    <template v-slot:append>
      <v-btn
        icon="mdi-logout"
        color="red"
        variant="text"
      ></v-btn>
    </template>
  </v-list-item>
  <v-list-item
    title="Login"
    v-else
  >
    <template v-slot:append>
      <v-btn
        icon="mdi-login"
        color="primary"
        variant="text"
        to="/auth"
      ></v-btn>
    </template>
  </v-list-item>

</template>

<style scoped lang="sass">

</style>
