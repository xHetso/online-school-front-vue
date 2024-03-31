<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const intensives = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:4200/api/intensives');
    intensives.value = response.data;
  } catch (error) {
    console.error("Ошибка при запросе данных:", error);
  }
});
</script>

<template>
    <div class="intensives-container flex flex-wrap justify-center gap-5 p-5">
      <div v-for="intensive in intensives" :key="intensive._id" 
           class="intensive-card max-w-sm text-white rounded-lg border border-purple-300 hover:bg-purple-700 transition duration-300 ease-in-out transform hover:-translate-y-1">
        <router-link :to="`/courses/${intensive._id}`">
          <img :src="`http://localhost:4200${intensive.poster}`" :alt="intensive.name"
              class="intensive-image w-full h-48 object-cover rounded-t-lg">
          <div class="p-4">
            <h3 class="text-xl font-semibold mb-2">{{ intensive.name }}</h3>
            <p class="text-justify">{{ intensive.description }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </template>
  
  
  <style scoped>

  </style>
  
