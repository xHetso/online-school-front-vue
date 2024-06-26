<script setup>
import { ref, onMounted } from 'vue';
import api from './../../api/api'; // Adjust this import according to your actual API utility's path
import EditAuthor from './EditAuthor.vue';

const authors = ref([]);
const showEditAuthor = ref(false);
const currentAuthorId = ref(null);

onMounted(async () => {
  await fetchAuthors();
});

async function fetchAuthors() {
  try {
    const response = await api.get('/authors');
    authors.value = response.data;
  } catch (error) {
    console.error('Failed to fetch authors:', error);
  }
}

async function addAuthor() {
  try {
    const response = await api.post('/authors');
    currentAuthorId.value = response.data; // Ensure the data property returned matches your backend implementation
    fetchAuthors();
    showEditAuthor.value = true;
  } catch (error) {
    console.error('Failed to add author:', error);
  }
}

async function editAuthor(id) {
  currentAuthorId.value = id;
  showEditAuthor.value = true;
}

async function deleteAuthor(id) {
  try {
    await api.delete(`/authors/${id}`);
    authors.value = authors.value.filter(author => author._id !== id);
  } catch (error) {
    console.error('Failed to delete author:', error);
  }
}

async function handleUpdate() {
  await fetchAuthors();
  showEditAuthor.value = false;
}
</script>

<template>
  <div class="container mx-auto mt-5">
    <a class="edit-button" @click="addAuthor">Авторды қосу</a>
    <EditAuthor v-if="showEditAuthor" :author-id="currentAuthorId" @updated="handleUpdate" />

    <table class="table-auto w-full">
      <thead class="text-xs text-white uppercase bg-gradient-to-r" style="background-image: linear-gradient(to right, #1971f6, #8b52ff, #ff7654);">
        <tr>
          <th class="px-4 py-2">Фотосы</th>
          <th class="px-4 py-2">Аты</th>
          <th class="px-4 py-2">Slug</th>
          <th class="px-4 py-2">Әрекеттер</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="author in authors" :key="author._id" class="bg-gray-800 border-b">
          <td class="px-4 py-2 text-center">
            <img :src="`http://localhost:4200${author.photo}`" alt="" class="w-10 h-10 rounded-full mx-auto">
          </td>
          <td class="px-4 py-2">{{ author.name }}</td>
          <td class="px-4 py-2">{{ author.slug }}</td>
          <td class="px-4 py-2 text-center">
            <button @click="editAuthor(author._id)" class="text-blue-500 hover:text-blue-700">
              <svg class="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V14h3.828l7.586-7.586a2 2 0 000-2.828L17.414 2.586zM16 7l-2-2 1.586-1.586a1 1 0 011.414 0l1.586 1.586a1 1 0 010 1.414L16 7zm-3-3l2 2-7 7H6v-2l7-7z"/></svg>
            </button>
            <button @click="deleteAuthor(author._id)" class="text-red-500 hover:text-red-700">
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
  