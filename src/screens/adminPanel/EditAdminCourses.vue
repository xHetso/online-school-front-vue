<template>
    <div class="p-4">
      <!-- Убедитесь, что используется props.intensiveId для вызова функции submitEdit -->
      <form @submit.prevent="submitEdit(props.intensiveId)" class="space-y-4 text-black bg-purple-100 p-4 rounded-lg">
        <div>
          <label for="name" class="block text-sm font-medium text-purple-700">Название:</label>
          <input v-model="editableIntensive.name" type="text" id="name" class="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50">
        </div>
        <div>
          <label for="description" class="block text-sm font-medium text-purple-700">Описание:</label>
          <textarea v-model="editableIntensive.description" id="description" class="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"></textarea>
        </div>
        <div>
            <label for="slug" class="block text-sm font-medium text-purple-700">Slug:</label>
            <input v-model="editableIntensive.slug" type="text" id="slug" class="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50">
        </div>
        <div>
          <label for="poster" class="block text-sm font-medium text-purple-700">Постер:</label>
          <input v-model="editableIntensive.poster" type="text" id="poster" class="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50">
        </div>
        <button type="submit" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">Сохранить изменения</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue'
  import api from './../../api/api'
  
  const props = defineProps({
    intensiveId: String
  });
  
  const editableIntensive = ref({});
  
  // Подписываемся на изменения ID, чтобы получать актуальные данные интенсива
  watch(() => props.intensiveId, async (newId) => {
    if (newId) {
      await fetchIntensive(newId);
    }
  }, { immediate: true });
  
  // Функция для получения данных интенсива
  async function fetchIntensive(id) {
    try {
      const response = await api.get(`/intensives/${id}`);
      editableIntensive.value = response.data;
    } catch (error) {
      console.error(`Failed to fetch intensive ${id}:`, error);
    }
  }
  
  const emit = defineEmits(['updated']);

  async function submitEdit(id) {
    if (!id) {
        console.error('No ID provided for submitEdit');
        return;
    }
    try {
        await api.put(`/intensives/${id}`, editableIntensive.value);
        console.log('Intensive updated:', id);
        emit('updated'); // Событие для обновления таблицы и закрытия формы
    } catch (error) {
        console.error('Failed to edit intensive:', error);
    }
    }


  
  // Получаем данные интенсива при монтировании компонента, если ID уже предоставлен
  onMounted(() => {
    if (props.intensiveId) {
      fetchIntensive(props.intensiveId);
    }
  })
  </script>
  <style scoped>
  .edit-button {
      color: white;
      padding: 10px 20px;
      width: 200px;
      border: 3px solid rgb(85, 16, 170);
      border-radius: 25px;
      cursor: pointer;
      text-align: center;
      display: inline-block;
      font-size: 16px;
      text-transform: uppercase;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      transition: transform 0.2s ease-in-out;
      margin-bottom: 20px;
  }
  .edit-button:hover {
      background-color: rgb(106, 0, 255);
  }
  </style>
  