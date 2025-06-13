<script lang="ts" setup>
const isDev = import.meta.env.DEV;
</script>

<template>
  <v-footer
    height="30"
  >
    <div
      class="text-caption text-disabled"
    >
      &copy; 2024-{{ (new Date()).getFullYear() }} <span class="d-none d-sm-inline-block">CESI</span>
      <span v-if="isDev"> - DEV</span>
    </div>
  </v-footer>
</template>


<style scoped>

</style>
