<script lang="ts" setup>
import {ref} from 'vue';
import AppBar from '@/components/core/AppBar.vue';
import NavBar from '@/components/core/NavBar.vue';

// Importez le module pour activer les écouteurs de la zone de sécurité
import '@/lib/safeArea';

const drawer = ref(true);
</script>

<template>
  <!-- Appliquez le padding de la zone de sécurité directement sur v-main -->
  <v-main
    :style="{
      paddingTop: 'var(--safe-area-inset-top)',
      paddingLeft: 'var(--safe-area-inset-left)',
      paddingRight: 'var(--safe-area-inset-right)',
      paddingBottom: 'var(--safe-area-inset-bottom)',
    }"
  >
    <AppBar @toggle-drawer="drawer = !drawer"/>
    <NavBar :show="drawer"/>

    <!-- Ajoutez un conteneur interne pour votre padding personnalisé -->
    <div class="pa-4">
      <router-view/>
    </div>
  </v-main>
</template>
