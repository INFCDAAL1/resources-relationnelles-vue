<script setup lang="ts">
import { ref, computed, defineEmits } from 'vue';

const emit = defineEmits<{
  (e: 'email', email: string): void;
  (e: 'emailValide', value: boolean): void;
  (e: 'nom', value: string): void;
  (e: 'nomValide', value: boolean): void;
}>();

const email = ref('');
const emailRules = ref([
  (v: string) => !!v || 'L\'email est requis',
  (v: string) => /.+@.+\..+/.test(v) || 'Le format de l\'email est incorrect',
]);

const emailValide = computed(() => {
  return emailRules.value.every((rule) => rule(email.value) === true);
});

const nom = ref('');
const nomRules = ref([
  (v: string) => !!v || 'Le nom est requis',
  (v: string) => v.length >= 2 || 'Le nom doit contenir au moins 2 caractères',
  (v: string) => /^[a-zA-ZÀ-ÿ\s-]+$/.test(v) || 'Le nom ne doit contenir que des lettres et des espaces',
  (v: string) => !/\s{2,}/.test(v) || 'Le nom ne doit pas contenir d\'espaces consécutifs',
  (v: string) => !/^[\s-]+$/.test(v) || 'Le nom ne doit pas être vide ou composé uniquement d\'espaces',
  (v: string) => !/^[a-zA-ZÀ-ÿ-]+$/.test(v) || 'Le nom ne doit pas contenir de caractères spéciaux',
  (v: string) => !/^[a-zA-ZÀ-ÿ]+$/.test(v) || 'Le nom ne doit pas contenir de chiffres',
]);
const nomValide = computed(() => {
  return emailRules.value.every((rule) => rule(email.value) === true);
});

const submit = () => {
  emit('email', email.value);
  emit('emailValide', emailValide.value);
  emit('nom', nom.value);
  emit('nomValide', nomValide.value);
};
</script>

<template>
  <v-card flat title="Information utilisateur" subtitle="Entrez votre adresse e-mail pour réinitialiser votre mot de passe">
    <template #text>
   <div class="d-flex flex-column ga-2">
     <v-text-field
       label="Nom"
       v-model="nom"
       @input="submit"
       :rules="nomRules"
     />
     <v-text-field
       label="Email"
       v-model="email"
       @input="submit"
       type="email"
       :rules="emailRules"
     />
   </div>

    </template>
  </v-card>
</template>

<style scoped lang="sass">

</style>
