<script lang="ts" setup>
import {ref, watch} from 'vue';
import type {Category} from "@/types";

const props = defineProps<{
  item: Category;
}>();

const emit = defineEmits<{
  (e: 'submit', item: Category): void;
}>();

const itemUpdate = ref<string>(props.item.name);

// Mettre à jour le champ si la prop change
watch(() => props.item, (newValue) => {
  itemUpdate.value = newValue.name;
}, {immediate: true});

const onSubmit = () => {
  emit('submit', {
    ...props.item,
    name: itemUpdate.value
  });
};
</script>

<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field
      v-model="itemUpdate"
      label="Nom de la catégorie"
      required
    />
    <v-btn
      color="primary"
      type="submit"
    >
      Enregistrer
    </v-btn>
  </v-form>
</template>

<style lang="sass" scoped>
</style>
