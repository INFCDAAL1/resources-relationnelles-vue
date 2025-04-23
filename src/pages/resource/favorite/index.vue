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

const search = shallowRef('')
watch(search, (_) => {
  updateQuery()
})


onMounted(() => {
  const searchQuery = route.query.search;
  if (searchQuery) {
    search.value = searchQuery.toString();
  }
  items.value = store.getFavoriteResources;
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

const updateQuery = () => {
  if (search.value.length > 0)
    router.push({query: {search: search.value}});
};
</script>
<template>
  <div class="d-flex flex-column ga-5">
    <h1>Liste des ressources {{ items.length }}</h1>
    <ResourceList :items="items" :search="search" filter="favorite" no-filter @search="search = $event"/>
  </div>
</template>


<style lang="sass" scoped>
</style>
