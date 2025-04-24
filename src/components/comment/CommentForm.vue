<script setup lang="ts">
import { ref } from 'vue';
import type {Comment, Resource} from '@/types';
import axios from '@/lib/axios.ts';

const props = defineProps<{
  item: Resource;
}>();

const emit = defineEmits<{
  (e: 'comment-added', comment: Comment): void;
}>();


const comment = ref('');
const loading = ref(false);
const error = ref<string | null>(null);

const submitComment = async () => {
  if (comment.value.trim() === '') {
    error.value = 'Le commentaire ne peut pas être vide.';
    return;
  }

  loading.value = true;
  error.value = null;

  try {

   const res =  await axios.post('comments', {
      resource_id: props.item.id,
      content: comment.value,
    });
    emit('comment-added', res.data.data);
    comment.value = '';
  } catch (err) {
    console.error(err);
    error.value = 'Erreur lors de l\'ajout du commentaire. Veuillez réessayer.';
    loading.value = false;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-card title="Ajout commentaire">
    <template #text>
      <v-form @submit.prevent="submitComment">
        <!-- Affichage d'une alerte pour l'erreur -->
        <v-alert v-if="error" type="error" dismissible>{{ error }}</v-alert>

        <!-- Textarea pour entrer le commentaire -->
        <v-textarea
          v-model="comment"
          label="Commentaire"
          outlined
          rows="3"
          required
        ></v-textarea>

        <!-- Bouton d'envoi du formulaire -->
        <v-btn :loading="loading" color="primary" type="submit">Envoyer</v-btn>
      </v-form>
    </template>
  </v-card>
</template>

<style scoped lang="sass">

</style>
