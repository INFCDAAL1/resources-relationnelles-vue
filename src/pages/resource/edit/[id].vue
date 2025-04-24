<script lang="ts" setup>
import {definePage} from "unplugin-vue-router/runtime";
import {useResourceStore} from "@/stores/resource.ts";
import type {Resource, RouteParams} from "@/types";
import axios from "@/lib/axios.ts";
import ResourceForm from "@/components/resource/ResourceForm.vue";

definePage({
  meta: {
    layout: 'default',
    requiresAuth: true,
  },
});

const router = useRouter();
const route = useRoute();
const store = useResourceStore();
const item: Ref<Resource | undefined> = ref();

onMounted(async () => {
  const {id} = route.params as RouteParams;
  const resourceId = Number(id);

  // Essayer d'abord depuis le store
  item.value = store.getResourceById(resourceId);

  // Si non trouvé, récupérer depuis l'API
  if (!item.value) {
    try {
      const res = await axios.get(`resources/${resourceId}`);
      item.value = res.data.data;
    } catch (err) {
      console.error(`Resource with id ${id} not found`, err);
      await router.push('/resource/add')
    }
  }
});
</script>

<template>
  <div>
    <h1 class="text-h5 mb-4">Modifier une ressource</h1>
    <ResourceForm v-if="item" :model-value="item"/>
    <v-alert v-else text="Chargement de la ressource..." type="info"></v-alert>
  </div>
</template>

<style lang="sass" scoped>

</style>
