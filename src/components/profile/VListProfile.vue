<script lang="ts" setup>
  import { useUserStore } from '@/stores/user'

  const store = useUserStore()

</script>

<template>
  <v-list-item
    v-if="store.isLoggedIn && store.user"
    nav
    :title="store.user.name"
  >
    <template #append>
      <v-btn
        color="red"
        icon="mdi-logout"
        variant="text"
      />
    </template>
  </v-list-item>
  <v-list-item
    v-else
    title="Login"
  >
    <template #append>
      <v-btn
        color="primary"
        icon="mdi-login"
        to="/auth/login"
        variant="text"
      />
    </template>
  </v-list-item>

</template>

<style lang="sass" scoped>

</style>
