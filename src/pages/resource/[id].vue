<script lang="ts" setup>

import {definePage} from "unplugin-vue-router/runtime";
import {useResourceStore} from "@/stores/resource.ts";
import type {Comment, Resource, RouteParams} from "@/types";
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

onMounted(async () => {
  const {id} = route.params as RouteParams;
  const resourceId = Number(id);
  item.value = store.getResourceById(resourceId);

  if (!item.value) {
    try {
      const res = await axios.get(`resources/${resourceId}`);
      item.value = res.data.data;
    } catch (err) {
      console.error(`Resource with id ${id} not found`, err);
      router.back();
      return;
    }
  }

  try {
    const res = await axios.get(`comments?resource_id=${resourceId}`);
    if (res.status === 200) {
      storeComment.setComments(res.data.data);
      comments.value = res.data.data;
    }
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
});

const getDownloadLink = computed(() => {
  if (item.value && item.value.download_url)
    return item.value.download_url
  else return ''
})

</script>

<template>
  <div class="d-flex flex-column ga-5">
    <v-card v-if="!item" title="Chargement de la ressource..."></v-card>
    <v-card v-else>
      <ResourceCard :item="item" @toggle-favorite="store.toggleResourceFavorite">
        <template #action>
          <v-btn
            :disabled="!getDownloadLink"
            :href="getDownloadLink"
            append-icon="mdi-arrow-down"
            variant="tonal"
          >
            Télécharger
          </v-btn>
        </template>
      </ResourceCard>
    </v-card>

    <v-card v-if="!comments.length" title="Aucun commentaire pour cette ressource."></v-card>
    <CommentList v-else :items="comments" no-filter/>
  </div>

</template>

<style lang="sass" scoped>

</style>
