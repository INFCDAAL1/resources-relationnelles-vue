<script lang="ts" setup>
import type {GroupMessage} from '@/types';

const props = defineProps<{
  items: GroupMessage[],
  search?: string,
}>();

const emit = defineEmits<{
  (e: 'search', value: string): void;
}>();
const page = ref(1);
const itemsPerPage = ref(10);
const totalPages = computed(() => Math.ceil(props.items.length / itemsPerPage.value));
const searchQuery = shallowRef("");

watch(searchQuery, (newValue) => {
  emit('search', newValue);
});

watch(() => props.search, (newValue: string | undefined) => {
  searchQuery.value = newValue || "";
});

onMounted(() => {
  searchQuery.value = props.search || "";
});
</script>

<template>
  <div class="d-flex flex-column ga-5">
    <v-data-iterator
      :items="items"
      :items-per-page="itemsPerPage"
      :page="page"
      :search="searchQuery"
    >
      <template #header>
        <div class="d-flex ga-3 align-center justify-center">
          <v-select
            v-model="itemsPerPage"
            :items="[5, 10, 15, 20]"
            hide-details
            label="Items per page"
            max-width="350"
          />
          <v-text-field
            v-model="searchQuery "
            hide-details
            label="Search"
            max-width="350"
          />
        </div>
      </template>
      <template #default="{ items: messageItems }">
        <div class="d-flex flex-column ga-3">
          <template
            v-for="(item) in messageItems"
            :key="item.raw"
          >
            <MessageGroupCard :item="item.raw" />
          </template>
        </div>
      </template>
      <template #footer>
        <v-pagination
          v-model="page"
          :length="totalPages"
          total-visible="5"
        />
      </template>
    </v-data-iterator>
  </div>
</template>
