// Utilities
import {defineStore} from 'pinia'
import {useStorage} from "@vueuse/core";
import type {GroupMessage,Message} from "@/types";

export const useMessageStore = defineStore('message', {
  state: () => ({
    messages: useStorage("messages", Array.from({length: 200}, (_, i) => ({
      id: i,
      name: "Message " + i,
      messages: Array.from({length: 5}, (_, i) => ({
        id: i,
        content: "Message " + i,
        read: Math.random() > 0.5,
        sender: {
          id: Math.floor(Math.random() * 100),
          name: "User " + Math.floor(Math.random() * 100),
        },
        receiver: {
          id: Math.floor(Math.random() * 100),
          name: "User " + Math.floor(Math.random() * 100),
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      })) as Message[],
      createdAt: new Date(),
      updatedAt: new Date(),
    })) as GroupMessage[], sessionStorage),
  }),
  getters:{
    getAllMessages: (state): GroupMessage[] => state.messages|| [],
    getGroupMessagesById: (state) => {
      return (messageId: GroupMessage['id']): GroupMessage | undefined => state.messages.find(message => message.id === messageId)
    }
  }
})
