<script lang="ts" setup>
import type {Message} from '@/types';
import {useMessageStore} from "@/stores/message.ts";
import {useUserStore} from "@/stores/user.ts";

const messageStore = useMessageStore();
const userStore = useUserStore();

const props = defineProps<{
  messages: Message[],
  userId: number
}>();

const newMessage = ref('');

// Current user
const currentUser = computed(() => userStore.user);

// Send a new message
const sendMessage = async () => {
  if (!newMessage.value.trim()) return;

  try {
    await messageStore.sendMessage(props.userId, newMessage.value);
    newMessage.value = '';
  } catch (error) {
    console.error('Failed to send message:', error);
  }
};

// Message container ref for scrolling
const messageContainer = ref<HTMLElement | null>(null);

// Scroll to bottom when messages change
watch(() => props.messages, () => {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    }
  });
}, {deep: true});

onMounted(() => {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    }
  });
});

// Format message time
const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
};
</script>

<template>
  <div class="message-detail">
    <!-- Messages -->
    <div ref="messageContainer" class="message-container">
      <div v-for="message in messages" :key="message.id"
           :class="['message', message.sender.id === currentUser?.id ? 'sent' : 'received']">
        <div class="message-bubble">
          {{ message.content }}
          <div class="message-time">
            {{ formatTime(message.created_at) }}
            <v-icon v-if="message.sender.id === currentUser?.id"
                    :color="message.read ? 'success' : 'grey'"
                    size="x-small">
              {{ message.read ? 'mdi-check-all' : 'mdi-check' }}
            </v-icon>
          </div>
        </div>
      </div>
    </div>

    <!-- Message input -->
    <div class="message-input">
      <v-form class="d-flex ga-2" @submit.prevent="sendMessage">
        <v-text-field
          v-model="newMessage"
          density="compact"
          hide-details
          placeholder="Type a message..."
          variant="outlined"
          @keyup.enter.prevent="sendMessage"
        ></v-text-field>
        <v-btn color="primary" icon @click="sendMessage">
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.message-detail
  height: 70vh
  display: flex
  flex-direction: column

.message-container
  flex: 1
  overflow-y: auto
  padding: 1rem
  display: flex
  flex-direction: column
  gap: 0.5rem

.message
  max-width: 70%
  margin-bottom: 0.5rem

  &.sent
    align-self: flex-end

    .message-bubble
      background-color: #e3f2fd
      border-radius: 18px 18px 0 18px

  &.received
    align-self: flex-start

    .message-bubble
      background-color: #f5f5f5
      border-radius: 18px 18px 18px 0

.message-bubble
  padding: 10px 15px
  position: relative

.message-time
  font-size: 0.7rem
  color: #757575
  text-align: right
  margin-top: 4px

.message-input
  padding: 1rem
  border-top: 1px solid #e0e0e0
</style>
