<template>
	<a class="edit-button" @click="addLesson">Добавить урок</a>
	<EditAdminLesson v-if="showEditComponent" :lesson-id="currentLessonId" @updated="handleUpdate" />
  
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
  import { ref, onMounted } from 'vue';
  import api from './../../api/api';
  import EditAdminLesson from './EditAdminLesson.vue'; // Нужно создать этот компонент
  
  const lessons = ref([]);
  const showEditComponent = ref(false);
  const currentLessonId = ref(null);
  
  onMounted(() => {
	fetchLessons();
  });
  
  async function addLesson() {
	try {
	  const response = await api.post('/lessons');
	  currentLessonId.value = response.data; // Убедитесь, что здесь правильное имя свойства
	  fetchLessons();
	  showEditComponent.value = true;
	} catch (error) {
	  console.error('Failed to add lesson:', error);
	}
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
	await fetchLessons(); // Обновляем данные
	showEditComponent.value = false; // Скрываем форму
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
  