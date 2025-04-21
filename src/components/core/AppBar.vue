<script setup lang="ts">
const emit = defineEmits<{
  (e: 'toggleDrawer'): void
}>()
const toggleDrawer = () => {
  emit('toggleDrawer')
}
</script>

<template>
  <v-app-bar density="compact" elevation="3">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>CESIZen</v-app-bar-title>
  </v-app-bar>
</template>

<style scoped lang="sass">

</style>
