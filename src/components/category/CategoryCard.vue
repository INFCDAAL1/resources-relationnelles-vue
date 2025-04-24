<script setup lang="ts">
import type {Category} from "@/types";

const props = defineProps<{
  item:Category
}>()

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};
</script>

<template>
<v-card :title="item.name" :subtitle="formatTime(item.created_at)" :to="'/category/edit/'+item.id"/>
</template>

<style scoped lang="sass">

</style>
