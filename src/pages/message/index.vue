<script lang="ts" setup>
import axios from "@/lib/axios.ts";
import type {AxiosResponse} from "axios";
import type {GroupMessage, GroupMessageResponse} from "@/types";

definePage({
  meta: {
    layout: 'default',
    requiresAuth: true,
  },
});
const loading = ref(true);
const error = ref<string | null>(null);
const showNewConversation = ref(false);
const conversations:Ref<GroupMessage[]> = ref([]);

onMounted(async () => {
  try {
    loading.value = true;

    const response:AxiosResponse<GroupMessageResponse> = await axios.get("messages");
    conversations.value = response.data.data || [];

    if ((conversations.value.length ?? 0) === 0) {
      console.log('No conversations found, showing new conversation component');
      showNewConversation.value = true;
    }
  } catch (err) {
    console.error('Failed to fetch conversations:', err);
    error.value = err instanceof Error ? err.message : 'Erreur inconnue';
  } finally {
    loading.value = false;
  }
});

const toggleNewConversation = () => {
  showNewConversation.value = !showNewConversation.value;
};

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

    <div v-if="loading" class="d-flex justify-center my-5">
      <v-progress-circular color="primary" indeterminate/>
    </div>

    <v-alert v-else-if="error" type="error">
      {{ error }}
    </v-alert>

    <v-empty-state
      v-else-if="conversations.length === 0 && !showNewConversation"
      icon="mdi-message-outline"
      title="Aucune conversation"
    />

    <MessageList
      v-else-if="conversations.length > 0"
      :items="conversations"
    />

    <v-fab
      v-role="['admin', 'user', 'moderator', 'superadmin']"
      :icon="showNewConversation ? 'mdi-close' : 'mdi-message-plus'"
      app
      color="primary"
      size="75"
      @click="toggleNewConversation"
    />
  </div>
</template>

<style lang="sass" scoped>
</style>
