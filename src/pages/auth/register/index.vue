<script lang="ts" setup>
import {useUserStore} from "@/stores/user.ts";
import {definePage} from "unplugin-vue-router/runtime";
import type {AxiosResponse} from "axios";
import type {AuthReponse} from "@/types";
import axios from "@/lib/axios.ts";

definePage({
  meta: {
    layout: 'auth',
    requiresAuth: false,
  },
})

const store = useUserStore();
const router = useRouter();
onMounted(() => {
  if (store.isLoggedIn) {
    router.push({name: '/'});
  }
})
const email = ref('');
const getEmail = (e: string) => {
  email.value = e;
}

const nom = ref('');
const getNom = (e: string) => {
  nom.value = e;
}

const userinfoValide = ref(false);
const getUserinfoValide = (e: boolean) => {
  userinfoValide.value = e;
}

const password = ref('');
const getPassword = (e: string) => {
  password.value = e;
}
const passwordValide = ref(false);
const getPasswordValide = (e: boolean) => {
  passwordValide.value = e;
}

const submit = () => {
  axios.post('register', {
    email: email.value,
    name: nom.value,
    password: password.value,
  }).then((response: AxiosResponse<AuthReponse>) => {
    if (response.status === 200) {
      store.setToken(response.data.token);
      store.setUser(response.data.user);
      router.push({name: '/'});
    }
  }).catch((error) => {
    console.error('Erreur lors de l\'inscription:', error);
  })
}
</script>

<template>
  <div class="d-flex flex-column align-center">
    <v-stepper :items="['Renseignement de l\'utilisateur', 'Renseignement du mot de passe', 'Confirmation']"
               width="800">
      <template v-slot:item.1>
        <StepUserInfo @email="getEmail" @nom="getNom" @valide="getUserinfoValide"/>
      </template>

      <template v-slot:item.2>
        <StepSetPassword @password="getPassword" @passwordValide="getPasswordValide"/>
      </template>
      <template v-slot:item.3>
        <StepConfirmation :email="email" :nom="nom" :password="password" :passwordValide="passwordValide"
                          :userinfoValide="userinfoValide" @submit="submit"/>
      </template>

    </v-stepper>
  </div>
</template>

<style lang="sass" scoped>

</style>
