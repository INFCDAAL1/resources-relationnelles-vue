<script lang="ts" setup>
import type {Conversation} from "@/types";

const props = defineProps<{
  item: Conversation
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
  <v-card :to="`/message/${item.user.id}`">
    <v-card-title class="d-flex justify-space-between">
      <span>{{ item.user.name }}</span>
      <v-chip v-if="item.unread_count > 0" color="error" size="small">
        {{ item.unread_count }}
      </v-chip>
    </v-card-title>

    <v-card-text>
      <div class="d-flex flex-column flex-wrap">
        <div v-if="item.last_message">
          {{ formatTime(item.last_activity) }}
          <strong>{{ item.last_message.sender.name }}</strong>:
          {{ shortContent(item.last_message.content) }}
        </div>
        <div v-else class="text-grey">
          No messages yet
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style lang="sass" scoped>
</style>
