<script lang="ts" setup>
//
  import NavBar from '@/components/core/NavBar.vue';
  const drawer = ref(true)
</script>

<template>
  <v-main>
    <h1>Default Layout</h1>
    <AppBar @toggle-drawer="drawer = !drawer"/>
    <NavBar :show="drawer"/>
    <div class="pa-6">
      <router-view />
    </div>

  </v-main>
</template>
