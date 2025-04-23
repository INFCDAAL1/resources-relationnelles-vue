// Utilities
import {defineStore} from 'pinia'
import type {FilterInvitation, Invitation} from '@/types';
import {useStorage} from "@vueuse/core";

export const useInvitationStore = defineStore('invitation', {
  state: () => ({
    invitations: useStorage("invitations", [] as Invitation[], sessionStorage),
  }),

  getters: {
    getAllInvitations: (state): Invitation[] => state.invitations || [],
    getInvitationsByStatus: (state) => (status: FilterInvitation): Invitation[] => {
      return state.invitations.filter(invitation => invitation.status === status)
    }
  },

  actions: {
    addInvitation(invitation: Invitation) {
      this.invitations.push(invitation)
    },
    updateInvitation(updatedInvitation: Partial<Invitation>) {
      const index = this.invitations.findIndex(invitation => invitation.id === updatedInvitation.id)
      if (index !== -1) {
        this.invitations[index] = {...this.invitations[index], ...updatedInvitation}
      }
    },
    deleteInvitation(invitationId: Invitation['id']) {
      this.invitations = this.invitations.filter(invitation => invitation.id !== invitationId)
    },
    deleteInvitationByResourceId(resourceId: Invitation['id']) {
      this.invitations = this.invitations.filter(invitation => invitation.resource.id !== resourceId)
    },
    setInvitations(state: Invitation[]) {
      this.invitations = state
    }
  }
})
