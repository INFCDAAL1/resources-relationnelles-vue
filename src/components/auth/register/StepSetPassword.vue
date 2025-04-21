<script setup lang="ts">
import { ref, computed, defineEmits } from 'vue';

const emit = defineEmits<{
  (e: 'password', value: string): void;
  (e: 'passwordValide', value: boolean): void;
}>();

const password = ref('');
const passwordRules = ref([
  (v: string) => !!v || 'Le mot de passe est requis',
  (v: string) => v.length >= 8 || 'Le mot de passe doit contenir au moins 8 caractères',
  (v: string) => /[A-Z]/.test(v) || 'Le mot de passe doit contenir au moins une majuscule',
  (v: string) => /[a-z]/.test(v) || 'Le mot de passe doit contenir au moins une minuscule',
  (v: string) => /[0-9]/.test(v) || 'Le mot de passe doit contenir au moins un chiffre',
  (v: string) => /[!@#$%^&*(),.?":{}|<>]/.test(v) || 'Le mot de passe doit contenir au moins un caractère spécial',
]);

const confirmPassword = ref('');
const confirmPasswordRules = ref([
  (v: string) => !!v || 'Le mot de passe est requis',
  (v: string) => v === password.value || 'Les mots de passe ne correspondent pas',
]);


const passwordValide = computed(() => {
  return passwordRules.value.every((rule) => rule(password.value) === true) &&
         confirmPasswordRules.value.every((rule) => rule(confirmPassword.value) === true);
});

const submit = () => {
  emit('password', password.value);
  emit('passwordValide', passwordValide.value);
};
</script>

<template>
  <v-card flat title="Information utilisateur" subtitle="Entrez votre adresse e-mail pour réinitialiser votre mot de passe">
    <template #text>
   <div class="d-flex flex-column ga-2">
     <v-text-field
       label="Mot de passe"
       v-model="password"
       @input="submit"
       type="password"
       :rules="passwordRules"
     />
     <v-text-field
       label="Confirmation du mot de passe"
       v-model="confirmPassword"
       @input="submit"
       type="password"
       :rules="confirmPasswordRules"
     />
   </div>

    </template>
  </v-card>
</template>

<style scoped lang="sass">

</style>
