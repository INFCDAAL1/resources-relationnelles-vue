<script lang="ts" setup>
import type {Invitation} from "@/types";
import {useInvitationStore} from "@/stores/invitation.ts";
import {useUserStore} from "@/stores/user.ts";
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


const isSender = computed(() => {
  const userStore = useUserStore()
  return props.item.sender.id === userStore?.user?.id
})

const acceptInvitation = (): void => {
  loading.value = true

  axios.patch(`/invitations/${props.item.id}`, {status: 'accepted'})
    .then(() => {
      props.item.status = 'accepted'
      loading.value = false
    })
    .catch((error) => {
      console.error('Error accepting invitation:', error)
      loading.value = false
    })
}

const cancelInvitation = (): void => {
  loading.value = true
  axios.delete(`/invitations/${props.item.id}`)
    .then(() => {
      props.item.deleted = true
      loading.value = false
    })
    .catch((error) => {
      console.error('Error deleting invitation:', error)
      loading.value = false
    })
}

</script>

<template>
  <v-card v-if="!props.item.deleted" :append-icon="icon" :loading="loading">
    <template #title>
      <div class="text-wrap text-body-1"><span class="text-orange">{{ item.sender.name }}</span> invite <span
        class="text-green">{{ item.receiver.name }}</span> à rejoindre <span class="text-orange">{{
          item.resource.name
        }}</span></div>
    </template>
    <template #actions>
      <div>
        <div class="d-flex ga-5">
          <v-btn v-if="!isSender"
                 :color="color"
                 :disabled="!isPending"
                 :loading="loading"
                 variant="plain"
                 @click="acceptInvitation"
          >
            Accepter
          </v-btn>
          <v-btn :color="color"
                 :loading="loading"
                 variant="plain"
                 @click="cancelInvitation">
            Annuler l'invitation
          </v-btn>
        </div>

      </div>
    </template>
  </v-card>
</template>

<style lang="sass" scoped>

</style>
