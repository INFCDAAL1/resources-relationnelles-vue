<script lang="ts" setup>
import {ref} from "vue";
import {definePage} from "unplugin-vue-router/runtime";

definePage({
  meta: {
    layout: 'auth',
    requiresAuth: false,
  },
})
const router = useRouter()

const formValid = ref(false);
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

  if (formValid) {
    // Call your login function here
    console.log('Login successful with email:', email.value, 'and password:', password.value);
  } else {
    console.log('Login failed. Please check your credentials.');
  }
};

</script>

<template>
  <div class="d-flex flex-column align-center">
    <v-card subtitle="Entrez vos identifiants" title="Connexion" width="800">
      <template #text>
        <div class="d-flex flex-column ga-3">
          <v-form v-model="formValid">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              autocomplete="username"
              label="Email"
              type="email"
            />
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              autocomplete="current-password"
              label="Mot de passe"
              type="password"
            />
            <div class="d-flex flex-column ga-2">
              <v-btn block variant="text" @click="router.push({ name: '/auth/forgot/' })">
                Oubli de mot de passe
              </v-btn>
              <v-btn :disabled="formValid" block color="primary" @click="submit">
                Connexion
              </v-btn>
              <v-btn block color="secondary" @click="router.push({ name: '/auth/register/' })">
                Inscription
              </v-btn>
            </div>
          </v-form>
        </div>
      </template>
    </v-card>
  </div>
</template>

<style lang="sass" scoped>

</style>
