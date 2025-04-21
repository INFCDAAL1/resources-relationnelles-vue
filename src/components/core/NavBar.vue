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
