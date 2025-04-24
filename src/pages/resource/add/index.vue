<script lang="ts" setup>
import {definePage} from "unplugin-vue-router/runtime";
import {useResourceStore} from "@/stores/resource.ts";
import type {Resource} from "@/types";
import axios from "@/lib/axios.ts";
import ResourceForm from "@/components/resource/ResourceForm.vue";

definePage({
  meta: {
    layout: 'default',
    requiresAuth: true,
  },
});

const item: Ref<Resource | undefined> = ref();
</script>

<template>
  <div>
    <h1 class="text-h5 mb-4">Ajout d'une ressource</h1>
    <ResourceForm :model-value="item"/>
  </div>
</template>

<style lang="sass" scoped>

</style>
