<script lang="ts" setup>
const router = useRouter();
</script>

<template>
  <div class="d-flex flex-column align-center justify-center ma-9">
    <v-card max-width="800" min-width="400" subtitle="La page que vous cherchez n'existe pas" title="Page 404">
    </v-card>
  </div>
</template>

<style lang="sass" scoped>

</style>

<route lang="yaml">
meta:
layout: default
requiresAuth : false
</route>
