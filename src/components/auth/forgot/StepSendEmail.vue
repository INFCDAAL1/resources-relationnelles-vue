<script lang="ts" setup>
const props = defineProps<{
  email: string
  valide: boolean
}>()
const send = ref(false)
</script>

<template>
  <v-card
    flat
    subtitle="Confirmez l'envoi de l'email de réinitialisation de mot de passe"
    title="Envoie de l'email"
  >
    <template #text>
      <div
        v-if="!send"
        class="d-flex flex-column ga-5"
      >
        <p>
          Un email de réinitialisation de mot de passe va être envoyé à l'adresse suivante : <strong>{{
            props.email
          }}</strong>
        </p>
        <v-btn
          :disabled="!props.valide"
          variant="tonal"
          @click.prevent="send=true"
        >
          Envoie du mail de réinitialisation
        </v-btn>
        <span
          v-if="!props.valide"
          class="text-red"
        >L'email n'est pas valide</span>
        <p>Si vous ne recevez pas l'email, vérifiez votre dossier de spam ou essayez avec une autre adresse email.</p>
      </div>
      <div v-else>
        <p>
          Un email de réinitialisation de mot de passe a été envoyé à l'adresse suivante : <strong>{{
            props.email
          }}</strong>
        </p>
      </div>
    </template>
  </v-card>
</template>

<style lang="sass" scoped>

</style>
