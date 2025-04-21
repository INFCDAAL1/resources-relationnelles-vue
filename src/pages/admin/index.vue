<script setup lang="ts">
import {useAuthStore} from "@/stores/auth.ts";


</script>

<template>
<v-card title="Authentification" subtitle="CESIZEN"></v-card>
  <v-btn to="/admin/page2">Page2</v-btn>
</template>

<style scoped lang="sass">

</style>
<route lang="yaml">
meta:
  layout: default
  requiresAuth : true
  isAdmin: true
</route>
