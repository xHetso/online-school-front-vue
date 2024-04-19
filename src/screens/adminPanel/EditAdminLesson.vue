<template>
    <div class="p-4">
      <form @submit.prevent="submitEdit(props.lessonId)" class="space-y-4 text-black bg-purple-100 p-4 rounded-lg">
        <div>
          <label for="title" class="block text-sm font-medium text-purple-700">Название урока:</label>
          <input v-model="editableLesson.title" type="text" id="title" class="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50">
        </div>
        <div>
          <label for="slug" class="block text-sm font-medium text-purple-700">Slug:</label>
          <input v-model="editableLesson.slug" type="text" id="slug" class="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50">
        </div>
        <div>
          <label for="videoUrl" class="block text-sm font-medium text-purple-700">URL видео:</label>
          <input v-model="editableLesson.videoUrl" type="text" id="videoUrl" class="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50">
        </div>
        <button type="submit" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">Сохранить изменения</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue'
  import api from './../../api/api'
  
  const props = defineProps({
    lessonId: String
  });
  
  const editableLesson = ref({
    title: '',
    slug: '',
    videoUrl: ''
  });
  
  // Подписываемся на изменения ID, чтобы получать актуальные данные урока
  watch(() => props.lessonId, async (newId) => {
    if (newId) {
      await fetchLesson(newId);
    }
  }, { immediate: true });
  
  // Функция для получения данных урока
  async function fetchLesson(id) {
    try {
      const response = await api.get(`/lessons/${id}`);
      editableLesson.value = response.data;
    } catch (error) {
      console.error(`Failed to fetch lesson ${id}:`, error);
    }
  }
  
  const emit = defineEmits(['updated']);
  
  async function submitEdit(id) {
    if (!id) {
      console.error('No ID provided for submitEdit');
      return;
    }
    try {
      await api.put(`/lessons/${id}`, editableLesson.value);
      emit('updated'); // Событие для обновления таблицы и закрытия формы
    } catch (error) {
      console.error('Failed to edit lesson:', error);
    }
  }
  
  // Получаем данные урока при монтировании компонента, если ID уже предоставлен
  onMounted(() => {
    if (props.lessonId) {
      fetchLesson(props.lessonId);
    }
  })
  </script>
  