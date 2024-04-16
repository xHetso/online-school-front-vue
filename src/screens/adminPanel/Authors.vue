<template>
    <div class="container mx-auto mt-5">
      <table class="table-auto w-full">
        <thead class="text-xs text-white uppercase bg-gradient-to-r" style="background-image: linear-gradient(to right, #1971f6, #8b52ff, #ff7654);">
          <tr>
            <th class="px-4 py-2">Photo</th>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Slug</th>
            <th class="px-4 py-2">Lessons Count</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="author in authors" :key="author._id" class="bg-gray-800 border-b">
            <td class="px-4 py-2 text-center">
              <img :src="`http://localhost:4200${author.photo}`" alt="" class="w-10 h-10 rounded-full mx-auto">
            </td>
            <td class="px-4 py-2">{{ author.name }}</td>
            <td class="px-4 py-2">{{ author.slug }}</td>
            <td class="px-4 py-2 text-center">{{ author.countLessons }}</td>
            <td class="px-4 py-2 text-center">
              <button @click="deleteAuthor(author._id)" class="text-red-500 hover:text-red-700">
                <svg class="w-6 h-6 text-red-500 hover:text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const authors = ref([]);
  
  onMounted(async () => {
    const response = await fetch('http://localhost:4200/api/authors');
    const data = await response.json();
    authors.value = data;
  });
  
  function deleteAuthor(id) {
    // Implement delete functionality here
    console.log('Delete author with ID:', id);
  }
  </script>
  
  <style scoped>
  /* Add any custom styles here if needed, although Tailwind handles most of what you need */
  </style>
  