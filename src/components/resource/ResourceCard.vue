<script setup lang="ts">
import type { Resource } from '@/types';
import { defineProps } from 'vue';

const props = defineProps<{
  item: Resource;
}>();

const emit = defineEmits<{
  (e: 'toggle-favorite', item: Resource): void;
}>();

const isValid = computed(() => {
  return props.item.isValid ? 'Validé' : 'Non validé';
});
const isPublished = computed(() => {
  return props.item.isPublished ? 'Publié' : 'Non publié';
});
const isFavoriteColor = computed(() => {
  return props.item.isFavorite ? 'yellow' : 'grey';
});
const isFavoriteIcon = computed(() => {
  return props.item.isFavorite ? 'mdi-star' : 'mdi-star-outline';
});
const toggleFavorite = () => {
  emit('toggle-favorite', props.item);
};
</script>

<template>
  <v-card>
    <v-card-title>
      <div class="d-flex">
      <div>{{ item.name }}</div>
      <v-spacer></v-spacer>
        <div class="d-flex ga-2">
        <v-chip :color="props.item.isValid? 'green':'red'" :text="isValid"></v-chip>
        <v-chip :color="props.item.isPublished? 'blue':'red'" :text="isPublished"></v-chip>
        </div>
      </div>
    </v-card-title>
    <v-card-subtitle>{{ item.description }}</v-card-subtitle>
    <v-card-text>
      <div class="d-flex align-end">
        <div class="flex-column">
          <p>Catégorie :</p>
          <v-chip-group>
            <v-chip :text="item.category"></v-chip>
          </v-chip-group>
        </div>
        <v-spacer/>
        <div class="d-flex ga-3 align-center">
        <p class="text-grey-lighten-2">Créer le : {{ new Date(item.createdAt).toDateString() }}</p>
        <v-btn variant="tonal" :prepend-icon="isFavoriteIcon" :color="isFavoriteColor" @click="toggleFavorite">Favoris</v-btn>
          <slot name="action"/>
        </div>
      </div>

    </v-card-text>
  </v-card>
</template>

<style scoped lang="sass">
</style>
