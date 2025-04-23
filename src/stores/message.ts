import axios from "@/lib/axios";
import type {Conversation, ConversationsResponse, Message, User,} from "@/types";
import {defineStore} from "pinia";

interface UserListResponse {
  users: User[];
}

export const useMessageStore = defineStore("message", {
  state: () => ({
    messages: [] as Message[],
    conversations: [] as Conversation[],
    availableUsers: [] as User[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    getAllMessages: (state) => state.messages,
    getMessagesByUserId: (state) => (userId: number) => state.messages,
    getUsersNotInConversation: (state) => {
      const existingUserIds = state.conversations.map((conv) => conv.user.id);
      return state.availableUsers.filter(
        (user) => !existingUserIds.includes(user.id)
      );
    },
  },

  actions: {
    // Fetch all conversations
    async fetchConversations() {
      this.loading = true;
      try {
        // Use the correct endpoint for conversations
        const response = await axios.get<ConversationsResponse>("/messages");
        this.conversations = response.data.conversations || [];
        return this.conversations;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch conversations";
        console.error("Error fetching conversations:", error);
        this.conversations = []; // Make sure it's an array even on error
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Fetch messages for a specific user
    async fetchMessagesByUserId(userId: number) {
      this.loading = true;
      try {
        const response = await axios.get(`/messages`, {
          params: {user_id: userId},
        });
        this.messages = response.data.data || [];
        return this.messages;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch messages";
        console.error("Error fetching messages:", error);
        this.messages = []; // Make sure it's an array even on error
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchAvailableUsers() {
      try {
        const response = await axios.get<UserListResponse>("/users/list");
        this.availableUsers = response.data.users || [];
        return this.availableUsers;
      } catch (error: any) {
        console.error("Error fetching available users:", error);
        this.availableUsers = []; // Make sure it's an array even on error
        throw error;
      }
    },

    // Start a new conversation with a user
    async startConversation(userId: number, initialMessage: string) {
      try {
        // First send a message to create the conversation
        const message = await this.sendMessage(userId, initialMessage);

        // Then fetch the updated conversations list which should include the new one
        await this.fetchConversations();

        return userId;
      } catch (error: any) {
        console.error("Error starting conversation:", error);
        throw error;
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
        // Use the correct endpoint for marking all messages as read
        await axios.post("/messages/mark-all-read", {
          sender_id: senderId,
        });

        // Update messages in store
        this.messages.forEach((message) => {
          if (message.sender.id === senderId && !message.read) {
            message.read = true;
          }
        });

        // Update unread count in conversations
        const conversationIndex = this.conversations.findIndex(
          (c) => c.user.id === senderId
        );
        if (conversationIndex !== -1) {
          this.conversations[conversationIndex].unread_count = 0;
        }
      } catch (error: any) {
        console.error("Error marking messages as read:", error);
        throw error;
      }
    },

    // Delete a message
    async deleteMessage(messageId: number) {
      try {
        await axios.delete(`/messages/${messageId}`);

        // Remove from local state
        this.messages = this.messages.filter((msg) => msg.id !== messageId);
      } catch (error: any) {
        console.error("Error deleting message:", error);
        throw error;
      }
    },
  },
});
