<script lang="ts" setup>
//
import NavBar from '@/components/core/NavBar.vue';

const drawer = ref(false)
</script>

<template>
  <v-main>
    <!--    <h1>Default Layout</h1>-->
    <AppBar @toggle-drawer="drawer = !drawer"/>
    <NavBar :show="drawer"/>
    <div class="pl-15 pr-15 pt-5">
      <router-view/>
    </div>

  </v-main>
</template>
