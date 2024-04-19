<template>
  <div class="p-4">
    <form @submit.prevent="submitEdit(props.intensiveId)" class="space-y-4 text-black bg-purple-100 p-4 rounded-lg">
      <div>
        <label for="name" class="block text-sm font-medium text-purple-700">Атауы:</label>
        <input v-model="editableIntensive.name" type="text" id="name" class="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50">
      </div>
      <div>
        <label for="description" class="block text-sm font-medium text-purple-700">Сипаттамасы:</label>
        <textarea v-model="editableIntensive.description" id="description" class="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"></textarea>
      </div>
      <div>
          <label for="slug" class="block text-sm font-medium text-purple-700">Slug:</label>
          <input v-model="editableIntensive.slug" type="text" id="slug" class="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50">
      </div>
      <div>
        <label for="file" class="block text-sm font-medium text-purple-700">Постер жүктеңіз:</label>
        <input type="file" id="file" @change="uploadFile" class="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50">
      </div>
      <button type="submit" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">Өзгерістерді сақтау</button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import api from './../../api/api'

const props = defineProps({
  intensiveId: String
});

const editableIntensive = ref({
  name: '',
  description: '',
  slug: '',
  poster: null  // Постерді алдын ала бастапқылау
});


// ID өзгергенде жаңа мәліметтерді алу үшін жазылымды белсендіреміз
watch(() => props.intensiveId, async (newId) => {
  if (newId) {
    await fetchIntensive(newId);
  }
}, { immediate: true });

// Интенсив мәліметтерін алу функциясы
async function fetchIntensive(id) {
  try {
    const response = await api.get(`/intensives/${id}`);
    editableIntensive.value = response.data;
  } catch (error) {
    console.error(`Интенсив мәліметтерін алу сәтсіз болды ${id}:`, error);
  }
}

const emit = defineEmits(['updated']);

async function submitEdit(id) {
  console.log(editableIntensive.value);
  if (!id) {
      console.error('Өңдеу үшін ID көрсетілмеген');
      return;
  }
  try {
      await api.put(`/intensives/${id}`, editableIntensive.value);
      console.log('Интенсив жаңартылды:', id);
      emit('updated'); // Кестені жаңарту және форманы жабу үшін оқиға
  } catch (error) {
      console.error('Интенсивті өңдеу сәтсіз аяқталды:', error);
  }
  }

  async function uploadFile(event) {
  const file = event.target.files[0];
  if (!file) {
    console.error('Файл таңдалмады');
    return;
  }
  
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://localhost:4200/api/files?folder=intensives', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      if (data.length > 0 && data[0].url) {
        // Объектіні толық ауыстыру реактивтілікті қамтамасыз ету үшін
        editableIntensive.value = {
          ...editableIntensive.value,
          poster: data[0].url // Постер URL жаңарту
        };
        console.log(editableIntensive.value.poster); // Жаңартылған мәнді тексеріңіз
      }
    } else {
      throw new Error('Файл жүктеу сәтсіз аяқталды');
    }
  } catch (error) {
    console.error('Файл жүктеуде қате:', error);
  }
}

// Компонент монтирован кезінде, егер ID бұрын берілген болса, интенсив мәліметтерін алу
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
  