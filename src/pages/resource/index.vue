<script lang="ts" setup>
import type { FilterResource, Resource, ResourceApiResponse } from '@/types';
import { definePage } from "unplugin-vue-router/runtime";
import { useResourceStore } from "@/stores/resource.ts";
import axios from '@/lib/axios';

definePage({
  meta: {
    layout: 'default',
    requiresAuth: true,
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
  
  axios.get('/resources')
    .then(response => {
      store.setResources(response.data.data);
      items.value = response.data.data;
      isLoading.value = false;
    })
    .catch(error => {
      console.error('Error fetching resources:', error);
      error.value = error;
      isLoading.value = false;
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

const dialog = ref(false);

const formLoading = ref(false);
const formName = ref('');
const formDescription = ref('');
const formCategory = ref('');
const formVisibility = ref('');
const formPublished = ref(false);
const formFile = ref<File | null>(null);

const categories = ref([] as string[]);
const visibilities = ref([] as string[]);
// const formValid = ref(false);
// const formRules = ref({
//   name: [(v: string) => !!v || 'Le nom est requis'],
//   description: [(v: string) => !!v || 'La description est requise'],
//   category: [(v: string) => !!v || 'La catégorie est requise'],
//   file: [(v: File) => !!v || 'Le fichier est requis'],
// });

const submitForm = async () => {
  formLoading.value = true;
  const formData = new FormData();
  formData.append('name', formName.value);
  formData.append('description', formDescription.value);
  formData.append('category_id', formCategory.value);
  formData.append('visibility_id', formVisibility.value);
  formData.append('published', formPublished.value ? '1' : '0');
  formData.append('file', formFile.value as Blob);

  axios.post('/resources', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(response => {
      formLoading.value = false;
      formName.value = '';
      formDescription.value = '';
      formCategory.value = '';
      formFile.value = null;
      formVisibility.value = '';
      formPublished.value = false;
      dialog.value = false;
      fetchResources(); // Refresh the resource list after creating a new resource
    })
    .catch(error => {
      console.error('Error creating resource:', error);
      formLoading.value = false;
    });
};

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
    <v-fab color="primary" icon="mdi-plus" :app="true" @click="dialog = true" location="bottom end"></v-fab>

    <!-- Dialog with Form -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h6">Créer une ressource</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" @submit.prevent="submitForm">
            <v-text-field
              label="Nom"
              v-model="formName"
              required
            ></v-text-field>

            <v-textarea
              label="Description"
              v-model="formDescription"
            ></v-textarea>

            <v-select
              v-model="formCategory"
             :items="categories"
              item-text="name"
              item-value="id"
              label="Catégorie"
              required
            ></v-select>

            <v-select
              v-model="formVisibility"
              :items="visibilities"
              item-text="name"
              item-value="id"
              label="Visibilité"
              required
            ></v-select>

            <v-checkbox
              v-model="formPublished"
              label="Publié"
              color="primary"
              > </v-checkbox>

            <v-file-input
              label="Fichier"
              v-model="formFile"
              required
            ></v-file-input>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Annuler</v-btn>
          <v-btn :disabled="formLoading" color="primary" @click="submitForm">Créer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
