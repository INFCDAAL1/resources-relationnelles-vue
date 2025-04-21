<script lang="ts" setup>
//
  const { data, error, loading } = useFetch('https://jsonplaceholder.typicode.com/todos');
</script>

<template>
  <v-card v-role="'admin'" title="Bonjour je suis la card Admin" />
  <v-card v-role="['user','admin']" title="Bonjour je suis la card User/Admin" />
  <v-card v-role="'user'" title="Bonjour je suis la card User" />
  <div>
    <div v-if="loading">Chargement...</div>
    <div v-else-if="error">Erreur : {{ error.message }}</div>
    <div v-else>
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: default
  requiresAuth : false
</route>
