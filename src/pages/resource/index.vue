<script lang="ts" setup>
import type {Resource} from '@/types';
import {definePage} from "unplugin-vue-router/runtime";
import {useResourceStore} from "@/stores/resource.ts";

definePage({
  meta: {
    layout: 'default',
    requiresAuth: false,
  },
})

const store = useResourceStore()

const items: Ref<Resource[]> = ref([]as Resource[]);

onMounted(()=>{
  items.value=store.getAllResources;

  store.addResource({
    id: items.value.length+1,
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

const page = ref(1)
const itemsPerPage = ref(10);
const totalPages = computed(() => Math.ceil(items.value.length / itemsPerPage.value));
const search = shallowRef('')
</script>
<template>
  <div class="d-flex flex-column ga-5">
  <h1>Liste des ressources {{items.length}}</h1>
  <v-data-iterator v-if="items" :items="items" :items-per-page="itemsPerPage" :page="page" :search="search">
    <template #header>
      <v-row>
        <v-col cols="12" sm="6">
          <v-select
            v-model="itemsPerPage"
            :items="[5, 10, 15, 20]"
            hide-details
            label="Items per page"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="search"
            hide-details
            label="Search"
          ></v-text-field>
        </v-col>
      </v-row>
    </template>
    <template v-slot:default="{ items }">
      <div class="d-flex flex-column ga-3">
        <template v-for="(item, i) in items" :key="item.id">
          <ResourceCard :item="item.raw" @toggle-favorite="store.toggleResourceFavorite">
            <template #action>
              <v-btn :to="'/resource/'+item.raw.id" variant="tonal" append-icon="mdi-arrow-right">En savoir plus</v-btn>
            </template>
          </ResourceCard>
        </template>

      </div>
    </template>
    <template #footer>
      <v-pagination
        v-model="page"
        :length="totalPages"
        total-visible="5"
      ></v-pagination>
    </template>
  </v-data-iterator>

  </div>
</template>


<style lang="sass" scoped>
</style>
