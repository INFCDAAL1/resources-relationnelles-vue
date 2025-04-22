<script lang="ts" setup>
import type {FilterResource, Resource} from '@/types';
import {definePage} from "unplugin-vue-router/runtime";
import {useResourceStore} from "@/stores/resource.ts";

definePage({
  meta: {
    layout: 'default',
    requiresAuth: false,
  },
})
const route = useRoute();
const router = useRouter();
const store = useResourceStore()

const items: Ref<Resource[]> = ref([] as Resource[]);

const search = shallowRef('')
watch(search, (_) => {
  updateQuery()
})

const filter: Ref<FilterResource> = ref("all")
watch(filter, (newValue) => {
  if (filter.value != newValue) {
    applyFilter(newValue)
  }
})
onMounted(() => {
  const searchQuery = route.query.search;
  const filterQuery = route.query.filter;
  applyFilter(filterQuery?.toString() || "all")
  if (searchQuery) {
    search.value = searchQuery.toString();
  }

  store.addResource({
    id: items.value.length + 1,
    name: "Resource personnelle",
    description: "Un poney qui fait des tours de magie",
    category: "Resource",
    isValid: true,
    isPublished: true,
    isFavorite: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
})

watch(() => route.query, (_) => {
  if (route.query.filter) {
    if (filter.value != route.query.filter) {
      filter.value = route.query.filter as FilterResource;
      applyFilter(filter.value)
    }
  }
})

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
  updateQuery()
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
    <h1>Liste des ressources {{ items.length }}</h1>
    <ResourceList :filter="filter" :items="items" :search="search" @filter="applyFilter" @search="search = $event"/>
  </div>
</template>


<style lang="sass" scoped>
</style>
