<template>
  <div class="lesson-selector bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 shadow-md rounded-lg p-6 m-4">
      <h3 class="text-xl font-semibold mb-4">{{ currentLesson.title }}</h3>
      <select v-model="selectedLessonId" @change="updateCurrentLesson" 
              class="block w-full border rounded-lg border-gray-300 bg-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:border-gray-500">
        <option v-for="lesson in lessons" :key="lesson._id" :value="lesson._id">
          {{ lesson.title }}
        </option>
      </select>
      <div :key="currentLesson._id" class="video-container mt-6">
        <video width="640" height="360" controls class="w-full h-auto mx-auto">
          <source :src="`http://localhost:4200${currentLesson.videoUrl}`" type="video/mp4">
        </video>
      </div>
      <div class="exercises mt-6">
        <h4 class="text-xl font-semibold mb-2">Тапсырма:</h4>
        <ul v-if="currentLesson.exercises && currentLesson.exercises.length">
          <li class="text-xl" v-for="(exercise, index) in currentLesson.exercises" :key="index">
            {{ exercise }}
          </li>
        </ul>
        <div v-else class="text-xl">Тапсырма жоқ</div>
      </div>
    </div>
    <div class="m-5 p-5 bg-gray-800 rounded-3xl">
        <h1 class="text-2xl">Теориялық қосымша ақпарат:</h1>
        <p class=" mt-5 text-xl" v-for="line in (currentLesson.description ? currentLesson.description.split('\\n') : [])" :key="line">{{ line }}</p>
      </div>
    </template>
    <script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import { useRoute } from 'vue-router';
    
    const route = useRoute();
    const intensiveId = route.params.id;
    const lessons = ref([]);
    const selectedLessonId = ref('');
    const currentLesson = ref({});
    
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:4200/api/lessons/by-intensives', {
          intensiveIds: [intensiveId]
        });
        lessons.value = response.data;
        selectedLessonId.value = lessons.value[0]._id;
        currentLesson.value = lessons.value[0];
      } catch (error) {
        console.error("Деректерді жүктеу кезінде қате болды:", error);
      }
    };
    
    const updateCurrentLesson = () => {
      const lesson = lessons.value.find(lesson => lesson._id === selectedLessonId.value);
      currentLesson.value = lesson;
    };
    
    onMounted(fetchData);
    </script>
    <style scoped>
  
    </style>