<script lang="ts" setup>
import {defineEmits, defineProps} from 'vue';

const props = defineProps<{
  email: string;
  nom: string;
  password: string;
  userinfoValide: boolean;
  passwordValide: boolean;
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: 'submit'): void;
}>();

const handleSubmit = () => {
  if (props.userinfoValide && props.passwordValide) {
    emit('submit');
  }
}
const passwordCensure = computed(() => {
  return props.password.replace(/./g, '•');
});
</script>

<template>
  <div class="confirmation-step">
    <h2>Confirmation des informations</h2>
    <v-card :loading="loading" class="pa-4" outlined>
      <v-list>
        <v-list-item>
          <v-list-item-title>Email :</v-list-item-title>
          <v-list-item-subtitle>{{ props.email }}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Nom :</v-list-item-title>
          <v-list-item-subtitle>{{ props.nom }}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Mot de passe :</v-list-item-title>
          <v-list-item-subtitle>{{ passwordCensure }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>

      <v-alert
        v-if="!props.userinfoValide || !props.passwordValide"
        class="mt-4"
        type="error"
      >
        Les informations ne sont pas valides. Veuillez corriger les erreurs dans les étapes précédentes.
      </v-alert>

      <v-btn
        :disabled="!props.userinfoValide || !props.passwordValide"
        :loading="loading"
        class="mt-4"
        color="primary"
        @click="handleSubmit"
      >
        Confirmer et s'inscrire
      </v-btn>
    </v-card>
  </div>
</template>
