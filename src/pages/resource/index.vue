<script lang="ts" setup>
import type { FilterResource, Resource, ResourceApiResponse } from '@/types';
import { definePage } from "unplugin-vue-router/runtime";
import { useResourceStore } from "@/stores/resource.ts";

definePage({
  meta: {
    layout: 'default',
    requiresAuth: false,
  },
})
const route = useRoute();
const router = useRouter();
const store = useResourceStore();

const items: Ref<Resource[]> = ref([] as Resource[]);
const isLoading = ref(true);
const error = ref();

const search = shallowRef('');
watch(search, (_) => {
  updateQuery();
});

const filter: Ref<FilterResource> = ref("all");
watch(filter, (newValue) => {
  if (filter.value != newValue) {
    applyFilter(newValue);
  }
});

// Fetch resources from API
const fetchResources = async () => {
  isLoading.value = true;

  const { data, error:errorApi } = useFetch<ResourceApiResponse>('/api/resources');

  if (error.value) {
    console.error('Error fetching resources:', error.value);
    error.value = errorApi.value;
    isLoading.value = false;
    return;
  }

  if (data.value) {
    store.setResources(data.value.data);
    applyFilter(filter.value);
  }

  isLoading.value = false;
};

onMounted(async () => {
  // Load search and filter from URL
  const searchQuery = route.query.search;
  const filterQuery = route.query.filter;

  if (searchQuery) {
    search.value = searchQuery.toString();
  }

  filter.value = (filterQuery?.toString() as FilterResource) || "all";

  // Fetch resources from API
  await fetchResources();
});

watch(() => route.query, (_) => {
  if (route.query.filter) {
    if (filter.value != route.query.filter) {
      filter.value = route.query.filter as FilterResource;
      applyFilter(filter.value);
    }
  }
});

const applyFilter = (filterCase: string) => {
  switch (filterCase) {
    case 'favorite':
      filter.value = 'favorite';
      items.value = store.getFavoriteResources;
      break;
    case 'published':
      filter.value = 'published';
      items.value = store.getPublishedResources;
      break;
    case 'unpublished':
      filter.value = 'unpublished';
      items.value = store.getUnpublishedResources;
      break;
    default:
      filter.value = 'all';
      items.value = store.getAllResources;
  }
  updateQuery();
};

const updateQuery = () => {
  if (search.value.length > 0)
    router.push({query: {search: search.value, filter: filter.value}});
  else
    router.push({query: {filter: filter.value}});
};
</script>
<template>
  <div class="d-flex flex-column ga-5">
    <h1>Liste des ressources ({{ items.length }})</h1>

    <v-alert v-if="error" type="error" title="Erreur de chargement">
      Une erreur est survenue lors du chargement des ressources.
    </v-alert>

    <div v-if="isLoading" class="d-flex justify-center my-5">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <ResourceList
      v-else
      :filter="filter"
      :items="items"
      :search="search"
      @filter="applyFilter"
      @search="search = $event"
    />
  </div>
</template>
