<script setup lang="ts">
import { ref, computed, defineEmits } from 'vue';

const emit = defineEmits<{
  (e: 'email', email: string): void;
  (e: 'valide', value: boolean): void;
}>();
const formValid = ref(false);
const email = ref('');
const emailRules = ref([
  (v: string) => !!v || 'L\'email est requis',
  (v: string) => /.+@.+\..+/.test(v) || 'Le format de l\'email est incorrect',
]);

const submit = () => {
  emit('email', email.value);
  emit('valide', formValid.value);
};
</script>

<template>
  <v-card flat title="Mot de passe oublié" subtitle="Entrez votre adresse e-mail pour réinitialiser votre mot de passe">
    <template #text>
      <v-form v-model="formValid">
      <v-text-field
        label="Email"
        v-model="email"
        @input="submit"
        type="email"
        :rules="emailRules"
      />
      </v-form>
    </template>
  </v-card>
</template>

<style scoped lang="sass">

</style>
