<script lang="ts" setup>

import {definePage} from "unplugin-vue-router/runtime";
import {useResourceStore} from "@/stores/resource.ts";
import type {Resource,Comment,RouteParams} from "@/types";
import {useCommentStore} from "@/stores/comment.ts";
import axios from "@/lib/axios.ts";

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

  if(comments.value){
    axios.get(`comments?resource_id=${item.value.id}`).then((res) => {
      if (res.status === 200) {
        storeComment.setComments(res.data.data)
        comments.value = res.data.data
      }
    }).catch((error) => {
      console.error('Error fetching comments:', error);
    })
  }
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
