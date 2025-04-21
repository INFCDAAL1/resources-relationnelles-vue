<script setup lang="ts">
import {definePage} from "unplugin-vue-router/runtime";

definePage({
  meta: {
    layout: 'default',
    requiresAuth: true,
    isAdmin: true,
  },
})

</script>

<template>
<v-card title="Authentification" subtitle="CESIZEN"></v-card>
  <v-btn to="/admin/page2">Page2</v-btn>
</template>

<style scoped lang="sass">

</style>

