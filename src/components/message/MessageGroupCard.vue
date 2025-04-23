<script setup lang="ts">
import type {GroupMessage, Message} from "@/types";

const props=defineProps<{
item: GroupMessage
}>()

const limitChars = 50;
const shortContent = (message:Message) => {
  if (message.content.length > limitChars) {
    return message.content.substring(0, limitChars) + '...';
  }
  return message.content;
};

</script>

<template>
<v-card :title="item.name" :to="'/message/'+item.id">
  <v-card-text>
    <div class="d-flex flex-column flex-wrap">
      <div v-for="message in item.messages.slice(0,3)" :key="message.id">
        {{ new Date(message.createdAt).toLocaleTimeString() }} <strong>{{ message.sender.name }}</strong> : {{ shortContent(message) }}
      </div>
    </div>
  </v-card-text>

</v-card>
</template>

<style scoped lang="sass">

</style>
