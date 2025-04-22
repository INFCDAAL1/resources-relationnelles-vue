<script lang="ts" setup>
import {defineEmits, ref} from 'vue';

const emit = defineEmits<{
  (e: 'email', email: string): void;
  (e: 'valide', value: boolean): void;
  (e: 'nom', value: string): void;

}>();

const formValid = ref(false);

const email = ref('');
const emailRules = ref([
  (v: string) => !!v || 'L\'email est requis',
  (v: string) => /.+@.+\..+/.test(v) || 'Le format de l\'email est incorrect',
]);

const nom = ref('');
const nomRules = ref([
  (v: string) => !!v || 'Le nom est requis',
  (v: string) => v.length >= 2 || 'Le nom doit contenir au moins 2 caractères',
  (v: string) => /^[a-zA-ZÀ-ÿ\s-]+$/.test(v) || 'Le nom ne doit contenir que des lettres et des espaces',
  (v: string) => !/\s{2,}/.test(v) || 'Le nom ne doit pas contenir d\'espaces consécutifs',
  (v: string) => !/^[\s-]+$/.test(v) || 'Le nom ne doit pas être vide ou composé uniquement d\'espaces',
  (v: string) => /^[a-zA-ZÀ-ÿ-]+$/.test(v) || 'Le nom ne doit pas contenir de caractères spéciaux',
  (v: string) => /^[a-zA-ZÀ-ÿ]+$/.test(v) || 'Le nom ne doit pas contenir de chiffres',
]);

const submit = () => {
  emit('email', email.value);
  emit('valide', formValid.value);
  emit('nom', nom.value);
};
</script>

<template>
  <v-card flat subtitle="Entrez votre adresse e-mail pour réinitialiser votre mot de passe"
          title="Information utilisateur">
    <template #text>
      <div class="d-flex flex-column ga-2">
        <v-form v-model="formValid">
          <v-text-field
            v-model="nom"
            :rules="nomRules"
            label="Nom"
            @input="submit"
          />
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            type="email"
            @input="submit"
          />
        </v-form>
      </div>

    </template>
  </v-card>
</template>

<style lang="sass" scoped>

</style>
