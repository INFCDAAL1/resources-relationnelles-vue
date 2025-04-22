<script lang="ts" setup>
//
import {definePage} from "unplugin-vue-router/runtime";

const {data, error, loading} = useFetch('https://jsonplaceholder.typicode.com/todos');
definePage({
  meta: {
    layout: 'default',
    requiresAuth: false,
  },
})

</script>

<template>
  <v-card v-role="'admin'" title="Bonjour je suis la card Admin"/>
  <v-card v-role="['user','admin']" title="Bonjour je suis la card User/Admin"/>
  <v-card v-role="'user'" title="Bonjour je suis la card User"/>
  <div>
    <div v-if="loading">Chargement...</div>
    <div v-else-if="error">Erreur : {{ error.message }}</div>
    <div v-else>
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>
