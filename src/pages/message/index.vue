<script setup lang="ts">
import type {GroupMessage} from "@/types";
import {useMessageStore} from "@/stores/message.ts";
const store = useMessageStore()

const items:Ref<GroupMessage[]> = ref([])

onMounted(()=>{
items.value = store.getAllMessages
})
</script>

<template>
<h1>Vos messages</h1>
  <MessageList :items="items"/>
</template>

<style scoped lang="sass">

</style>
