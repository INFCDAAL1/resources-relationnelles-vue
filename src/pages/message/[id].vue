<script setup lang="ts">
import { useUserStore } from "@/stores/user.ts";
import type { GroupMessage, RouteParams, Message } from "@/types";

const route = useRoute();
const store = useUserStore();

const messages = ref<Message[]>([]);
const newMessage = ref<string>("");

onMounted(() => {
  const { id } = route.params as RouteParams;
  console.log(`Fetching conversation with id ${id}`);
  // Simuler la récupération des messages
  // Remplacez ceci par votre logique de récupération des messages
  messages.value = [
    {
      id: 1,
      content: "Bonjour !",
      read: true,
      sender: { id: 1, name: "Alice" },
      receiver: { id: 2, name: "Bob" },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      content: "Salut ! Comment ça va ?",
      read: false,
      sender: { id: 2, name: "Bob" },
      receiver: { id: 1, name: "Alice" },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
});

const sendMessage = () => {
  if (newMessage.value.trim() !== "") {
    const message: Message = {
      id: messages.value.length + 1,
      content: newMessage.value,
      read: false,
      sender: { id: store.user.id, name: store.user.name },
      receiver: { id: 2, name: "Bob" }, // Remplacez par l'ID du destinataire
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    messages.value.push(message);
    newMessage.value = ""; // Réinitialiser le champ de saisie
  }
};
</script>

<template>
  <v-container>
    <v-card flat>
      <v-card-title>
        <span>Chat avec {{ messages[0]?.receiver.name }}</span>
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item-group>
            <v-list-item v-for="message in messages" :key="message.id">
              <v-list-item-content>
                <v-list-item-title>
                  <div class="text-wrap">
                    <strong>{{ message.sender.name }}:</strong> {{ message.content }}
                  </div>
                </v-list-item-title>
                <v-list-item-subtitle>{{ message.createdAt.toLocaleString() }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-text-field
          v-model="newMessage"
          label="Écrire un message..."
          @keyup.enter="sendMessage"
        />
        <v-btn @click="sendMessage">Envoyer</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped lang="sass">
/* Ajoutez vos styles ici */
</style>
