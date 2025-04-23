<script setup lang="ts">
import { useMessageStore } from "@/stores/message.ts";
import { definePage } from 'unplugin-vue-router/runtime';
import type { Conversation } from "@/types";

definePage({
  meta: {
    layout: 'default',
    requiresAuth: true,
  },
});

const store = useMessageStore();
const isLoading = ref(true);
const error = ref<string | null>(null);
const items = ref<Conversation[]>([]);

onMounted(async () => {
  try {
    isLoading.value = true;
    await store.fetchConversations();
    items.value = store.conversations;
  } catch (err) {
    console.error('Failed to fetch conversations:', err);
    error.value = err instanceof Error ? err.message : 'Unknown error occurred';
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div>
    <h1>Vos messages</h1>
    
    <div v-if="isLoading" class="d-flex justify-center my-5">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    
    <v-alert v-else-if="error" type="error">
      {{ error }}
    </v-alert>
    
    <div v-else-if="items.length === 0" class="text-center my-10">
      <v-icon size="large" color="grey">mdi-message-outline</v-icon>
      <p class="mt-2 text-grey">Aucune conversation</p>
    </div>
    
    <MessageList v-else :items="items" />
  </div>
</template>

<style scoped lang="sass">
</style>