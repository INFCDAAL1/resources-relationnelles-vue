import axios from "@/lib/axios";
import type { Conversation, ConversationsResponse, Message } from "@/types";
import { defineStore } from "pinia";

export const useMessageStore = defineStore("message", {
  state: () => ({
    messages: [] as Message[],
    conversations: [] as Conversation[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    getAllMessages: (state) => state.conversations,
    getMessagesByUserId: (state) => (userId: number) => state.messages,
  },

  actions: {
    // Fetch all conversations
    async fetchConversations() {
      this.loading = true;
      try {
        const response = await axios.get<ConversationsResponse>(
          "/messages/conversations"
        );
        this.conversations = response.data.conversations;
        return this.conversations;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch conversations";
        console.error("Error fetching conversations:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Fetch messages for a specific user
    async fetchMessagesByUserId(userId: number) {
      this.loading = true;
      try {
        const response = await axios.get(`/messages?user_id=${userId}`);
        this.messages = response.data.data;
        return this.messages;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch messages";
        console.error("Error fetching messages:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Send a message
    async sendMessage(receiverId: number, content: string) {
      try {
        const response = await axios.post("/messages", {
          receiver_id: receiverId,
          content,
        });

        const newMessage = response.data;
        this.messages.push(newMessage);
        return newMessage;
      } catch (error: any) {
        console.error("Error sending message:", error);
        throw error;
      }
    },

    // Mark message as read
    async markAsRead(messageId: number) {
      try {
        await axios.put(`/messages/${messageId}`, {
          read: true,
        });

        const index = this.messages.findIndex(
          (message) => message.id === messageId
        );
        if (index !== -1) {
          this.messages[index].read = true;
        }
      } catch (error: any) {
        console.error("Error marking message as read:", error);
        throw error;
      }
    },

    // Mark all messages from user as read
    async markAllAsRead(senderId: number) {
      try {
        await axios.post("/messages/read-all", {
          sender_id: senderId,
        });

        // Update messages in store
        this.messages.forEach((message) => {
          if (message.sender.id === senderId && !message.read) {
            message.read = true;
          }
        });
      } catch (error: any) {
        console.error("Error marking messages as read:", error);
        throw error;
      }
    },
  },
});
