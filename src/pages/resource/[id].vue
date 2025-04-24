<script lang="ts" setup>
import { definePage } from "unplugin-vue-router/runtime";
import { useResourceStore } from "@/stores/resource.ts";
import { useCommentStore } from "@/stores/comment.ts";
import type { Comment, Resource, RouteParams } from "@/types";
import axios from "@/lib/axios.ts";

definePage({
  meta: {
    layout: 'default',
    requiresAuth: true,
  },
})

const router = useRouter();
const route = useRoute();
const store = useResourceStore();
const storeComment = useCommentStore();
const item: Ref<Resource | undefined> = ref();
const comments: Ref<Comment[]> = ref([]);

onMounted(async () => {
  const { id } = route.params as RouteParams;
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
  return item.value?.download_url || '';
});

const downloadFile = async () => {
  if (getDownloadLink.value) {
    try {
      console.log("Downloading file from:", getDownloadLink.value);

      const response = await axios.get(getDownloadLink.value, {
        responseType: 'blob', // Important to handle the file correctly
      });

      const blob = new Blob([response.data], { type: 'application/octet-stream' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = (item.value?.name || 'downloaded_file') + ".pdf"; // Default filename if not defined
      link.style.display = 'none';

      document.body.appendChild(link);
      link.click();

      URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  } else {
    console.error("No download link available for this resource.");
  }
};

const addComment = (comment: Comment) => {
  if (item.value) {
    try {
      comments.value.push(comment); // Add the new comment to the local list
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }
};
</script>

<template>
  <div class="d-flex flex-column ga-5">
    <!-- Card for loading resource -->
    <v-card v-if="!item" title="Chargement de la ressource..."></v-card>

    <!-- Display resource details when available -->
    <v-card v-else>
      <ResourceCard :item="item" @toggle-favorite="store.toggleResourceFavorite">
        <template #action>
          <v-btn
            :disabled="!getDownloadLink"
            append-icon="mdi-arrow-down"
            variant="tonal"
            @click="downloadFile"
          >
            Télécharger
          </v-btn>
        </template>
      </ResourceCard>
    </v-card>

    <!-- Comment form to add a new comment -->
    <CommentForm v-if="item"  :item="item" @comment-added="addComment" />

    <!-- Display list of comments -->
    <v-card v-if="!comments.length" title="Aucun commentaire pour cette ressource."></v-card>
    <CommentList v-else :items="comments" no-filter />
  </div>
</template>

<style scoped lang="sass">
/* You can add your styles here if needed */
</style>
