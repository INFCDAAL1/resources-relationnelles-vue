<script lang="ts" setup>
import type {Category, Comment, FilterComment} from '@/types';

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
const search = shallowRef("");

watch(search, (newValue) => {
  emit('search', newValue);
});

watch(() => props.search, (newValue) => {
  search.value = newValue as string;
});


onMounted(() => {
  search.value = props.search || "";
});
</script>

<template>
  <div class="d-flex flex-column ga-5">
    <v-data-iterator v-if="items && props.items.length" :items="items" :items-per-page="itemsPerPage" :page="page"
                     :search="search">
      <template #header>
        <div class="d-flex ga-3 align-center justify-center">
          <v-select
            v-model="itemsPerPage"
            :items="[5, 10, 15, 20]"
            hide-details
            label="Items per page"
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
            <CategoryCard :item="item.raw">
            </CategoryCard>
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
  </div>
</template>

<style lang="sass" scoped>
</style>
