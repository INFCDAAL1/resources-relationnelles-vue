<script setup lang="ts">

import {ref} from "vue";

const email = ref('');
const emailRules = ref([
  (v: string) => !!v || 'L\'email est requis',
  (v: string) => /.+@.+\..+/.test(v) || 'Le format de l\'email est incorrect',
]);

const password = ref('');
const passwordRules = ref([
  (v: string) => !!v || 'Le mot de passe est requis',
]);

const submit = () => {
  const emailValide = emailRules.value.every((rule) => rule(email.value) === true);
  const passwordValide = passwordRules.value.every((rule) => rule(password.value) === true);

  if (emailValide && passwordValide) {
    // Call your login function here
    console.log('Login successful with email:', email.value, 'and password:', password.value);
  } else {
    console.log('Login failed. Please check your credentials.');
  }
};

</script>

<template>
  <div class="d-flex flex-column align-center">
<v-card title="Connexion" subtitle="Entrez vos identifiants" width="800">
  <template #text>
    <v-text-field
      label="Email"
      v-model="email"
      type="email"
      :rules="emailRules"
    />
    <v-text-field
      label="Mot de passe"
      v-model="password"
      type="password"
      :rules="passwordRules"
    />
    <v-btn block color="primary" @click="submit">
      Connexion
    </v-btn>
  </template>
</v-card>
  </div>
</template>

<style scoped lang="sass">

</style>
<route lang="yaml">
meta:
  layout: 'auth'
  requiresAuth : false
</route>
