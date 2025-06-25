<script lang="ts" setup>
import type {Resource, User} from "@/types";
import axios from "@/lib/axios.ts";
import {useInvitationStore} from "@/stores/invitation.ts";
import type {AxiosResponse} from "axios";
import {useUserStore} from "@/stores/user.ts";

const store = useInvitationStore()

const users: Ref<Partial<User>[]> = ref([] as Partial<User>[])
const resources: Ref<Resource[]> = ref([] as Resource[])

const userSelected: Ref<Partial<User> | undefined> = ref()
const resourceSelected: Ref<Resource | undefined> = ref()


const userStore = useUserStore()
const filteredResources = computed(() => {
  return resources.value.filter((res) => {
    return res.user.id === userStore?.user?.id
  });
});

const isLoading = ref(true)
const formStatus = ref<null | { type: 'success' | 'error'; message: string }>(null);

onMounted(async () => {
  try {
    const [userResponse, resourceResponse] = await Promise.all([
      axios.get(`users/list`),
      axios.get('resources')
    ])
    users.value = userResponse.data.data
    resources.value = resourceResponse.data.data
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
})

const submit = async () => {
  if (userSelected.value && resourceSelected.value) {
    try {
      const res: AxiosResponse = await axios.post(`invitations`, {
        receiver_id: userSelected.value.id,
        resource_id: resourceSelected.value.id
      });
      formStatus.value = {
        type: 'success',
        message: 'Invitation envoyée avec succès'
      };
      store.addInvitation(res.data.data)

    } catch (err) {
      console.error(err);
      formStatus.value = {
        type: 'error',
        message: 'Erreur lors de l’envoi de l’invitation'
      };
    }
  }
};
</script>

<template>
  <v-card
    :loading="isLoading"
    subtitle="Partager une nouvelle ressource à un utilisateur"
    title="Créer un nouvelle invitation"
  >
    <template #text>
      <v-form>
        <div class="d-flex flex-column ga-5">
          <div
            v-if="(!users.length || !filteredResources.length) && !isLoading"
            class="text-red"
          >
            ⚠️ Impossible de créer une invitation : aucun utilisateur ou ressource disponible.
          </div>
          <v-alert
            v-if="formStatus"
            :type="formStatus.type"
            class="mb-4"
            closable
            @update:model-value="formStatus = null"
          >
            {{ formStatus.message }}
          </v-alert>

          <v-autocomplete
            v-model="userSelected"
            :disabled="!users.length"
            :items="users"
            :loading="isLoading"
            item-title="name"
            label="Choisir un utilisateur"
            return-object
          />

          <v-autocomplete
            v-model="resourceSelected"
            :disabled="!filteredResources.length"
            :items="filteredResources"
            :loading="isLoading"
            item-title="name"
            label="Choisir une ressource"
            return-object
          />
          <v-btn
            :disabled="!userSelected?.id || !resourceSelected?.id"
            @click="submit"
          >
            Submit
          </v-btn>
        </div>
      </v-form>
    </template>
  </v-card>
</template>

<style lang="sass" scoped>

</style>
