<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from "@/lib/axios.ts"
import type { ActivityStats, EngagementStats, GeneralStats, ResourcesStats } from "@/types"

const generalStats = ref<GeneralStats | null>(null)
const resourcesStats = ref<ResourcesStats>({
  total: 0,
  published: 0,
  validated: 0,
  by_category: [],
  recent_activity: [],
})
const engagementStats = ref<EngagementStats>({
  favorites_count: 0,
  saved_count: 0,
  exploited_count: 0,
  comments_count: 0,
  invitations_count: 0,
  invitations_by_status: [],
  top_resources: [],
})
const activityStats = ref<ActivityStats>({
  new_users_last_month: 0,
  resources_added_last_month: 0,
  messages_sent_last_month: 0,
  recent_comments: [],
  most_active_users: [],
})

const categoryHeaders = [
  { text: 'Catégorie', value: 'name' },
  { text: 'Nombre', value: 'count' },
]

const recentResourcesHeaders = [
  { text: 'Nom', value: 'name' },
  { text: 'Créé le', value: 'created_at' },
]

const statusHeaders = [
  { text: 'Statut', value: 'status' },
  { text: 'Nombre', value: 'count' },
]

const commentHeaders = [
  { text: 'Commentaire', value: 'content' },
  { text: 'Utilisateur', value: 'user' },
  { text: 'Ressource', value: 'resource' },
  { text: 'Date', value: 'date' },
]

const userHeaders = [
  { text: 'Nom', value: 'name' },
  { text: 'Email', value: 'email' },
  { text: 'Rôle', value: 'role' },
  { text: 'Ressources', value: 'resources_count' },
  { text: 'Commentaires', value: 'comments_count' },
]

const error = ref<string | null>(null)
const loading = ref<boolean>(true)

onMounted(async () => {
  try {
    const [generalRes, resourcesRes, engagementRes, activityRes] = await Promise.all([
      axios.get<GeneralStats>('stats/general'),
      axios.get<ResourcesStats>('stats/resources'),
      axios.get<EngagementStats>('stats/engagement'),
      axios.get<ActivityStats>('stats/activity')
    ])

    generalStats.value = generalRes.data
    resourcesStats.value = resourcesRes.data
    engagementStats.value = engagementRes.data
    activityStats.value = activityRes.data
  } catch (err) {
    error.value = "Erreur lors du chargement des statistiques. Veuillez réessayer plus tard."
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <v-container>
    <v-alert
      v-if="error"
      class="mb-4"
      dismissible
      type="error"
    >
      {{ error }}
    </v-alert>

    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
      class="d-flex justify-center my-10"
      size="50"
    />

    <template v-else>
      <v-row>
        <v-col cols="12" v-if="generalStats">
          <h1 class="text-h4 mb-4">Statistiques Générales</h1>
          <v-row dense>
            <v-col cols="12" md="4" sm="6">
              <v-card title="Nombre d'utilisateurs" :text="generalStats.users_count.toString()" />
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-card title="Nombre de catégories" :text="generalStats.categories_count.toString()" />
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-card title="Nombre de commentaires" :text="generalStats.comments_count.toString()" />
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-card title="Nombre de messages" :text="generalStats.messages_count.toString()" />
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-card title="Nombre de ressources" :text="generalStats.resources_count.toString()" />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12">
          <h2 class="text-h5 mt-8 mb-4">Statistiques Ressources</h2>
          <v-card class="mb-4" outlined>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="4">Total : <strong>{{ resourcesStats.total }}</strong></v-col>
                <v-col cols="12" sm="4">Publiées : <strong>{{ resourcesStats.published }}</strong></v-col>
                <v-col cols="12" sm="4">Validées : <strong>{{ resourcesStats.validated }}</strong></v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <v-card class="mb-4" outlined>
            <v-card-title>Par Catégorie</v-card-title>
            <v-data-table :headers="categoryHeaders" :items="resourcesStats.by_category" hide-default-footer />
          </v-card>

          <v-card outlined>
            <v-card-title>Activité récente</v-card-title>
            <v-data-table :headers="recentResourcesHeaders" :items="resourcesStats.recent_activity" hide-default-footer />
          </v-card>
        </v-col>

        <v-col cols="12">
          <h2 class="text-h5 mt-8 mb-4">Engagement</h2>
          <v-row dense>
            <v-col cols="12" md="4" sm="6">
              <v-card title="Favoris" :text="engagementStats.favorites_count" />
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-card title="Sauvegardés" :text="engagementStats.saved_count" />
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-card title="Exploités" :text="engagementStats.exploited_count" />
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-card title="Commentaires" :text="engagementStats.comments_count" />
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-card title="Invitations" :text="engagementStats.invitations_count" />
            </v-col>
          </v-row>

          <v-card title="Invitations par statut" class="mt-5">
            <template #text>
              <v-data-table :headers="statusHeaders" :items="engagementStats.invitations_by_status" hide-default-footer />
            </template>
          </v-card>
        </v-col>

        <v-col cols="12">
          <h2 class="text-h5 mt-8 mb-4">Activité</h2>
          <v-card class="mb-4" outlined>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="4">Nouveaux utilisateurs : <strong>{{ activityStats.new_users_last_month }}</strong></v-col>
                <v-col cols="12" sm="4">Ressources ajoutées : <strong>{{ activityStats.resources_added_last_month }}</strong></v-col>
                <v-col cols="12" sm="4">Messages envoyés : <strong>{{ activityStats.messages_sent_last_month }}</strong></v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <v-card class="mb-4" outlined>
            <v-card-title>Commentaires récents</v-card-title>
            <v-data-table :headers="commentHeaders" :items="activityStats.recent_comments" hide-default-footer />
          </v-card>

          <v-card outlined>
            <v-card-title>Utilisateurs les plus actifs</v-card-title>
            <v-data-table :headers="userHeaders" :items="activityStats.most_active_users" hide-default-footer />
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>
