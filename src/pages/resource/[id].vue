<script lang="ts" setup>

import {definePage} from "unplugin-vue-router/runtime";
import {useResourceStore} from "@/stores/resource.ts";
import type {Resource,Comment,RouteParams} from "@/types";
import {useCommentStore} from "@/stores/comment.ts";

definePage({
  meta: {
    layout: 'default',
    requiresAuth: true,
  },
})
const router = useRouter();
const route = useRoute();
const store = useResourceStore()
const storeComment = useCommentStore()
const item: Ref<Resource | undefined> = ref();
const comments: Ref<Comment[]> = ref([]);

onMounted(() => {
  const { id } = route.params as RouteParams
  item.value = store.getResourceById(Number(id))
  comments.value = storeComment.getApprovedCommentsByResourceId(Number(id)) || []
  if (!item.value) {
    console.error(`Resource with id ${id} not found`);
    router.back()
    return;
  }

  storeComment.addComment({
    content: "C'est un super article !",
    user: {
      id: 1,
      name: "John Doe",
    },
    resourceId: Number(id),
    status: "approved",
    createdAt: new Date(),
    updatedAt: new Date(),
    id: 9999,
  })

  // Fetch the resource details using the id
  // For example, you can use a fetch or axios call to get the data
  // Example: fetch(`https://api.example.com/resource/${id}`)
})

</script>

<template>
  <div class="d-flex flex-column ga-5">
    <v-card v-if="!item" title="Resource loading..."></v-card>
    <div v-else>
      <ResourceCard :item="item" @toggle-favorite="store.toggleResourceFavorite">
        <template #action>
          <v-btn variant="tonal" append-icon="mdi-arrow-down">Télécharger</v-btn>
        </template>
      </ResourceCard>
    </div>
    <v-card v-if="!comments" title="Comments loading..."></v-card>
    <div v-else>
      <CommentList :items="comments" no-filter/>
    </div>
  </div>

</template>

<style lang="sass" scoped>

</style>
