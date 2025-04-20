<script lang="ts" setup>
//
const { data, error, loading } = useFetch("https://jsonplaceholder.typicode.com/todos");
</script>

<template>
  <v-card title="Bonjour je suis la card Admin" v-role="'admin'"/>
  <v-card title="Bonjour je suis la card User/Admin" v-role="['user','admin']"/>
  <v-card title="Bonjour je suis la card User" v-role="'user'"/>
  <div>
    <div v-if="loading">Chargement...</div>
    <div v-else-if="error">Erreur : {{ error.message }}</div>
    <div v-else>
      <pre>{{ data }}</pre>
    </div>
  </div>
  <HelloWorld />
</template>

