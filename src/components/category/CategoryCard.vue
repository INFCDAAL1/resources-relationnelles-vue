<script lang="ts" setup>
import type {Category} from "@/types";

const props = defineProps<{
  item: Category
}>()

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};
</script>

<template>
  <v-card :subtitle="formatTime(item.created_at)" :title="item.name" :to="'/category/edit/'+item.id"/>
</template>

<style lang="sass" scoped>

</style>
