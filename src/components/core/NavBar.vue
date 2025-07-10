<script lang="ts" setup>
import { useDisplay } from 'vuetify';

const props = defineProps<{
  show: boolean
}>();

const { mdAndUp } = useDisplay();

const drawer = ref(props.show);

watch(() => props.show, val => {
  drawer.value = val;
});

// Le tiroir est permanent sur les écrans larges, sinon il est contrôlé par la prop `show`
const isPermanent = computed(() => mdAndUp.value);
const model = computed({
  get: () => isPermanent.value || drawer.value,
  set: val => drawer.value = val
});
</script>

<template>
  <v-navigation-drawer
    v-model="model"
    :permanent="isPermanent"
    :temporary="!isPermanent"
  >
    <v-divider />
    <v-list density="compact">
      <v-list-item
        link
        prepend-icon="mdi-package-variant"
        title="Ressources"
        to="/resource/"
      />
      <v-list-item
        link
        prepend-icon="mdi-message"
        title="Messagerie"
        to="/message/"
      />
      <v-list-item
        v-role="['admin', 'superadmin','modo', 'user']"
        link
        prepend-icon="mdi-email-plus"
        title="Invitation"
        to="/invitation/"
      />
      <v-list-item
        v-role="['admin', 'superadmin','modo', 'user']"
        link
        prepend-icon="mdi-star"
        title="Favoris"
        to="/resource/favorite"
      />
      <v-list-item
        v-role="['admin', 'superadmin','modo']"
        link
        prepend-icon="mdi-chart-bar"
        title="Statistique"
        to="/stats"
      />
      <v-list-item
        link
        prepend-icon="mdi-lock"
        title="Confidentialité"
        to="/privacy"
      />
    </v-list>
    <template #append>
      <v-list-item
        v-role="['admin', 'superadmin']"
        link
        prepend-icon="mdi-shape-plus"
        title="Gestion des catégories"
        to="/category/"
      />
      <v-list-item
        v-role="['admin', 'superadmin']"
        link
        prepend-icon="mdi-account-group"
        title="Gestion utilisateurs"
        to="/profile/"
      />
      <v-list-profile />
      <AppFooter />
    </template>
  </v-navigation-drawer>
</template>

<style lang="sass" scoped>

</style>
