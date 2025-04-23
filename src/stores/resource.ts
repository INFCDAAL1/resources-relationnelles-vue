// Utilities
import type { Resource } from "@/types";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import axios from '@/lib/axios';
import { useUserStore } from "@/stores/user";

export const useResourceStore = defineStore("resource", {
  state: () => ({
    resources: [] as Resource[],
    favorites: useStorage("favorites", [] as number[], localStorage),
  }),

  getters: {
    getAllResources: (state) => state.resources,
    getFavoriteResources: (state) =>
      state.resources.filter((resource) =>
        state.favorites.includes(resource.id)
      ),
    getPublishedResources: (state) =>
      state.resources.filter((resource) => resource.published),
    getUnpublishedResources: (state) =>
      state.resources.filter((resource) => !resource.published),
    getResourceById: (state) => {
      return (id: Resource["id"]): Resource | undefined =>
        state.resources.find((resource) => resource.id === Number(id));
    },
    getResourcesByCategory: (state) => {
      return (categoryId: number): Resource[] =>
        state.resources.filter(
          (resource) => resource.category.id === categoryId
        );
    },
    getResourcesByName: (state) => {
      return (name: string): Resource[] =>
        state.resources.filter((resource) =>
          resource.name.toLowerCase().includes(name.toLowerCase())
        );
    },
    getMyResources: (state) => {
      const userStore = useUserStore();
      if (userStore.user !== null)
        return  state.resources.filter((resource) => resource.user.id === userStore.user?.id);
      else return [];
    }
  },

  actions: {
    // Resource actions
    setResources(resources: Resource[]) {
      this.resources = resources;
    },

    addResource(resource: Resource) {
      this.resources.push(resource);
    },

    updateResource(id: Resource["id"], updatedResource: Partial<Resource>) {
      const index = this.resources.findIndex((resource) => resource.id === id);
      if (index !== -1) {
        this.resources[index] = {
          ...this.resources[index],
          ...updatedResource,
        };
      }
    },

    deleteResource(id: Resource["id"]) {
      this.resources = this.resources.filter((resource) => resource.id !== id);
    },

    toggleResourceFavorite(resourceId: number) {
      const index = this.favorites.indexOf(resourceId);
      //Call axios route favorite/resourceId with setTo boolean
      const setTo = index === -1 ? true : false;
      if (setTo) {
        this.favorites.push(resourceId);
      } else {
        this.favorites.splice(index, 1);
      }

      // Call axios route favorite/resourceId with setTo boolean
      axios.post(`favorite/${resourceId}`, { setTo: setTo })
        .then(() => {
          console.log("Favorite status updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating favorite status:", error);
        });
    },
  },
});
