<script lang="ts" setup>
import type {User} from '@/types'

const props = defineProps<{
  user: User
}>()

const getRoleColor = (role: User['role']) => {
  switch (role) {
    case 'admin':
      return 'red'
    case 'moderator':
      return 'blue'
    case 'superadmin':
      return 'purple'
    default:
      return 'green'
  }
}

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <v-card width="800" elevation="3" :title="user.name" :subtitle="user.email" prepend-icon="mdi-account">
    <v-card-text>
      <div class="d-flex flex-column ga-5">
        <div>
          Rôle : <v-chip :color="getRoleColor(user.role)" text-color="white">
          {{ user.role }}
        </v-chip>
        </div>
        <div>
          <v-btn
            v-role="['admin', 'user','moderator','superadmin']"
            :to="'/profile/edit/'+user.id"
            prepend-icon="mdi-pencil"
            variant="tonal"
            size="small"
          >
            Modifier
          </v-btn>
        </div>



      <div class="d-flex mb-4">
        <p class="text-grey-lighten-2">Mise à jour le : {{ formatDate(user.updated_at) }}</p>
        <v-spacer></v-spacer>
        <p class="text-grey-lighten-2">Créé le : {{ formatDate(user.created_at) }}</p>
      </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style lang="sass" scoped>
</style>
