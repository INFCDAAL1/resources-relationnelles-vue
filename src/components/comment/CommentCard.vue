<script lang="ts" setup>
import {computed, defineProps} from 'vue';
import type {Comment} from '@/types'; // Assurez-vous que le type Comment est bien défini dans vos types

const props = defineProps<{
  item: Comment;
}>();

// Calculer le texte du statut
const statusText = computed(() => {
  switch (props.item.status) {
    case 'pending':
      return 'En attente';
    case 'approved':
      return 'Approuvé';
    case 'rejected':
      return 'Rejeté';
    case 'published':
      return 'Publié'; // Ajout du statut "published"
    default:
      return 'Inconnu';
  }
});

// Calculer la couleur en fonction du statut
const statusColor = computed(() => {
  switch (props.item.status) {
    case 'pending':
      return 'orange';
    case 'approved':
      return 'green';
    case 'rejected':
      return 'red';
    case 'published':
      return 'blue'; // Couleur bleue pour "published"
    default:
      return 'grey';
  }
});

// Icône en fonction du statut
const statusIcon = computed(() => {
  switch (props.item.status) {
    case 'pending':
      return 'mdi-clock';
    case 'approved':
      return 'mdi-check-circle';
    case 'rejected':
      return 'mdi-close-circle';
    case 'published':
      return 'mdi-pencil'; // Icône pour "published"
    default:
      return 'mdi-help-circle';
  }
});
</script>

<template>
  <v-card>
    <v-card-title>
      <div class="d-flex">
        <div>{{ item.user.name }}</div>
        <v-spacer />
        <div class="d-flex ga-2">
          <v-chip
            :append-icon="statusIcon"
            :color="statusColor"
            :text="statusText"
          />
        </div>
      </div>
    </v-card-title>
    <v-card-subtitle>{{ item.content }}</v-card-subtitle>
    <v-card-text>
      <div class="d-flex align-end">
        <v-spacer />
        <div class="d-flex ga-3 align-center flex-wrap">
          <p class="text-grey-lighten-2">
            Créé le : {{ new Date(item.created_at).toDateString() }}
          </p>
          <slot name="action" />
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style lang="sass" scoped>
</style>
