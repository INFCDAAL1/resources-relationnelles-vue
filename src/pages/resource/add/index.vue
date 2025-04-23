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

const store = useResourceStore();
const item: Ref<Resource | undefined> = ref();

const submit = async (formData: FormData) => {
  console.log("submit", formData);

  try {
    const res = await axios.post(
      `/resources`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    store.addResource(res.data.data);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la ressource :", error);
  }
};
</script>

<template>
  <div>
    <h1 class="text-h5 mb-4">Ajout d'une ressource</h1>
    <ResourceForm :model-value="item" @submit="submit" />
  </div>
</template>

<style lang="sass" scoped>

</style>
