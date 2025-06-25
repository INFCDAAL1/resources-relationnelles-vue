<script lang="ts" setup>
import {computed, defineEmits, ref} from 'vue';

const emit = defineEmits<{
  (e: 'password', value: string): void;
  (e: 'passwordValide', value: boolean): void;
}>();

const password = ref('');
const confirmPassword = ref('');

const passwordRules = [
  (v: string) => !!v || 'Le mot de passe est requis',
  (v: string) => v.length >= 8 || '8 caractères minimum',
  (v: string) => /[A-Z]/.test(v) || '1 majuscule requise',
  (v: string) => /[a-z]/.test(v) || '1 minuscule requise',
  (v: string) => /[0-9]/.test(v) || '1 chiffre requis',
  (v: string) => /[!@#$%^&*(),.?":{}|<>]/.test(v) || '1 caractère spécial requis',
];

const confirmPasswordRules = computed(() => [
  (v: string) => !!v || 'Confirmation requise',
  (v: string) => v === password.value || 'Les mots de passe ne correspondent pas',
]);

const formValid = ref(false);
const form = ref();

const submit = async () => {
  const result = await form.value?.validate();
  emit('password', password.value);
  emit('passwordValide', result?.valid ?? false);
};
</script>

<template>
  <v-card
    flat
    subtitle="Entrez votre mot de passe"
    title="Mot de passe"
  >
    <template #text>
      <v-form
        ref="form"
        v-model="formValid"
      >
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Mot de passe"
          type="password"
          @blur="submit"
        />
        <v-text-field
          v-model="confirmPassword"
          :rules="confirmPasswordRules"
          label="Confirmation"
          type="password"
          @blur="submit"
        />
      </v-form>
    </template>
  </v-card>
</template>
