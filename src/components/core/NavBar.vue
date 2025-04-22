<script lang="ts" setup>
const props = defineProps<{
  show: boolean
}>()
watch(() => props.show, (val) => {
  drawer.value = val
})
const drawer = ref(true)

onMounted(() => {
  drawer.value = props.show
})

</script>

<template>
  <v-navigation-drawer v-model="drawer" permanent>

    <v-divider/>
    <v-list density="compact">
      <v-list-item link prepend-icon="mdi-package-variant" title="Ressources" to="/resource/"/>
      <v-list-item link prepend-icon="mdi-message" title="Messagerie" to="/message/"/>
      <v-list-item link prepend-icon="mdi-star" title="Favoris" to="/resource/favorite"/>
    </v-list>
    <template #append>
      <v-list-profile/>
      <AppFooter/>
    </template>
  </v-navigation-drawer>
</template>

<style lang="sass" scoped>

</style>
