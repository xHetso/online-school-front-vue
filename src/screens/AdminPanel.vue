<script setup>
import { ref } from 'vue';
import Statistics from './adminPanel/Statistics.vue';
import Users from './adminPanel/Users.vue';
import Teachers from './adminPanel/Teachers.vue';
import AdminLessons from './adminPanel/AdminLessons.vue';
import Authors from './adminPanel/Authors.vue';
import AdminCourses from './adminPanel/AdminCourses.vue'

const activeComponent = ref(Statistics);
const activeButton = ref('Статистика'); // Default to 'Статистика'

function switchComponent(component, buttonLabel) {
  activeComponent.value = component;
  activeButton.value = buttonLabel;
}
</script>

<template>
	<div class="flex justify-center items-center mb-10">
	  <div class="bg-gray-800 p-3 rounded-full">
		<button class="btn-nav" :class="{ 'btn-active': activeButton === 'Статистика' }" @click="switchComponent(Statistics, 'Статистика')">Статистика</button>
		<button class="btn-nav" :class="{ 'btn-active': activeButton === 'Пользователи' }" @click="switchComponent(Users, 'Пользователи')">Пользователи</button>
		<button class="btn-nav" :class="{ 'btn-active': activeButton === 'Преподователи' }" @click="switchComponent(Teachers, 'Преподователи')">Преподователи</button>
		<button class="btn-nav" :class="{ 'btn-active': activeButton === 'Курсы' }" @click="switchComponent(AdminCourses, 'Курсы')">Курсы</button>
		<button class="btn-nav" :class="{ 'btn-active': activeButton === 'Авторы' }" @click="switchComponent(Authors, 'Авторы')">Авторы</button>
		<button class="btn-nav" :class="{ 'btn-active': activeButton === 'Уроки' }" @click="switchComponent(AdminLessons, 'Уроки')">Уроки</button>
	  </div>
	</div>
	<component :is="activeComponent"></component>
  </template>
<style scoped>
.btn-nav {
	color: white;
	padding: 10px 10px;
	width: 200px;
	border: none;
	border-radius: 25px;
	cursor: pointer;
	text-align: center;
	display: inline-block;
	font-size: 16px;
	text-transform: uppercase;
	transition: transform 0.2s ease-in-out;
}
.btn-nav:hover {
	background-color: rgb(106, 0, 255);
}

.btn-active {
	background-image: linear-gradient(to right, #1971f6, #8b52ff, #ff7654);
	color: white;
	padding: 10px 10px;
	width: 200px;
	border: none;
	border-radius: 25px;
	cursor: pointer;
	text-align: center;
	display: inline-block;
	font-size: 16px;
	text-transform: uppercase;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
	transition: transform 0.2s ease-in-out;
}
.btn-active:hover {
  background: linear-gradient(to right, #1971f6, #8b52ff, #ff7654);
  filter: brightness(1.1);
}
</style>
