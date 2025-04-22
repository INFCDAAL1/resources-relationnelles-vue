<script lang="ts" setup>
  import { ref } from 'vue';
  import { definePage } from 'unplugin-vue-router/runtime';
  import { useFetch } from '../../../composables/useFetch';
  import axios from 'axios';
  import { useUserStore } from '@/stores/user.ts'

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

  const submit = async () => {
    axios.post('login', {
      email: email.value,
      password: password.value,
    })
      .then(response => {
        console.log(response.data)
        const userStore = useUserStore();
        userStore.token = response.data.token;
        userStore.user = response.data.user;
        router.push({ name: '/' });
      })
      .catch(error => {
        alert(error.message)
        console.error(error);
      });
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
              autocomplete="username"
              label="Email"
              :rules="emailRules"
              type="email"
            />
            <v-text-field
              v-model="password"
              autocomplete="current-password"
              label="Mot de passe"
              :rules="passwordRules"
              type="password"
            />
            <div class="d-flex flex-column ga-2">
              <v-btn block variant="text" @click="router.push({ name: '/auth/forgot/' })">
                Oubli de mot de passe
              </v-btn>
              <v-btn block color="primary" @click="submit">
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
