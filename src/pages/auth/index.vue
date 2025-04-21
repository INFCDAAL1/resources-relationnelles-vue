<script setup lang="ts">
import {useAuthStore} from "@/stores/auth.ts";

const authStore = useAuthStore();
const router = useRouter();
onMounted(() => {
  if (authStore.isLoggedIn) {
    router.push({ name: '/' });
  }
})
</script>

<template>
<v-card title="Authentification" subtitle="CESIZEN"></v-card>
</template>

<style scoped lang="sass">

</style>
<route lang="yaml">
meta:
  layout: 'auth'
  requiresAuth : false
</route>
