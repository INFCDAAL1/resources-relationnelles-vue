<script lang="ts" setup>
import {computed, onMounted, ref, shallowRef, watch} from 'vue';
import type {Comment, FilterComment} from '@/types';

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
const searchQuery = shallowRef("");
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
  if (searchQuery.value) {
    filtered = filtered.filter(item => item.content.toLowerCase().includes(searchQuery.value.toLowerCase()));
  }

  return filtered;
});

// Gestion du changement de page
const paginatedItems = computed(() => {
  const startIndex = (page.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return filteredItems.value.slice(startIndex, endIndex);
});


// Watchers pour émettre les changements de filtre et recherche
watch(searchQuery, (newValue) => {
  emit('search', newValue);
});

watch(() => props.search, (newValue) => {
  searchQuery.value = newValue as string;
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
  searchQuery.value = props.search || "";
});
</script>

<template>
  <div class="d-flex flex-column ga-5">
    <v-data-iterator
      v-if="filteredItems.length"
      :items="paginatedItems"
      :items-per-page="itemsPerPage"
      :page="page"
      :search="searchQuery"
    >
      <template #header>
        <div class="d-flex ga-3 align-center justify-center">
          <v-select
            v-model="itemsPerPage"
            :items="[5, 10, 15, 20]"
            hide-details
            label="Items per page"
            max-width="350"
          />
          <v-select
            v-if="!props.noFilter"
            v-model="filterModel"
            :items="['pending', 'approved', 'rejected', 'all']"
            hide-details
            label="Filtre ressources"
            max-width="350"
          />
          <v-text-field
            v-if="!props.noSearch"
            v-model="searchQuery"
            hide-details
            label="Search"
            max-width="350"
          />
        </div>
      </template>
      <template #default="{ items: templateItems }">
        <div class="d-flex flex-column ga-3">
          <template
            v-for="(item) in templateItems"
            :key="item.id"
          >
            <CommentCard :item="item.raw">
              <template #action>
                <v-btn
                  v-role="['admin', 'modo','superadmin']"
                  icon="mdi-check"
                  variant="tonal"
                  @click="$emit('approved', item.raw)"
                />
                <v-btn
                  v-role="['admin', 'modo','superadmin']"
                  icon="mdi-close"
                  variant="tonal"
                  @click="$emit('rejected', item.raw)"
                />
                <v-btn
                  v-role="['admin', 'modo','superadmin']"
                  icon="mdi-delete"
                  variant="tonal"
                  @click="$emit('delete', item.raw)"
                />
                <v-btn
                  v-role="['admin', 'modo','superadmin']"
                  icon="mdi-pencil"
                  variant="tonal"
                  @click="$emit('edit', item.raw)"
                />
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
        />
      </template>
    </v-data-iterator>

    <!-- Message si aucune donnée n'est disponible -->
    <v-card
      v-if="!filteredItems.length"
      title="Aucun commentaire trouvé."
    />
  </div>
</template>

<style lang="sass" scoped>
</style>
