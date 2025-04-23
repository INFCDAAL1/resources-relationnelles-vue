<script lang="ts" setup>
import { definePage } from "unplugin-vue-router/runtime";
import { useResourceStore } from "@/stores/resource.ts";
import type { Resource, RouteParams } from "@/types";
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
  const { id } = route.params as RouteParams;
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

const submit = async (formData: FormData) => {
  if (!item.value) return;

  try {
    const res = await axios.put(
      `/resources/${item.value.id}`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    // Mettre à jour le store local
    store.updateResource(res.data.data);

    // Redirection ou message de succès si besoin
    router.push(`/resource/${item.value.id}`);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la ressource :", error);
  }
};
</script>

<template>
  <div>
    <h1 class="text-h5 mb-4">Modifier une ressource</h1>
    <ResourceForm v-if="item" :model-value="item" @submit="submit" />
    <v-alert v-else type="info" text="Chargement de la ressource..."></v-alert>
  </div>
</template>

<style lang="sass" scoped>

</style>
