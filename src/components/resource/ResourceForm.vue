<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue'
import type {Resource} from '@/types'
import axios from '@/lib/axios.ts'
import router from '@/router/index';

const props = defineProps<{
  modelValue?: Partial<Resource>
}>()

const emit = defineEmits<{
  (e: 'submit', resource: FormData): void
}>()

// Champs du formulaire
const formName = ref('')
const formDescription = ref('')
const formCategory = ref<string | number>('')
const formVisibility = ref<string | number>('')
const formPublished = ref(false)
const formFile = ref<File | null>(null)

const formLoading = ref(false)
const categories = ref<{ id: number; name: string }[]>([])
const visibilities = ref<{ id: number; name: string }[]>([])

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      formName.value = newVal.name || ''
      formDescription.value = newVal.description || ''
      formCategory.value = newVal.category?.id || ''
      formVisibility.value = newVal.visibility?.id || ''
      formPublished.value = newVal.published || false
    }
  },
  {immediate: true}
)

onMounted(async () => {
  try {
    const [categoryRes, visibilityRes] = await Promise.all([
      axios.get('/categories'),
      axios.get('/visibilities'),
    ])
    categories.value = categoryRes.data.data
    visibilities.value = visibilityRes.data.data
  } catch (err) {
    console.error('Error loading form dependencies:', err)
  }
})

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    formFile.value = target.files[0]
  }
}

const submitForm = async () => {
  formLoading.value = true;
  const formData = new FormData();
  formData.append('name', formName.value);
  formData.append('description', formDescription.value);
  formData.append('category_id', formCategory.value);
  formData.append('visibility_id', formVisibility.value);
  formData.append('published', formPublished.value ? '1' : '0');
  formData.append('file', formFile.value as Blob);

  axios.post('/resources', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(response => {
      formLoading.value = false;
      formName.value = '';
      formDescription.value = '';
      formCategory.value = '';
      formFile.value = null;
      formVisibility.value = '';
      formPublished.value = false;
      router.push({name: '/resource/'});
    })
    .catch(error => {
      console.error('Error creating resource:', error);
      formLoading.value = false;
    });
};
</script>

<template>
  <v-form class="d-flex flex-column ga-4" @submit.prevent="submitForm">
    <v-text-field v-model="formName" label="Nom" required/>
    <v-textarea v-model="formDescription" label="Description" required/>

    <v-select
      v-model="formCategory"
      :items="categories"
      item-title="name"
      item-value="id"
      label="Catégorie"
      required
    />

    <v-select
      v-model="formVisibility"
      :items="visibilities"
      item-title="name"
      item-value="id"
      label="Visibilité"
      required
    />

    <v-switch v-model="formPublished" label="Publié"/>

    <v-file-input
      accept=".pdf,.doc,.docx,.jpg,.png"
      label="Fichier à joindre"
      prepend-icon="mdi-paperclip"
      @change="handleFileChange"
    />

    <v-btn :loading="formLoading" color="primary" type="submit" @submit="submitForm">Soumettre</v-btn>
  </v-form>
</template>

<style lang="sass" scoped>
</style>
