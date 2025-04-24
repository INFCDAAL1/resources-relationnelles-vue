<script lang="ts" setup>
import {useTheme} from 'vuetify/framework';

const theme = useTheme()
const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');

const updateTheme = () => {
  theme.global.name.value = darkThemeMq.matches ? 'dark' : 'light';
};

onMounted(() => {
  darkThemeMq.addEventListener('change', updateTheme);
  updateTheme()
});
</script>

<template>
  <SafeArea>
  <v-app fluid>
    <router-view/>
  </v-app>
  </SafeArea>
</template>

