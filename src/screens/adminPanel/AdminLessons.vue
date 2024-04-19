<template>
		<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
		<table class="w-full text-sm text-left text-white">
			<thead class="text-xs text-white uppercase bg-gradient-to-r" style="background-image: linear-gradient(to right, #1971f6, #8b52ff, #ff7654);">
			<tr>
			  <th scope="col" class="py-3 px-6">Intensive Name</th>
			  <th scope="col" class="py-3 px-6">Lesson Title</th>
			  <th scope="col" class="py-3 px-6">Video URL</th>
			  <th scope="col" class="py-3 px-6">Exercises</th>
			  <th scope="col" class="py-3 px-6">Author Name</th>
			  <th scope="col" class="py-3 px-6">Actions</th>
			</tr>
		  </thead>
		  <tbody>
			<tr v-for="lesson in lessons" :key="lesson._id" class="bg-gray-800 border-b">
			  <td class="py-4 px-6">{{ lesson.intensives[0].name }}</td>
			  <td class="py-4 px-6">{{ lesson.title }}</td>
			  <td class="py-4 px-6">{{ lesson.videoUrl }}</td>
			  <td class="py-4 px-6">{{ lesson.exercises.join(', ') }}</td>
			  <td class="py-4 px-6">{{ lesson.authors[0].name }}</td>
			  <td class="py-4 px-6">
				<button @click="deleteLesson(lesson._id)" class="font-medium text-red-600 hover:underline">
				  <svg class="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
					<path d="M6.414 10l-4.707 4.707 1.414 1.414L10 11.414l4.707 4.707 1.414-1.414L11.414 10l4.707-4.707-1.414-1.414L10 8.586 5.293 3.879 3.879 5.293 8.586 10z"/>
				  </svg>
				</button>
			  </td>
			</tr>
		  </tbody>
		</table>
	  </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const lessons = ref([]);
  
  // Fetch lessons from your API
  async function fetchLessons() {
	try {
	  const response = await fetch('http://localhost:4200/api/lessons');
	  if (response.ok) {
		const data = await response.json();
		lessons.value = data;
	  }
	} catch (error) {
	  console.error('Failed to fetch lessons:', error);
	}
  }
  
  // Simulate deleting a lesson (you would need to implement the actual API call)
  function deleteLesson(id) {
	console.log('Deleting lesson with ID:', id);
	// Remove lesson from the list (for demo purposes)
	lessons.value = lessons.value.filter(lesson => lesson._id !== id);
  }
  
  // Initial fetch of data
  fetchLessons();
  </script>
  
  <style scoped>
  </style>
  