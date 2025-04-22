<script lang="ts" setup>
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

    <v-app-bar-title>Resources Relationnelles</v-app-bar-title>
  </v-app-bar>
</template>

<style lang="sass" scoped>

</style>
