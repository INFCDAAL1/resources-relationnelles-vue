<script lang="ts" setup>
import type {FilterResource, Resource} from '@/types';
import {useResourceStore} from "@/stores/resource.ts";

const store = useResourceStore()

const props = defineProps<{
  items: Resource[],
  filter: FilterResource,
  search: string,
  noFilter?: boolean,
}>()

const emit = defineEmits<{
  (e: 'filter', value:FilterResource): void;
  (e: 'search', value:string): void;
}>();

const page = ref(1)
const itemsPerPage = ref(10);
const totalPages = computed(() => Math.ceil(props.items.length / itemsPerPage.value));
const search = shallowRef("");
watch(search, (newValue) => {
  emit('search', newValue);
})
watch(()=>props.search,(newValue:string) => {
  search.value = newValue
})

const filterModel: Ref<FilterResource> = ref("all");
watch(filterModel,(_) => {
  emit('filter', filterModel.value);
})
watch(()=>props.filter,(newFilter:FilterResource) => {
  filterModel.value = newFilter
})

onMounted(()=> {
    filterModel.value = props.filter
    search.value = props.search
})

</script>
<template>
  <div class="d-flex flex-column ga-5">
    <v-data-iterator v-if="items" :items="items" :items-per-page="itemsPerPage" :page="page" :search="search">
      <template #header>
        <div class="d-flex ga-3 align-center justify-center" >
          <v-select
            v-model="itemsPerPage"
            :items="[5, 10, 15, 20]"
            hide-details
            label="Items per page"
            max-width="350"
          ></v-select>
          <v-select
            v-model="filterModel"
            :items="['favorite', 'published', 'unpublished','all']"
            hide-details
            label="Filtre ressources"
            max-width="350"
            v-if="!noFilter"
          ></v-select>
          <v-text-field
            v-model="search"
            hide-details
            label="Search"
            max-width="350"
          ></v-text-field>
        </div>
      </template>
      <template v-slot:default="{ items }">
        <div class="d-flex flex-column ga-3">
          <template v-for="(item, i) in items" :key="item.id">
            <ResourceCard :item="item.raw" @toggle-favorite="store.toggleResourceFavorite">
              <template #action>
                <v-btn :to="'/resource/'+item.raw.id" append-icon="mdi-arrow-right" variant="tonal">En savoir plus
                </v-btn>
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
