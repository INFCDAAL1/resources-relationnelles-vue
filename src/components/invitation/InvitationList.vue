<script lang="ts" setup>
import type {FilterInvitation, Invitation} from '@/types';
import {useResourceStore} from "@/stores/resource.ts";

const store = useResourceStore()

const props = defineProps<{
  items: Invitation[],
  filter: FilterInvitation,
  search: string,
  noFilter?: boolean,
}>()

const emit = defineEmits<{
  (e: 'filter', value: FilterInvitation): void;
  (e: 'search', value: string): void;
}>();

const page = ref(1)
const itemsPerPage = ref(10);
const totalPages = computed(() => Math.ceil(props.items.length / itemsPerPage.value));
const search = shallowRef("");
watch(search, (newValue) => {
  emit('search', newValue);
})
watch(() => props.search, (newValue: string) => {
  search.value = newValue
})

const filterModel: Ref<FilterInvitation> = ref("all");
watch(filterModel, (_) => {
  emit('filter', filterModel.value);
})
watch(() => props.filter, (newFilter: FilterInvitation) => {
  filterModel.value = newFilter
})

onMounted(() => {
  filterModel.value = props.filter
  search.value = props.search
})
</script>
<template>
  <div class="d-flex flex-column ga-5">
    <v-data-iterator v-if="items" :items="items" :items-per-page="itemsPerPage" :page="page" :search="search">
      <template #header>
        <div class="d-flex ga-3 align-center justify-center">
          <v-select
            v-model="itemsPerPage"
            :items="[5, 10, 15, 20]"
            hide-details
            label="Items per page"
            max-width="350"
          ></v-select>
          <v-select
            v-if="!noFilter"
            v-model="filterModel"
            :items="['pending' , 'accepted' , 'all']"
            hide-details
            label="Filtre invitations"
            max-width="350"
          ></v-select>
          <v-text-field
            v-model="search"
            hide-details
            label="Recherche"
            max-width="350"
          ></v-text-field>
        </div>
      </template>
      <template v-slot:default="{ items }">
        <div class="d-flex flex-column ga-3">
          <template v-for="(item, i) in items" :key="item.raw.id">
            <InvitationCard :item="item.raw"/>
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
