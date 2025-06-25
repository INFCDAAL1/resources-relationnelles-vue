<script lang="ts" setup>
import {useUserStore} from "@/stores/user.ts";
import {definePage} from "unplugin-vue-router/runtime";

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
const emailValide = ref(false);
const getValide = (e: boolean) => {
  emailValide.value = e;
}
</script>

<template>
  <div class="d-flex flex-column align-center">
    <v-stepper
      :items="['Mot de passe oublié', 'Envoie du message électronique']"
      max-width="800"
    >
      <template #item.1>
        <StepForgotPassword
          @email="getEmail"
          @valide="getValide"
        />
      </template>

      <template #item.2>
        <StepSendEmail
          :email="email"
          :valide="emailValide"
        />
      </template>
    </v-stepper>
  </div>
</template>

<style lang="sass" scoped>

</style>
