<script lang="ts" setup>
import {useUserStore} from "@/stores/user.ts";
import type {GroupMessage, Message, RouteParams} from "@/types";
import {definePage} from 'unplugin-vue-router/runtime';
import {useRoute, useRouter} from "vue-router";
import axios from "@/lib/axios.ts";
import {computed, onMounted, ref, type Ref} from "vue";

definePage({
  meta: {
    layout: 'default',
    requiresAuth: true,
  },
});

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const conversation: Ref<GroupMessage | null> = ref(null);
const messages: Ref<Message[]> = ref([]);
const newMessage = ref("");
const loading = ref(true);
const error = ref<string | null>(null);

const userId = computed(() => {
  const {id} = route.params as RouteParams;
  return Number(id);
});

const fetchNewMessages = async () => {
  loading.value = true;
  try {
    const res = await axios.get(`/messages`, {
      params: {user_id: userId.value},
    });
    messages.value = res.data.data;
  } catch (err) {
    console.error('Failed to load conversation:', err);
    error.value = err instanceof Error ? err.message : 'Unknown error occurred';
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  try {
    await fetchNewMessages();

    const response = await axios.get("messages");
    conversation.value = response.data.find((conv: GroupMessage) => conv.id === userId.value) || null;
  } catch (err) {
    console.error('Failed to fetch messages:', err);
    error.value = err instanceof Error ? err.message : 'Unknown error occurred';
  }
});

const sendMessage = async () => {
  if (newMessage.value.trim() === "") return;

  try {
    await axios.post("/messages", {
      receiver_id: userId.value,
      content: newMessage.value,
    });

    newMessage.value = "";
    await fetchNewMessages(); // refresh messages
  } catch (err) {
    console.error('Failed to send message:', err);
    error.value = err instanceof Error ? err.message : 'Unknown error occurred';
  }
};

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
      <h2>{{ conversation?.name || 'Conversation' }}</h2>

    </div>

    <div v-if="loading" class="d-flex justify-center my-5">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </div>

    <v-alert v-else-if="error" type="error">
      {{ error }}
    </v-alert>

    <v-card v-else flat>
      <v-card-text>
        <v-list>
          <v-list-item
            v-for="message in messages"
            :key="message.id"
            class="py-2"
          >
            <v-list-item-title>
              <div class="text-wrap">
                <strong>{{ message.is_sender ? 'Moi' : conversation?.name }} :</strong> {{ message.content }}
              </div>
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ formatDate(message.created_at) }}
            </v-list-item-subtitle>
          </v-list-item>
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
</style>
