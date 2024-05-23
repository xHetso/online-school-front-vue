<template>
  <a class="edit-button" @click="addIntensive()">Курс қосу</a>
  <EditAdminCourses v-if="showEditComponent" :intensive-id="currentIntensiveId" @updated="handleUpdate" />

    <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-white">
        <thead class="text-xs text-white bg-gradient-to-r" style="background-image: linear-gradient(to right, #1971f6, #8b52ff, #ff7654);">
          <tr>
            <th class="py-3 px-6">Атауы</th>
            <th class="py-3 px-6">Сипаттамасы</th>
            <th class="py-3 px-6">Slug</th> 
            <th class="py-3 px-6">Постер</th>
            <th class="py-3 px-6">Әрекеттер</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="intensive in intensives" :key="intensive._id" class="bg-gray-800 border-b">
            <td class="py-3 px-6">{{ intensive.name }}</td>
            <td class="py-3 px-6">{{ intensive.description }}</td>
            <td class="py-3 px-6">{{ intensive.slug }}</td>
            <td class="py-3 px-6">
              <img :src="'http://localhost:4200'+intensive.poster" alt="Постер" class="h-20 w-auto">
            </td>
            <td class="px-4 py-2 text-center">
              <button @click="editIntensive(intensive._id)" class="text-blue-500 hover:text-blue-700">
                <svg class="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V14h3.828l7.586-7.586a2 2 0 000-2.828L17.414 2.586zM16 7l-2-2 1.586-1.586a1 1 0 011.414 0l1.586 1.586a1 1 0 010 1.414L16 7zm-3-3l2 2-7 7H6v-2l7-7z"/></svg>
              </button>
              <button @click="deleteIntensive(intensive._id)" class="text-red-500 hover:text-red-700">
                <svg class="w-6 h-6 text-red-500 hover:text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from './../../api/api'
import EditAdminCourses from './EditAdminCourses.vue';

const intensives = ref([]);
const showEditComponent = ref(false);
const currentIntensiveId = ref(null);

onMounted(async () => {
  getIntensive();
})

async function getIntensive(){
  try {
    const response = await api.get('/intensives');
    intensives.value = response.data;
  } catch (error) {
    console.error('Интенсивті алу сәтсіз аяқталды:', error);
  }
}

async function addIntensive() {
  try {
    await api.post('/intensives');
    getIntensive();
  } catch (error) {
    console.error('Интенсивті қосу сәтсіз аяқталды:', error);
  }
}

function editIntensive(id) {
  currentIntensiveId.value = id;
  showEditComponent.value = true;
}

async function deleteIntensive(id) {
  try {
    await api.delete(`/intensives/${id}`);
    intensives.value = intensives.value.filter(intensive => intensive._id !== id);
  } catch (error) {
    console.error('Интенсивті жою сәтсіз аяқталды:', error);
  }
}

async function handleUpdate() {
  await getIntensive();
  showEditComponent.value = false;
}
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