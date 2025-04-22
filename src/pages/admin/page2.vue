<script lang="ts" setup>
import {definePage} from "unplugin-vue-router/runtime";

definePage({
  meta: {
    layout: 'default',
    requiresAuth: true,
    isAdmin: true,
  },
})
</script>

<template>
  <h1>La page admin 2</h1>
</template>

<style lang="sass" scoped>

</style>
<route lang="yaml">
meta:
layout: default
requiresAuth : true
isAdmin: true
</route>
