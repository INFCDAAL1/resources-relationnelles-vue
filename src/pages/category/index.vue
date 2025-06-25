<script lang="ts" setup>
import type {Category} from "@/types";
import axios from "@/lib/axios.ts";

definePage({
  meta: {
    layout: 'default',
    requiresAuth: true,
  },
});
const items: Ref<Category[]> = ref([]);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(() => {
  axios.get('categories')
    .then(response => {
      items.value = response.data.data;
    })
    .catch(err => {
      console.error('Error fetching categories:', err);
      error.value = err.message || 'Une erreur est survenue';
    })
    .finally(() => {
      loading.value = false;
    });
});
</script>

<template>
  <div>
    <h1>Catégorie</h1>

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

    <v-empty-state
      v-else-if="items.length === 0"
      icon="mdi-message-outline"
      title="Aucune catégorie"
    />

    <CategoryList
      v-else
      :items="items"
    />

    <v-fab
      v-role="['admin', 'user','moderator','superadmin']"
      app
      color="primary"
      icon="mdi-plus"
      size="75"
      to="/category/add"
    />
  </div>
</template>

<style lang="sass" scoped>
</style>
