<script setup lang="ts">
const router = useRouter();
</script>

<template>
  <div class="d-flex flex-column align-center justify-center ma-9">
<v-card title="Page 404" subtitle="La page que vous cherchez n'existe pas" width="800">
</v-card>
  </div>
</template>

<style scoped lang="sass">

</style>

<route lang="yaml">
meta:
  layout: default
  requiresAuth : false
</route>
