<script setup>
import { ref, onMounted } from 'vue'
import api from './../../api/api'
import EditAdminCourses from './EditAdminCourses.vue';

const intensives = ref([]);
const showEditComponent = ref(false);
const currentIntensiveId = ref(null); // Добавляем ссылку для хранения ID текущего курса

onMounted(async () => {
  getIntensive();
})

async function getIntensive(){
  try {
    const response = await api.get('/intensives');
    intensives.value = response.data;
  } catch (error) {
    console.error('Failed to fetch intensives:', error);
  }
}

async function addIntensive() {
  try {
    const response = await api.post('/intensives');
    
    currentIntensiveId.value = response.data; // Убедитесь, что здесь правильное имя свойства
    getIntensive();
    showEditComponent.value = true;
  } catch (error) {
    console.error('Failed to add intensive:', error);
  }
}

async function deleteIntensive(id) {
  try {
    await api.delete(`/intensives/${id}`);
    intensives.value = intensives.value.filter(intensive => intensive._id !== id);
  } catch (error) {
    console.error('Failed to delete intensive:', error);
  }
}

async function handleUpdate() {
  await getIntensive(); // Обновляем данные
  showEditComponent.value = false; // Скрываем форму
}
</script>

<template>
  <a class="edit-button" @click="addIntensive()">Добавить курс</a>
  <EditAdminCourses v-if="showEditComponent" :intensive-id="currentIntensiveId" @updated="handleUpdate" />

    <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-white">
        <thead class="text-xs text-white bg-gradient-to-r" style="background-image: linear-gradient(to right, #1971f6, #8b52ff, #ff7654);">
          <tr>
            <th class="py-3 px-6">Name</th>
            <th class="py-3 px-6">Description</th>
            <th class="py-3 px-6">Slug</th> 
            <th class="py-3 px-6">Poster</th>
            <th class="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="intensive in intensives" :key="intensive._id" class="bg-gray-800 border-b">
            <td class="py-3 px-6">{{ intensive.name }}</td>
            <td class="py-3 px-6">{{ intensive.description }}</td>
            <td class="py-3 px-6">{{ intensive.slug }}</td>
            <td class="py-3 px-6">
              <img :src="'http://localhost:4200'+intensive.poster" alt="Poster" class="h-20 w-auto">
            </td>
            <td class="px-4 py-2 text-center">
              <button @click="deleteIntensive(intensive._id)" class="text-red-500 hover:text-red-700">
                <svg class="w-6 h-6 text-red-500 hover:text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  
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