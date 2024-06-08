<template>
  <div class="p-4">
    <form @submit.prevent="submitEdit(props.lessonId)" class="space-y-4 text-black bg-purple-100 p-4 rounded-lg">
      <!-- Title and Slug Fields -->
      <div>
        <label for="title" class="block text-sm font-medium text-purple-700">Сабақтың атауы:</label>
        <input v-model="editableLesson.title" type="text" id="title" class="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50">
      </div>
      <div>
        <label for="slug" class="block text-sm font-medium text-purple-700">Slug:</label>
        <input v-model="editableLesson.slug" type="text" id="slug" class="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50">
      </div>
      <div>
          <label for="videoFile" class="block text-sm font-medium text-purple-700">Бейнежазба жүктеңіз:</label>
          <input type="file" id="videoFile" @change="uploadVideo" class="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50">
      </div>
      <!-- Multi-select for Intensives -->
      <div>
        <label for="intensives" class="block text-sm font-medium text-purple-700">Интенсивтер:</label>
        <select v-model="editableLesson.intensives" id="intensives" multiple class="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50">
          <option v-for="intensive in allIntensives" :key="intensive._id" :value="intensive._id">{{ intensive.name }}</option>
        </select>
      </div>
      <!-- Multi-select for Authors -->
      <div>
        <label for="authors" class="block text-sm font-medium text-purple-700">Авторлар:</label>
        <select v-model="editableLesson.authors" id="authors" multiple class="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50">
          <option v-for="author in allAuthors" :key="author._id" :value="author._id">{{ author.name }}</option>
        </select>
      </div>
      <!-- Dynamic Exercise Inputs -->
      <div>
        <label class="block text-sm font-medium text-purple-700">Тапсырмалар:</label>
        <div v-for="(exercise, index) in editableLesson.exercises" :key="index" class="mt-2">
          <input v-model="editableLesson.exercises[index]" type="text" :id="'exercise-' + index" class="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50">
          <button @click.prevent="removeExercise(index)" class="mt-1 text-red-500">Жою</button>
        </div>
        <button @click.prevent="addExercise" class="mt-2 text-blue-500">Тапсырма қосу</button>
      </div>
      <div>
        <label for="description" class="block text-sm font-medium text-purple-700">Теориялық ақпарат:</label>
        <input v-model="editableLesson.description" type="text" id="description" class="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50">
      </div>
      <button type="submit" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">Өзгерістерді сақтау</button>
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
    videoUrl: '',
    intensives: [],
    authors: [],
    exercises: [],
    description: '',
  });
  
  const allIntensives = ref([]);
  const allAuthors = ref([]);
  
  onMounted(async () => {
    fetchIntensives();
    fetchAuthors();
    if (props.lessonId) {
      await fetchLesson(props.lessonId);
    }
  });
  
  async function fetchIntensives() {
    try {
      const response = await api.get('/intensives');
      allIntensives.value = response.data;
    } catch (error) {
      console.error('Failed to fetch intensives:', error);
    }
  }
  
  async function fetchAuthors() {
    try {
      const response = await api.get('/authors');
      allAuthors.value = response.data;
    } catch (error) {
      console.error('Failed to fetch authors:', error);
    }
  }
  
  async function fetchLesson(id) {
    try {
      const response = await api.get(`/lessons/${id}`);
      editableLesson.value = response.data;
      editableLesson.value.intensives = editableLesson.value.intensives.map(i => i._id);
      editableLesson.value.authors = editableLesson.value.authors.map(a => a._id);
    } catch (error) {
      console.error(`Failed to fetch lesson ${id}:`, error);
    }
  }
  
  function addExercise() {
    editableLesson.value.exercises.push('');
  }
  
  function removeExercise(index) {
    editableLesson.value.exercises.splice(index, 1);
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
  async function uploadVideo(event) {
  const file = event.target.files[0];
  if (!file) {
    console.error('No video file selected');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://localhost:4200/api/files?folder=lessons', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      if (data.length > 0 && data[0].url) {
        // Replace the entire object to ensure reactivity
        editableLesson.value = {
          ...editableLesson.value,
          videoUrl: data[0].url // Update the video URL
        };
        console.log('Video uploaded:', editableLesson.value.videoUrl); // Log the updated video URL
      }
    } else {
      throw new Error('Failed to upload video');
    }
  } catch (error) {
    console.error('Error uploading video:', error);
  }
}

  </script>
  