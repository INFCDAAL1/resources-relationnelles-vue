<script lang="ts" setup>
import type {FilterResource, Resource} from '@/types';
import {definePage} from "unplugin-vue-router/runtime";
import {useResourceStore} from "@/stores/resource.ts";
import axios from '@/lib/axios';

definePage({
  meta: {
    layout: 'default',
    requiresAuth: false,
  }
})
const route = useRoute();
const router = useRouter();
const store = useResourceStore();

const items: Ref<Resource[]> = ref([] as Resource[]);
const loading: Ref<boolean> = ref(true);
const error = ref();

const search = shallowRef('');
watch(search, () => {
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
  loading.value = true;

  axios.get('resources')
    .then(response => {
      store.setResources(response.data.data);
      items.value = response.data.data;
      loading.value = false;
    })
    .catch(error => {
      console.error('Error fetching resources:', error);
      error.value = error;
      loading.value = false;
    });
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

watch(() => route.query, () => {
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

const categories = ref([] as string[]);
const visibilities = ref([] as string[]);

onMounted(async () => {
  // Fetch categories from API
  axios.get('/categories')
    .then(response => {
      categories.value = response.data.data;
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
    });

  // Fetch visibilities from API
  axios.get('/visibilities')
    .then(response => {
      visibilities.value = response.data.data;
    })
    .catch(error => {
      console.error('Error fetching visibilities:', error);
    });
});

</script>
<template>
  <div class="d-flex flex-column ga-5">
    <h1>Liste des ressources magique ({{ items.length }})</h1>

    <v-alert
      v-if="error"
      title="Erreur de chargement"
      type="error"
    >
      Une erreur est survenue lors du chargement des ressources.
    </v-alert>

    <div
      v-if="loading"
      class="d-flex justify-center my-5"
    >
      <v-progress-circular
        color="primary"
        indeterminate
      />
    </div>

    <ResourceList
      v-else-if="!loading"
      :filter="filter"
      :items="items"
      :search="search"
      @filter="applyFilter"
      @search="search = $event"
    />
    <v-empty-state
      v-if="items.length === 0 && !loading"
      icon="mdi-file-document-outline"
      title="Aucune ressource trouvée"
    />

    <v-fab
      v-role="['admin', 'user','moderator','superadmin']"
      app
      color="primary"
      icon="mdi-plus"
      size="75"
      to="/resource/add"
    />
  </div>
</template>
