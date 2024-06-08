<template>
	<a class="edit-button" @click="addLesson">Сабақ қосу</a>
	<EditAdminLesson v-if="showEditComponent" :lesson-id="currentLessonId" @updated="handleUpdate" />
  
	<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
	  <table class="w-full text-sm text-left text-white">
		<thead class="text-xs text-white uppercase bg-gradient-to-r" style="background-image: linear-gradient(to right, #1971f6, #8b52ff, #ff7654);">
		<tr>
		  <th scope="col" class="py-3 px-6">Интенсив атауы</th>
		  <th scope="col" class="py-3 px-6">Сабақтың атауы</th>
		  <th scope="col" class="py-3 px-6">Бейне URL</th>
		  <th scope="col" class="py-3 px-6">Жаттығулар</th>
		  <th scope="col" class="py-3 px-6">Теориялық ақпарат</th>
		  <th scope="col" class="py-3 px-6">Автордың аты</th>
		  <th scope="col" class="py-3 px-6">Әрекеттер</th>
		</tr>
		</thead>
		<tbody>
		  <tr v-for="lesson in lessons" :key="lesson._id" class="bg-gray-800 border-b">
			<td class="py-4 px-6">{{ lesson.intensives[0].name }}</td>
			<td class="py-4 px-6">{{ lesson.title }}</td>
			<td class="py-4 px-6">{{ lesson.videoUrl }}</td>
			<td class="py-4 px-6">{{ lesson.exercises.join(', ') }}</td>
			<td class="py-4 px-6">{{ lesson.description }}</td>
			<td class="py-4 px-6">{{ lesson.authors[0].name }}</td>
			<td class="py-4 px-6">
			  <button @click="editLesson(lesson._id)" class="font-medium text-blue-600 hover:underline">
				<svg class="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V14h3.828l7.586-7.586a2 2 0 000-2.828L17.414 2.586zM16 7l-2-2 1.586-1.586a1 1 0 011.414 0l1.586 1.586a1 1 0 010 1.414L16 7zm-3-3l2 2-7 7H6v-2l7-7z"/></svg>
			  </button>
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
  import { ref, onMounted } from 'vue';
  import api from './../../api/api';
  import EditAdminLesson from './EditAdminLesson.vue';
  
  const lessons = ref([]);
  const showEditComponent = ref(false);
  const currentLessonId = ref(null);
  
  onMounted(() => {
	fetchLessons();
  });
  
  async function addLesson() {
	try {
	  const response = await api.post('/lessons');
	  currentLessonId.value = response.data; // Ensure proper property name
	  fetchLessons();
	  showEditComponent.value = true;
	} catch (error) {
	  console.error('Failed to add lesson:', error);
	}
  }
  
  async function editLesson(id) {
	currentLessonId.value = id;
	showEditComponent.value = true;
  }
  
  async function deleteLesson(id) {
	try {
	  await api.delete(`/lessons/${id}`);
	  lessons.value = lessons.value.filter(lesson => lesson._id !== id);
	} catch (error) {
	  console.error('Failed to delete lesson:', error);
	}
  }
  
  async function handleUpdate() {
	await fetchLessons(); // Refresh data
	showEditComponent.value = false; // Hide form
  }
  
  async function fetchLessons() {
	try {
	  const response = await api.get('/lessons');
	  lessons.value = response.data;
	} catch (error) {
	  console.error('Failed to fetch lessons:', error);
	}
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
  