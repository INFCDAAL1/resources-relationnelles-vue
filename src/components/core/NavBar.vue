<script setup lang="ts">
const props = defineProps<{
  show:boolean
}>()
</script>

<template>
  <v-navigation-drawer v-model="props.show">

    <v-divider />
    <v-list density="compact">
      <v-list-item link title="List Item 1" />
      <v-list-item link title="List Item 2" />
      <v-list-item link title="List Item 3" />
    </v-list>
    <template #append>
      <v-list-profile/>
      <AppFooter />
    </template>
  </v-navigation-drawer>
</template>

<style scoped lang="sass">

</style>
