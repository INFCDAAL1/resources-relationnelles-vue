// Utilities
import {defineStore} from 'pinia'
import type {Resource} from '@/types';
import {useStorage} from "@vueuse/core";

export const useResourceStore = defineStore('resource', {
  state: () => ({
    resources: useStorage("resources", Array.from({length: 200}, (_, i) => ({
      id: i,
      name: "Resource " + i,
      description: "Description of resource " + i,
      category: "Resource",
      isValid: true,
      isPublished: true,
      isFavorite: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })) as Resource[], sessionStorage)
  }),

  getters: {
    getAllResources: (state) => state.resources,
    getFavoriteResources: (state) => state.resources.filter(resource => resource.isFavorite),
    getPublishedResources: (state) => state.resources.filter(resource => resource.isPublished),
    getUnpublishedResources: (state) => state.resources.filter(resource => !resource.isPublished),
    getResourceById: (state) => {
      return (id: Resource['id']): Resource | undefined => state.resources.find(resource => resource.id === Number(id));
    },
    getResourcesByCategory: (state) => {
      return (category: Resource['category']): Resource[] | undefined => state.resources.filter(resource => resource.category === category)
    },
    getResourcesByName: (state) => {
      return (name: Resource['name']): Resource[] | undefined => state.resources.filter(resource => resource.name === name)
    },
  },
  actions: {
    // Resource actions
    addResource(resource: Resource) {
      this.resources.push(resource)
    },
    updateResource(id: Resource['id'], updatedResource: Partial<Resource>) {
      const index = this.resources.findIndex(resource => resource.id === id)
      if (index !== -1) {
        this.resources[index] = {...this.resources[index], ...updatedResource}
      }
    },
    deleteResource(id: Resource['id']) {
      this.resources = this.resources.filter(resource => resource.id !== id)
    },
    toggleResourceFavorite(resourceFav: Resource) {
      const index = this.resources.findIndex(resource => resource.id === resourceFav.id)
      if (index !== -1) {
        this.resources[index].isFavorite = !this.resources[index].isFavorite
      }
    },
  }
})
