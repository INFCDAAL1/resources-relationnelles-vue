<script lang="ts" setup>
import type {Resource} from '@/types';
import {useResourceStore} from "@/stores/resource.ts";
import {useUserStore} from "@/stores/user.ts";
import axios from '@/lib/axios.ts';

const store = useResourceStore();
const userStore = useUserStore();

const props = defineProps<{
  item: Resource;
}>();

const emit = defineEmits<{
  (e: 'toggle-favorite', id: number): void;
}>();

const isOurResource = computed(() => {
  return props.item.user.id === userStore?.user?.id;
});

const isValid = computed(() => {
  return props.item.validated ? 'Validé' : 'Non validé';
});

const isPublished = computed(() => {
  return props.item.published ? 'Publié' : 'Non publié';
});

const isFavorite = computed(() => {
  return store.favorites.includes(props.item.id);
});

const isFavoriteColor = computed(() => {
  return isFavorite.value ? 'orange' : 'grey';
});

const isFavoriteIcon = computed(() => {
  return isFavorite.value ? 'mdi-star' : 'mdi-star-outline';
});

const toggleFavorite = () => {
  emit('toggle-favorite', props.item.id);
};

const toggleValidated = () => {
  axios.post(`/resources/${props.item.id}/validate`, {setTo: !props.item.validated})
    .then(() => {
      props.item.validated = !props.item.validated;
    })
    .catch((error) => {
      console.error('Error toggling validation:', error);
    });
};
</script>

<template>
  <v-card>
    <v-card-title>
      <div class="d-flex">
        <div>{{ item.name }}</div>
        <v-spacer></v-spacer>
        <div class="d-flex ga-2">
          <v-chip :color="item.validated ? 'green' : 'red'" :text="isValid"></v-chip>
          <v-chip :color="item.published ? 'blue' : 'red'" :text="isPublished"></v-chip>
        </div>
      </div>
    </v-card-title>
    <v-card-subtitle>{{ item.description }}</v-card-subtitle>
    <v-card-text>
      <div class="d-flex align-end">
        <div class="flex-column">
          <p>Catégorie :</p>
          <v-chip-group>
            <v-chip>{{ item.category.name }}</v-chip>
          </v-chip-group>
        </div>
        <v-spacer/>
        <div class="d-flex ga-3 align-center flex-wrap">
          <p class="text-grey-lighten-2">Créé le : {{ new Date(item.created_at).toDateString() }}</p>
          <p v-if="isOurResource">
            <v-icon color="green">mdi-account</v-icon>
            Votre ressource
          </p>
          <div class="d-flex flex-wrap ga-3">
            <v-btn v-role="['admin','superadmin','modo']" :color="item.validated ? 'green' : 'red'"
                   prepend-icon="mdi-hand-okay" @click="toggleValidated">
              {{ item.validated ? 'Valider' : 'Invalider' }}
            </v-btn>
            <v-btn :color="isFavoriteColor" :prepend-icon="isFavoriteIcon" variant="tonal" @click="toggleFavorite">
              Favoris
            </v-btn>
            <v-btn v-if="isOurResource || userStore.user.role == 'admin'  || userStore.user.role == 'superadmin'  || userStore.user.role == 'modo'" :to="'/resource/edit/'+item.id"
                prepend-icon="mdi-pencil"
                variant="tonal">Modifier
            </v-btn>
            <slot name="action"/>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style lang="sass" scoped>
</style>
