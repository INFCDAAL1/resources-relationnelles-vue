<script lang="ts" setup>
import type {Invitation} from "@/types";
import {useInvitationStore} from "@/stores/invitation.ts";
import axios from "@/lib/axios.ts";

const props = defineProps<{
  item: Invitation
}>()

const store = useInvitationStore()
const loading = ref(false)
const isAccepted = computed(() => {
  return props.item.status === 'accepted'
})
const isRejected = computed(() => {
  return props.item.status === 'rejected'
})

const isPending = computed(() => {
  return props.item.status === 'pending'
})

const color = computed(() => {
  if (isAccepted.value) {
    return 'green'
  } else if (isRejected.value) {
    return 'red'
  }
})

const icon = computed(() => {
  if (isAccepted.value) {
    return 'mdi-check-circle-outline'
  } else if (isRejected.value) {
    return 'mdi-close-circle-outline'
  } else if (isPending.value) {
    return 'mdi-clock-outline'
  }
})

const submit = (value: boolean): void => {
  // axios.post(`/api/invitation/${props.item.id}`,  {result: value})
  //   .then(() => {
  //     if (value) props.item.status = 'accepted'
  //     else props.item.status = 'rejected'
  //
  //     store.updateInvitation({...props.item, status: props.item.status})
  //   })
  //   .catch((error) => {
  //     console.error('Error updating invitation:', error)
  //   })

  if (value) props.item.status = 'accepted'
  else props.item.status = 'rejected'

  store.updateInvitation({...props.item, status: props.item.status})
}

</script>

<template>
  <v-card :loading="loading" :append-icon="icon">
    <template #title>
      <div class="text-wrap text-body-1">{{ item.sender.name }} vous invite à rejoindre {{ item.resource.name }}</div>
    </template>
    <template #actions>
      <div class="d-flex ga-5">
        <v-btn
          :color="color"
          :disabled="!isPending"
          :loading="loading"
          variant="plain"
          @click="submit(true)"
        >
          Accepter
        </v-btn>
        <v-btn
          :color="color"
          :disabled="!isPending"
          :loading="loading"
          variant="plain"
          @click="submit(false)"
        >
          Rejeter
        </v-btn>
      </div>
    </template>
  </v-card>
</template>

<style lang="sass" scoped>

</style>
