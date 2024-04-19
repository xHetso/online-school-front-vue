<template>
    <div class="p-4">
      <form @submit.prevent="submitEdit(props.authorId)" class="space-y-4 text-black bg-purple-100 p-4 rounded-lg">
        <div>
          <label for="name" class="block text-sm font-medium text-purple-700">Имя:</label>
          <input v-model="editableAuthor.name" type="text" id="name" class="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50">
        </div>
        <div>
          <label for="slug" class="block text-sm font-medium text-purple-700">Slug:</label>
          <input v-model="editableAuthor.slug" type="text" id="slug" class="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50">
        </div>
        <div>
          <label for="file" class="block text-sm font-medium text-purple-700">Загрузить фото:</label>
          <input type="file" id="file" @change="uploadFile" class="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50">
        </div>
        <button type="submit" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">Сохранить изменения</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, defineProps, defineEmits } from 'vue';
  import api from './../../api/api'; // Make sure this path matches your setup
  
  const props = defineProps({
    authorId: String
  });
  
  const editableAuthor = ref({
    name: '',
    slug: '',
    photo: null
  });
  
  watch(() => props.authorId, async (newId) => {
    if (newId) {
      await fetchAuthor(newId);
    }
  }, { immediate: true });
  
  async function fetchAuthor(id) {
    try {
      const response = await api.get(`/authors/${id}`);
      editableAuthor.value = response.data;
    } catch (error) {
      console.error(`Failed to fetch author ${id}:`, error);
    }
  }
  
  const emit = defineEmits(['updated']);
  
  async function submitEdit(id) {
    if (!id) {
      console.error('No ID provided for submitEdit');
      return;
    }
    try {
      await api.put(`/authors/${id}`, editableAuthor.value);
      emit('updated');
    } catch (error) {
      console.error('Failed to edit author:', error);
    }
  }
  
  async function uploadFile(event) {
    const file = event.target.files[0];
    if (!file) {
      console.error('No file selected');
      return;
    }
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:4200/api/files?folder=authors', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        if (data.length > 0 && data[0].url) {
          // Replace the entire object to ensure reactivity
          editableAuthor.value = {
            ...editableAuthor.value,
            photo: data[0].url // Update the poster URL
          };
          console.log(editableAuthor.value.photo); // Check the updated value
        }
      } else {
        throw new Error('Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
  </script>
  
  <style scoped>
  input[type="file"] {
    background: white;
  }
  </style>
  