<script lang="ts" setup>
import type {GroupMessage} from "@/types";

defineProps<{
  item: GroupMessage
}>()

const limitChars = 50;
const shortContent = (content: string | undefined) => {
  if (!content) return 'No message';
  if (content.length > limitChars) {
    return content.substring(0, limitChars) + '...';
  }
  return content;
};

// Format time from ISO string
const formatTime = (dateString: string | null) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleTimeString();
};
</script>

<template>
  <v-card :to="`/message/${item.id}`">
    <v-card-title class="d-flex justify-space-between">
      <span>{{ item.name }}</span>
    </v-card-title>

    <v-card-text>
      <div class="d-flex flex-column flex-wrap">
        <div v-if="item.last_message">
          <div
            v-for="message in item.last_message"
            :key="message.id"
          >
            <div class="d-flex justify-space-between">
              <div class="text-wrap">
                <strong>{{ message.sender.name }}:</strong> {{ shortContent(message.content) }}
              </div>
              <div class="text-grey">
                {{ formatTime(message.created_at) }}
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="text-grey"
        >
          No messages yet
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style lang="sass" scoped>
</style>
