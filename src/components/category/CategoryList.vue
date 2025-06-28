<script lang="ts" setup>
import type {Category} from '@/types';

const props = defineProps<{
  items: Category[],
  search?: string,
  noSearch?: boolean,
}>();

const emit = defineEmits<{
  (e: 'search', value: string): void;
}>();

const page = ref(1);
const itemsPerPage = ref(10);
const totalPages = computed(() => Math.ceil(props.items.length / itemsPerPage.value));
const searchQuery = shallowRef("");

watch(searchQuery, (newValue) => {
  emit('search', newValue);
});

watch(() => props.search, (newValue) => {
  searchQuery.value = newValue as string;
});


onMounted(() => {
  searchQuery.value = props.search || "";
});
</script>

<template>
  <div class="d-flex flex-column ga-5">
    <v-data-iterator
      v-if="items && props.items.length"
      :items="items"
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
          <v-text-field
            v-if="!props.noSearch"
            v-model="searchQuery"
            hide-details
            label="Search"
            max-width="350"
          />
        </div>
      </template>
      <template #default="{ items: paginatedItems }">
        <div class="d-flex flex-column ga-3">
          <template
            v-for="(item) in paginatedItems"
            :key="item.id"
          >
            <CategoryCard :item="item.raw" />
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
  </div>
</template>

<style lang="sass" scoped>
</style>
