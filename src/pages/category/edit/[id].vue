<script lang="ts" setup>
import {useRoute} from 'vue-router';
import type {Category} from "@/types";
import axios from "@/lib/axios.ts";

definePage({
  meta: {
    layout: 'default',
    requiresAuth: true,
  },
});
const item: Ref<Category | null> = ref(null);
const loading = ref(true);
const error = ref<string | null>(null);
const route = useRoute();

onMounted(() => {
  const {id} = route.params as { id: string };

  axios.get('categories')
    .then(response => {
      item.value = response.data.data.find((category: Category) => category.id === Number(id)) || null;
    })
    .catch(err => {
      console.error('Error fetching categories:', err);
      error.value = err.message || 'Une erreur est survenue';
    })
    .finally(() => {
      loading.value = false;
    });
});

const onSubmit = async (value: Category) => {
  if (!item.value) return;

  try {
    loading.value = true;
    const res = await axios.patch(`categories/${item.value.id}`, {
      name: value.name,
    });
    item.value = res.data.data;
  } catch (err) {
    console.error('Error updating category:', err);
    error.value = 'Une erreur est survenue';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <h1>Modification d'une catégorie</h1>

    <div
      v-if="loading"
      class="d-flex justify-center my-5"
    >
      <v-progress-circular
        color="primary"
        indeterminate
      />
    </div>

    <v-alert
      v-else-if="error"
      type="error"
    >
      {{ error }}
    </v-alert>

    <CategoryForm
      v-else-if="item"
      :item="item"
      @submit="onSubmit"
    />
  </div>
</template>

<style lang="sass" scoped>
</style>
