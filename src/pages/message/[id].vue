<script lang="ts" setup>
import {useUserStore} from "@/stores/user.ts";
import {useMessageStore} from "@/stores/message.ts";
import type {Message, RouteParams} from "@/types";
import {definePage} from 'unplugin-vue-router/runtime';

definePage({
  meta: {
    layout: 'default',
    requiresAuth: true,
  },
});

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const messageStore = useMessageStore();

const messages = ref<Message[]>([]);
const newMessage = ref<string>("");
const isLoading = ref(true);
const error = ref<string | null>(null);

// Get user ID from route params
const userId = computed(() => {
  const {id} = route.params as RouteParams;
  return Number(id);
});

// Get user info from conversation
const conversationUser = computed(() => {
  const conversation = messageStore.conversations.find(c => c.user.id === userId.value);
  return conversation?.user || {id: userId.value, name: 'User'};
});

onMounted(async () => {
  try {
    isLoading.value = true;

    // Make sure conversations are loaded
    if (messageStore.conversations.length === 0) {
      await messageStore.fetchConversations();
    }

    // Fetch messages for this conversation
    await messageStore.fetchMessagesByUserId(userId.value);
    messages.value = messageStore.messages;

    // Mark messages as read
    await messageStore.markAllAsRead(userId.value);
  } catch (err) {
    console.error('Failed to load conversation:', err);
    error.value = err instanceof Error ? err.message : 'Unknown error occurred';
  } finally {
    isLoading.value = false;
  }
});

const sendMessage = async () => {
  if (newMessage.value.trim() === "") return;

  try {
    await messageStore.sendMessage(userId.value, newMessage.value);
    newMessage.value = ""; // Reset input field
  } catch (err) {
    console.error('Failed to send message:', err);
    // You could show an error toast here
  }
};

// Format date for display
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};
</script>

<template>
  <v-container>
    <div class="d-flex align-center mb-4">
      <v-btn class="mr-2" icon @click="router.push('/message')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h2>{{ conversationUser.name }}</h2>
    </div>

    <div v-if="isLoading" class="d-flex justify-center my-5">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </div>

    <v-alert v-else-if="error" type="error">
      {{ error }}
    </v-alert>

    <v-card v-else flat>
      <v-card-text>
        <v-list>
          <v-list-item-group>
            <v-list-item v-for="message in messages" :key="message.id">
              <v-list-item-content>
                <v-list-item-title>
                  <div class="text-wrap">
                    <strong>{{ message.sender.name }}:</strong> {{ message.content }}
                  </div>
                </v-list-item-title>
                <v-list-item-subtitle>{{ formatDate(message.created_at) }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-text-field
          v-model="newMessage"
          label="Écrire un message..."
          @keyup.enter="sendMessage"
        />
        <v-btn @click="sendMessage">Envoyer</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style lang="sass" scoped>
.text-wrap
  white-space: normal
  word-break: break-word

v-list-item-content
  max-width: 100%
</style>
