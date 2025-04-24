<script lang="ts" setup>
import {useMessageStore} from "@/stores/message.ts";
import {definePage} from 'unplugin-vue-router/runtime';
import type {Conversation} from "@/types";
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
      <h1>Vos messages</h1>
    <v-expand-transition>
      <MessageNewConversation
        v-if="showNewConversation"
        class="mb-5"
        @conversation-started="closeNewConversation"
      />
    </v-expand-transition>

    <div v-if="isLoading" class="d-flex justify-center my-5">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </div>

    <v-alert v-else-if="error" type="error">
      {{ error }}
    </v-alert>

    <v-empty-state
      v-else-if="items.length === 0 && !showNewConversation"
      icon="mdi-message-outline"
      title="Aucune conversation"
    ></v-empty-state>


    <MessageList v-else-if="items.length > 0" :items="items"/>
    <v-fab v-role="['admin', 'user','moderator','superadmin']" app color="primary" :icon="showNewConversation ? 'mdi-close' :'mdi-message-plus'" size="75"
           @click="showNewConversation = !showNewConversation"></v-fab>
  </div>
</template>

<style lang="sass" scoped>
</style>
