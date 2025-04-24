<script lang="ts" setup>
import type {User} from "@/types";
import {useRouter} from "vue-router";
import axios from "@/lib/axios.ts";

const router = useRouter();
const loading: Ref<boolean> = ref(false);
const error: Ref<string> = ref("");
const selectedUser: Ref<User | null> = ref(null);
const message: Ref<string> = ref("");
const users: Ref<User[]> = ref([]);

const emit = defineEmits<{
  (e: 'conversation-started'): void;
}>();

const usersList = ref<User[]>([]);

onMounted(async () => {
  try {
    loading.value = true;
    const res = await axios.get("users/list")
    console.log(res.data)
    usersList.value = res.data

  } catch (err) {
    error.value = err instanceof Error ? err.message : "Failed to load users";
  } finally {
    loading.value = false;
  }
});

const startConversation = async () => {
  if (!selectedUser.value || !message.value.trim()) return;

  try {
    loading.value = true;
    await axios.post("/messages", {
      receiver_id: selectedUser.value.id,
      message: message.value,
    });

    // Emit event to parent component
    emit('conversation-started');

    // Navigate to the new conversation
    router.push(`/message/${selectedUser.value.id}`);
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Failed to start conversation";
    loading.value = false;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="new-conversation">
    <h2>Démarrer une nouvelle conversation</h2>

    <v-alert v-if="error" class="mb-4" type="error">
      {{ error }}
    </v-alert>

    <v-alert v-if="users.length === 0 && !error" type="info">
      Vous avez déjà des conversations avec tous les utilisateurs disponibles.
    </v-alert>

    <v-form v-else @submit.prevent="startConversation">
      <v-select
        v-model="selectedUser"
        :disabled="loading"
        :items="users"
        :loading="loading"
        class="mb-4"
        item-title="name"
        item-value="id"
        label="Sélectionnez un utilisateur"
        return-object
      ></v-select>

      <v-textarea
        v-model="message"
        :disabled="loading"
        class="mb-4"
        label="Message"
        required
        rows="3"
      ></v-textarea>

      <v-btn
        :disabled="!selectedUser || !message.trim() || loading"
        :loading="loading"
        color="primary"
        type="submit"
      >
        Démarrer la conversation
      </v-btn>
    </v-form>
  </div>
</template>
