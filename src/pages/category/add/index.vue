<script lang="ts" setup>
import {ref} from 'vue';
import type {Category} from "@/types";
import axios from "@/lib/axios.ts";

definePage({
  meta: {
    layout: 'default',
    requiresAuth: true,
  },
});
const item: Ref<Category> = ref({} as Category);
const loading = ref(false);
const error = ref<string | null>(null);

const onSubmit = async (value: Category) => {
  try {
    loading.value = true;
    const res = await axios.post('categories', {
      name: value.name,
    });
    item.value = res.data.data;
  } catch (err) {
    console.error('Error creating category:', err);
    error.value = 'Une erreur est survenue';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <h1>Ajout d'une catégorie</h1>

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
      v-else
      :item="item"
      @submit="onSubmit"
    />
  </div>
</template>

<style lang="sass" scoped>
</style>
