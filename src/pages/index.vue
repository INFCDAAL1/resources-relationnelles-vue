<script lang="ts" setup>
//
import {definePage} from "unplugin-vue-router/runtime";

definePage({
  meta: {
    layout: 'default',
    requiresAuth: false,
  },
  redirect: () => {
    return {path: '/resource/'}
  },
})
</script>

<template>
  <v-card
    v-role="'admin'"
    title="Bonjour je suis la card Admin"
  />
  <v-card
    v-role="['user','admin']"
    title="Bonjour je suis la card User/Admin"
  />
  <v-card
    v-role="'user'"
    title="Bonjour je suis la card User"
  />
</template>
