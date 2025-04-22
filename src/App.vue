<script lang="ts" setup>
  import { useTheme } from 'vuetify/framework';

  const theme = useTheme()
  const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');

  const updateTheme = () => {
    theme.global.name.value = darkThemeMq.matches ? 'dark' : 'light';
  };

  onMounted(() => {
    darkThemeMq.addEventListener('change', updateTheme);
  });
</script>

<template>
  <v-app>
    <router-view />
  </v-app>
</template>
