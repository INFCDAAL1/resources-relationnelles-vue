<script lang="ts" setup>
import type {Resource} from '@/types';

const items: Ref<Resource[]> = ref(Array.from({length: 137}, (_, i) => ({
  id: i,
  name: "Resource " + i,
  description: "Description of resource " + i,
  category: "Resource",
  isValid: true,
  isPublished: true,
  createdAt: new Date(),
  updatedAt: new Date(),
})));

items.value.push({
  id: 137,
  name: "Resource personnelle",
  description: "Un poney qui fait des tours de magie",
  category: "Resource",
  isValid: true,
  isPublished: true,
  createdAt: new Date(),
  updatedAt: new Date(),
})

const page = ref(1)
const itemsPerPage = ref(10);
const totalPages = computed(() => Math.ceil(items.value.length / itemsPerPage.value));
const search = shallowRef('')
</script>
<template>
  <h1>Liste des ressources</h1>
  <v-data-iterator :items="items" :items-per-page="itemsPerPage" :page="page" :search="search">
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
          <ResourceCard :item="item.raw"/>
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


</template>


<style lang="sass" scoped>
</style>
