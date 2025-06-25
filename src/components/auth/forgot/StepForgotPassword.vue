<script lang="ts" setup>
import {defineEmits, ref} from 'vue';

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
  <v-card
    flat
    subtitle="Entrez votre adresse e-mail pour réinitialiser votre mot de passe"
    title="Mot de passe oublié"
  >
    <template #text>
      <v-form v-model="formValid">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Email"
          type="email"
          @update:model-value="submit"
        />
      </v-form>
    </template>
  </v-card>
</template>

<style lang="sass" scoped>

</style>
