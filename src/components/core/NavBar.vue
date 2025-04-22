<script setup lang="ts">
const props = defineProps<{
  show:boolean
}>()

const drawer = ref(true)

onMounted(()=> {
  drawer.value = props.show
  watch(() => props.show, (val) => {
    drawer.value = val
  })
})

</script>

<template>
  <v-navigation-drawer v-model="drawer">

    <v-divider />
    <v-list density="compact">
      <v-list-item link title="Ressources" prepend-icon="mdi-package-variant" to="/resource/"/>
      <v-list-item link title="Messagerie" prepend-icon="mdi-message" />
      <v-list-item link title="Favoris" prepend-icon="mdi-star" to="/resource/favorite"/>
    </v-list>
    <template #append>
      <v-list-profile/>
      <AppFooter />
    </template>
  </v-navigation-drawer>
</template>

<style scoped lang="sass">

</style>
