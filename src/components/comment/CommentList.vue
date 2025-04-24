<script lang="ts" setup>
import { ref, computed, watch, onMounted, shallowRef } from 'vue';
import type { Comment, FilterComment } from '@/types';

const props = defineProps<{
  items: Comment[],
  filter?: FilterComment,
  search?: string,
  noFilter?: boolean,
  noSearch?: boolean,
}>();

const emit = defineEmits<{
  (e: 'filter', value: FilterComment): void;
  (e: 'search', value: string): void;
  (e: 'delete', value: Comment): void;
  (e: 'edit', value: Comment): void;
  (e: 'approved', value: Comment): void;
  (e: 'rejected', value: Comment): void;
}>();

// Pagination
const page = ref(1);
const itemsPerPage = ref(10);

// Filtrage et Recherche
const search = shallowRef("");
const filterModel = ref<FilterComment>("all");

// Calcul du nombre de pages en fonction du nombre d'éléments
const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage.value));

// Filtrer les éléments en fonction du filtre et de la recherche
const filteredItems = computed(() => {
  let filtered = props.items;

  // Appliquer le filtre
  if (filterModel.value !== 'all') {
    filtered = filtered.filter(item => item.status === filterModel.value);
  }

  // Appliquer la recherche
  if (search.value) {
    filtered = filtered.filter(item => item.content.toLowerCase().includes(search.value.toLowerCase()));
  }

  return filtered;
});

// Gestion du changement de page
const paginatedItems = computed(() => {
  const startIndex = (page.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return filteredItems.value.slice(startIndex, endIndex);
});
const role = ref(null)

// Watchers pour émettre les changements de filtre et recherche
watch(search, (newValue) => {
  emit('search', newValue);
});

watch(() => props.search, (newValue) => {
  search.value = newValue as string;
});

watch(filterModel, (newValue) => {
  emit('filter', newValue);
});

watch(() => props.filter, (newFilter) => {
  filterModel.value = newFilter as FilterComment;
});

// Initialiser les valeurs de filtre et recherche au montage
onMounted(() => {
  filterModel.value = props.filter || "all";
  search.value = props.search || "";
});
</script>

<template>
  <div class="d-flex flex-column ga-5">
    <v-data-iterator
      v-if="filteredItems.length"
      :items="paginatedItems"
      :items-per-page="itemsPerPage"
      :page="page"
      :search="search"
    >
      <template #header>
        <div class="d-flex ga-3 align-center justify-center">
          <v-select
            v-model="itemsPerPage"
            :items="[5, 10, 15, 20]"
            hide-details
            label="Items per page"
            max-width="350"
          ></v-select>
          <v-select
            v-if="!props.noFilter"
            v-model="filterModel"
            :items="['pending', 'approved', 'rejected', 'all']"
            hide-details
            label="Filtre ressources"
            max-width="350"
          ></v-select>
          <v-text-field
            v-if="!props.noSearch"
            v-model="search"
            hide-details
            label="Search"
            max-width="350"
          ></v-text-field>
        </div>
      </template>
      <template v-slot:default="{ items }">
        <div class="d-flex flex-column ga-3">
          <template v-for="(item, i) in items" :key="item.id">
            <CommentCard :item="item.raw">
              <template #action>
                <v-btn v-role="['admin', 'modo','superadmin']" @click="$emit('approved', item.raw)" icon="mdi-check" variant="tonal"> </v-btn>
                <v-btn v-role="['admin', 'modo','superadmin']" @click="$emit('rejected', item.raw)" icon="mdi-close" variant="tonal"> </v-btn>
                <v-btn v-role="['admin', 'modo','superadmin']" @click="$emit('delete', item.raw)" icon="mdi-delete" variant="tonal"></v-btn>
                <v-btn v-role="['admin', 'modo','superadmin']" @click="$emit('edit', item.raw)" icon="mdi-pencil" variant="tonal"> </v-btn>
              </template>
            </CommentCard>
          </template>
        </div>
      </template>
      <template #footer>
        <v-pagination
          v-model="page"
          :length="totalPages"
          total-visible="5"
        ></v-pagination>
      </template>
    </v-data-iterator>

    <!-- Message si aucune donnée n'est disponible -->
    <v-card v-if="!filteredItems.length" title="Aucun commentaire trouvé."></v-card>
  </div>
</template>

<style lang="sass" scoped>
</style>
