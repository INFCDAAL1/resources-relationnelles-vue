<script lang="ts" setup>
import type { Conversation } from '@/types';
import { useMessageStore } from "@/stores/message.ts";

const store = useMessageStore();

const props = defineProps<{
  items: Conversation[],
  search?: string,
}>();

const emit = defineEmits<{
  (e: 'search', value: string): void;
}>();

const page = ref(1);
const itemsPerPage = ref(10);
const totalPages = computed(() => Math.ceil(props.items.length / itemsPerPage.value));
const search = shallowRef("");

watch(search, (newValue) => {
  emit('search', newValue);
});

watch(() => props.search, (newValue: string|undefined) => {
  search.value = newValue || "";
});

onMounted(() => {
  search.value = props.search || "";
});
</script>

<template>
  <div class="d-flex flex-column ga-5">
    <v-data-iterator :items="items" :items-per-page="itemsPerPage" :page="page" :search="search">
      <template #header>
        <div class="d-flex ga-3 align-center justify-center">
          <v-select
            v-model="itemsPerPage"
            :items="[5, 10, 15, 20]"
            hide-details
            label="Items per page"
            max-width="350"
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
          <template v-for="(item, i) in items" :key="item.raw.user.id">
            <MessageGroupCard :item="item.raw" />
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