<script lang="ts" setup>
import type {Resource} from '@/types';
import {definePage} from "unplugin-vue-router/runtime";
import {useResourceStore} from "@/stores/resource.ts";

definePage({
  meta: {
    layout: 'default',
    requiresAuth: true,
  },
})
const route = useRoute();
const router = useRouter();
const store = useResourceStore()

const items: Ref<Resource[]> = ref([] as Resource[]);
const loading = ref(true);
const error = ref();
const search = shallowRef('')
watch(search, (_) => {
  updateQuery()
})


onMounted(() => {
  try {
    const searchQuery = route.query.search;
    if (searchQuery) {
      search.value = searchQuery.toString();
    }
    items.value = store.getFavoriteResources;
  } catch (err) {
    error.value = err;
    console.error('Error fetching resources:', error);

  } finally {
    loading.value = false;
  }

})

const updateQuery = () => {
  if (search.value.length > 0)
    router.push({query: {search: search.value}});
};
</script>
<template>
  <div class="d-flex flex-column ga-5">
    <h1>Liste des ressources {{ items.length }}</h1>

    <v-alert v-if="error" title="Erreur de chargement" type="error">
      Une erreur est survenue lors du chargement des ressources.
    </v-alert>

    <v-empty-state
      v-if="items.length === 0 && !loading"
      icon="mdi-file-document-outline"
      title="Aucune ressource trouvée"
    ></v-empty-state>

    <div v-if="loading" class="d-flex justify-center my-5">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </div>

    <ResourceList v-if="!loading && items.length>0" :items="items" :search="search" filter="favorite" no-filter
                  @search="search = $event"/>
  </div>
</template>


<style lang="sass" scoped>
</style>
