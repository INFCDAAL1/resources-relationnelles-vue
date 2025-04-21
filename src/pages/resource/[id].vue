<script setup lang="ts">

import {definePage} from "unplugin-vue-router/runtime";
import {useResourceStore} from "@/stores/resource.ts";
import type {Resource} from "@/types";
definePage({
  meta: {
    layout: 'default',
    requiresAuth: false,
  },
})
const router = useRouter();
const route = useRoute();
const store = useResourceStore()
const item:Ref<Resource|undefined> = ref();

onMounted(()=>{
  const id = route.params.id;
  item.value=store.getResourceById(id)
  if (!item.value) {
    console.error(`Resource with id ${id} not found`);
    router.back()
    return;
  }
  // Fetch the resource details using the id
  // For example, you can use a fetch or axios call to get the data
  // Example: fetch(`https://api.example.com/resource/${id}`)
})

</script>

<template>
  <p v-if="!item">Loading...</p>
  <div v-else>
    <ResourceCard  :item="item" @toggle-favorite="store.toggleResourceFavorite"/>
  </div>


</template>

<style scoped lang="sass">

</style>
