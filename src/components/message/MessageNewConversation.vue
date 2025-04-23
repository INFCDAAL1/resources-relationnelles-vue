<script setup lang="ts">
import { useMessageStore } from "@/stores/message.ts";
import type { User } from "@/types";
import { useRouter } from "vue-router";

const router = useRouter();
const messageStore = useMessageStore();
const isLoading = ref(false);
const error = ref<string | null>(null);
const selectedUser = ref<User | null>(null);
const message = ref("");
const users = ref<User[]>([]);

const emit = defineEmits<{
  (e: 'conversation-started'): void;
}>();

const loadUsers = async () => {
  try {
    isLoading.value = true;
    await messageStore.fetchAvailableUsers();
    users.value = messageStore.getUsersNotInConversation;
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Failed to load users";
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadUsers);

const startConversation = async () => {
  if (!selectedUser.value || !message.value.trim()) return;

  try {
    isLoading.value = true;
    await messageStore.startConversation(selectedUser.value.id, message.value);

    // Emit event to parent component
    emit('conversation-started');

    // Navigate to the new conversation
    router.push(`/message/${selectedUser.value.id}`);
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Failed to start conversation";
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="new-conversation">
    <h2>Démarrer une nouvelle conversation</h2>

    <v-alert v-if="error" type="error" class="mb-4">
      {{ error }}
    </v-alert>

    <v-alert type="info" v-if="users.length === 0 && !error">
      Vous avez déjà des conversations avec tous les utilisateurs disponibles.
    </v-alert>

    <v-form v-else @submit.prevent="startConversation">
      <v-select
        v-model="selectedUser"
        :items="users"
        item-title="name"
        item-value="id"
        label="Sélectionnez un utilisateur"
        :loading="isLoading"
        :disabled="isLoading"
        return-object
        class="mb-4"
      ></v-select>

      <v-textarea
        v-model="message"
        label="Message"
        :disabled="isLoading"
        class="mb-4"
        rows="3"
        required
      ></v-textarea>

      <v-btn
        type="submit"
        color="primary"
        :loading="isLoading"
        :disabled="!selectedUser || !message.trim() || isLoading"
      >
        Démarrer la conversation
      </v-btn>
    </v-form>
  </div>
</template>
