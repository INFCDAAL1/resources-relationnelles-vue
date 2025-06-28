<script lang="ts" setup>
import {useTheme} from 'vuetify/framework';
import {App as CapacitorApp} from '@capacitor/app';

const theme = useTheme()
const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');

const updateTheme = () => {
  theme.global.name.value = darkThemeMq.matches ? 'dark' : 'light';
};

onMounted(() => {
  darkThemeMq.addEventListener('change', updateTheme);
  updateTheme()
});

CapacitorApp.addListener('backButton', ({canGoBack}) => {
  if (!canGoBack) {
    CapacitorApp.exitApp();
  } else {
    window.history.back();
  }
});
</script>

<template>
  <SafeArea>
    <v-app fluid>
      <router-view />
    </v-app>
  </SafeArea>
</template>

