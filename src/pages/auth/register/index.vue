
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

const nom = ref('');
const getNom = (e:string) => {
  nom.value = e;
}

const userinfoValide = ref(false);
const getUserinfoValide = (e:boolean) => {
  userinfoValide.value = e;
}

const password = ref('');
const getPassword = (e:string) => {
  password.value = e;
}
const passwordValide = ref(false);
const getPasswordValide = (e:boolean) => {
  passwordValide.value = e;
}
</script>

<template>
  <div class="d-flex flex-column align-center">
    <v-stepper :items="['Renseignement de l\'utilisateur', 'Renseignement du mot de passe']" width="800">
      <template v-slot:item.1>
        <StepUserInfo @email="getEmail" @nom="getNom" @valide="getUserinfoValide"/>
      </template>

      <template v-slot:item.2>
        <StepSetPassword @password="getPassword" @passwordValide="getPasswordValide"/>
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
