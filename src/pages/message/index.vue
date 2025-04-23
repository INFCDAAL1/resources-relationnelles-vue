<script setup lang="ts">
import { useMessageStore } from "@/stores/message.ts";
import { definePage } from 'unplugin-vue-router/runtime';
import type { Conversation } from "@/types";
import MessageNewConversation from '@/components/message/MessageNewConversation.vue';
import MessageList from '@/components/message/MessageList.vue';

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
const showNewConversation = ref(false);

onMounted(async () => {
  try {
    isLoading.value = true;
    await store.fetchConversations();
    items.value = store.conversations || []; 
  } catch (err) {
    console.error('Failed to fetch conversations:', err);
    error.value = err instanceof Error ? err.message : 'Unknown error occurred';
    items.value = []; 
  } finally {
    isLoading.value = false;
  }
});

// Auto-hide the new conversation component when a new conversation is started
const closeNewConversation = () => {
  showNewConversation.value = false;
};
</script>

<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1>Vos messages</h1>
      <v-btn 
        color="primary" 
        prepend-icon="mdi-message-plus" 
        @click="showNewConversation = !showNewConversation"
        :text="showNewConversation ? 'Fermer' : 'Nouvelle conversation'"
      ></v-btn>
    </div>
    
    <v-expand-transition>
      <MessageNewConversation 
        v-if="showNewConversation" 
        class="mb-5" 
        @conversation-started="closeNewConversation"
      />
    </v-expand-transition>
    
    <div v-if="isLoading" class="d-flex justify-center my-5">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    
    <v-alert v-else-if="error" type="error">
      {{ error }}
    </v-alert>
    
    <div v-else-if="items.length === 0 && !showNewConversation" class="text-center my-10">
      <v-icon size="large" color="grey">mdi-message-outline</v-icon>
      <p class="mt-2 text-grey">Aucune conversation</p>
    </div>
    
    <MessageList v-else-if="items.length > 0" :items="items" />
  </div>
</template>

<style scoped lang="sass">
</style>