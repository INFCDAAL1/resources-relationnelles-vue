<script lang="ts" setup>
import { useDisplay } from 'vuetify';

const emit = defineEmits<{
  (e: 'toggleDrawer'): void
}>();

const { mdAndUp } = useDisplay();

const toggleDrawer = () => {
  emit('toggleDrawer');
};

const isDev = import.meta.env.DEV;
</script>

<template>
  <v-app-bar
    density="compact"
    elevation="3"
  >
    <template #prepend>
      <!-- Le bouton n'est affiché que sur les écrans de taille moyenne et inférieure -->
      <v-app-bar-nav-icon v-if="!mdAndUp" @click="toggleDrawer" />
    </template>

    <v-app-bar-title>Resources Relationnelles <span v-if="isDev"> - DEV</span></v-app-bar-title>
  </v-app-bar>
</template>

<style lang="sass" scoped>

</style>
