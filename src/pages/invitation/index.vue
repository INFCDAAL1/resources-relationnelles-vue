<script lang="ts" setup>

import axios from "@/lib/axios.ts";
import {useResourceStore} from "@/stores/resource.ts";
import {useInvitationStore} from "@/stores/invitation.ts";
import type {FilterInvitation, Invitation, InvitationResponse, Resource} from "@/types";
import type {AxiosResponse} from "axios";

const store = useInvitationStore()
const resourceStore = useResourceStore()

const resources: Ref<Resource[]> = ref([])
const invitation: Ref<Invitation[]> = ref([])

const filter: Ref<FilterInvitation> = ref("all");
watch(filter, (newValue) => {
  if (filter.value != newValue) {
    applyFilter(newValue);
  }
});


onMounted(() => {
  resources.value = resourceStore.getMyResources
  invitation.value = store.getAllInvitations
  if (invitation.value) {
    axios.get(`invitations`).then((response: AxiosResponse<InvitationResponse>) => {
      store.setInvitations(response.data.data)
    }).catch((error) => {
      console.error(error)
    })
  }
})

const applyFilter = (value: FilterInvitation) => {
  if (value === "all") {
    invitation.value = store.getAllInvitations
  } else {
    invitation.value = store.getInvitationsByStatus(value)
  }
}

</script>

<template>
  <h1>Liste des invitations</h1>
  <v-row>
    <v-col>
      <InvitationList :filter="filter" :items="invitation" search="" @filter="applyFilter"/>
    </v-col>
    <v-col>
      <InvitationForm/>
    </v-col>
  </v-row>
</template>

<style lang="sass" scoped>

</style>
