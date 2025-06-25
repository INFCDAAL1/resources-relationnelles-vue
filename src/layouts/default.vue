<script lang="ts" setup>
import { ref } from 'vue';
import AppBar from '@/components/core/AppBar.vue';
import NavBar from '@/components/core/NavBar.vue';

// Importez le module pour activer les écouteurs de la zone de sécurité
import '@/lib/safeArea';

const drawer = ref(true);
</script>

<template>
  <!-- Ces composants seront rendus à l'intérieur de v-app dans App.vue -->
  <AppBar @toggle-drawer="drawer = !drawer" />
  <NavBar v-model:show="drawer" />

  <!-- v-main gère automatiquement l'espacement par rapport à l'AppBar et la NavBar -->
  <v-main>
    <!-- Le padding de la zone de sécurité est appliqué ici pour le contenu -->
    <div
      class="pa-4 h-100"
      :style="{
        paddingTop: 'var(--safe-area-inset-top)',
        paddingLeft: 'var(--safe-area-inset-left)',
        paddingRight: 'var(--safe-area-inset-right)',
        paddingBottom: 'var(--safe-area-inset-bottom)',
      }"
    >
      <router-view />
    </div>
  </v-main>
</template>
