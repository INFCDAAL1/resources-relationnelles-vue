<script lang="ts" setup>
import type {Resource} from '@/types';
import {useResourceStore} from "@/stores/resource.ts";
import {useUserStore} from "@/stores/user.ts";
import axios from '@/lib/axios.ts';
import {computed, ref} from 'vue';

const store = useResourceStore();
const userStore = useUserStore();

const props = defineProps<{
  item: Resource;
}>();

const emit = defineEmits<{
  (e: 'toggle-favorite', id: number): void;
}>();

// Créez une référence locale pour l'item
const localItem = ref({...props.item});

const isOurResource = computed(() => {
  return localItem.value.user.id === userStore?.user?.id;
});

const isValid = computed(() => {
  return localItem.value.validated ? 'Validé' : 'Non validé';
});

const isPublished = computed(() => {
  return localItem.value.published ? 'Publié' : 'Non publié';
});

const isFavorite = computed(() => {
  return store.favorites.includes(localItem.value.id);
});

const isFavoriteColor = computed(() => {
  return isFavorite.value ? 'orange' : 'grey';
});

const isFavoriteIcon = computed(() => {
  return isFavorite.value ? 'mdi-star' : 'mdi-star-outline';
});

const toggleFavorite = () => {
  emit('toggle-favorite', localItem.value.id);
};

const toggleValidated = () => {
  axios.post(`/resources/${localItem.value.id}/validate`, {setTo: !localItem.value.validated})
    .then(() => {
      localItem.value.validated = !localItem.value.validated; // Modifiez l'état local
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
        <div>{{ localItem.name }}</div>
        <v-spacer />
        <div class="d-flex ga-2">
          <v-chip
            :color="localItem.validated ? 'green' : 'red'"
            :text="isValid"
          />
          <v-chip
            :color="localItem.published ? 'blue' : 'red'"
            :text="isPublished"
          />
        </div>
      </div>
    </v-card-title>
    <v-card-subtitle>{{ localItem.description }}</v-card-subtitle>
    <v-card-text>
      <div class="d-flex align-end">
        <div class="flex-column">
          <p>Catégorie :</p>
          <v-chip-group>
            <v-chip>{{ localItem.category.name }}</v-chip>
          </v-chip-group>
        </div>
        <v-spacer />
        <div class="d-flex ga-3 align-center flex-wrap">
          <p class="text-grey-lighten-2">
            Créé le : {{ new Date(localItem.created_at).toDateString() }}
          </p>
          <p v-if="isOurResource">
            <v-icon color="green">
              mdi-account
            </v-icon>
            Votre ressource
          </p>
          <div class="d-flex flex-wrap ga-3">
            <v-btn
              v-role="['admin','superadmin','modo']"
              :color="localItem.validated ? 'green' : 'red'"
              prepend-icon="mdi-hand-okay"
              @click="toggleValidated"
            >
              {{ localItem.validated ? 'Valider' : 'Invalider' }}
            </v-btn>
            <v-btn
              v-if="userStore.user"
              :color="isFavoriteColor"
              :prepend-icon="isFavoriteIcon"
              variant="tonal"
              @click="toggleFavorite"
            >
              Favoris
            </v-btn>
            <v-btn
              v-if="userStore.user && (isOurResource || userStore.user.role == 'admin' || userStore.user.role == 'superadmin' || userStore.user.role == 'modo')"
              :to="'/resource/edit/' + localItem.id"
              prepend-icon="mdi-pencil"
              variant="tonal"
            >
              Modifier
            </v-btn>
            <slot name="action" />
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
