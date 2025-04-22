<script setup lang="ts">
import type { User } from '@/types'

const props = defineProps<{
  user: User
}>()
</script>

<template>
  <v-card class="" elevation="4">
    <v-card-title class="text-h6">
      Profil de {{ user.name }}
    </v-card-title>

    <v-card-text>
      <v-list dense>
        <v-list-item>
          <v-list-item-title><strong>Nom :</strong> {{ user.name }}</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title><strong>Email :</strong> {{ user.email }}</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title><strong>Rôle :</strong> {{ user.role === 'admin' ? 'Administrateur' : 'Utilisateur' }}</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title><strong>Inscription :</strong> {{ new Date(user.created_at).toLocaleDateString() }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card-text>

    <v-card-actions>
      <v-chip color="primary" variant="elevated" label>
        {{ user.role }}
      </v-chip>
    </v-card-actions>
  </v-card>
</template>

<style scoped lang="sass">
</style>
