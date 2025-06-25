// Utilities
import {defineStore} from 'pinia'
import type {Comment, User} from '@/types';
import {useStorage} from "@vueuse/core";

export const useCommentStore = defineStore('comment', {
  state: () => ({
    comments: useStorage("comments", [] as Comment[], sessionStorage),
  }),

  getters: {
    getAllComments: (state): Comment[] | undefined => state.comments,
    getCommentsByUserId: (state) => {
      return (userId: User['id']): Comment[] | undefined => state.comments.filter(comment => comment.user.id === userId)
    },
    getApprovedCommentsByResourceId: (state) => {
      return (resource_id: Comment['resource_id']): Comment[] | undefined => state.comments.filter(comment => comment.resource_id === resource_id && comment.status === 'approved')
    },
    getPendingCommentsByResourceId: (state) => {
      return (resource_id: Comment['resource_id']): Comment[] | undefined => state.comments.filter(comment => comment.resource_id === resource_id && comment.status === 'pending')
    },
    getRejectedCommentsByResourceId: (state) => {
      return (resource_id: Comment['resource_id']): Comment[] | undefined => state.comments.filter(comment => comment.resource_id === resource_id && comment.status === 'rejected')
    },
  },

  actions: {
    addComment(comment: Comment) {
      this.comments.push(comment)
    },
    updateComment(commentId: Comment['id'], updatedComment: Partial<Comment>) {
      const index = this.comments.findIndex(comment => comment.id === commentId)
      if (index !== -1) {
        this.comments[index] = {...this.comments[index], ...updatedComment}
      }
    },
    deleteComment(commentId: Comment['id']) {
      this.comments = this.comments.filter(comment => comment.id !== commentId)
    },
    deleteCommentByResourceId(resource_id: Comment['id']) {
      this.comments = this.comments.filter(comment => comment.resource_id !== resource_id)
    },
    setComments(state: Comment[]) {
      this.comments = state
    }
  }
})
