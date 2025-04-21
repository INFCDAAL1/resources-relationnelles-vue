
<script setup lang="ts">
import {useAuthStore} from "@/stores/auth.ts";

const authStore = useAuthStore();
const router = useRouter();
onMounted(() => {
  if (authStore.isLoggedIn) {
    router.push({ name: '/' });
  }
})
const email = ref('');
const getEmail = (e:string) => {
  email.value = e;
}
const emailValide = ref(false);
const getValide = (e:boolean) => {
  emailValide.value = e;
}
</script>

<template>
  <div class="d-flex flex-column align-center">
  <v-stepper :items="['Mot de passe oublié', 'Envoie du message électronique']" width="800">
    <template v-slot:item.1>
      <StepForgotPassword @email="getEmail" @valide="getValide"/>
    </template>

    <template v-slot:item.2>
      <StepSendEmail :email="email" :valide="emailValide"/>
    </template>

  </v-stepper>
  </div>
</template>

<style scoped lang="sass">

</style>
<route lang="yaml">
meta:
  layout: 'auth'
  requiresAuth : false
</route>
