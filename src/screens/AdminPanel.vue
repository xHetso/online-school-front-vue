<script setup>
import { ref } from 'vue';
import Statistics from './adminPanel/Statistics.vue';
import Users from './adminPanel/Users.vue';
import Teachers from './adminPanel/Teachers.vue';
import AdminLessons from './adminPanel/AdminLessons.vue';
import Authors from './adminPanel/Authors.vue';
import AdminCourses from './adminPanel/AdminCourses.vue'

const activeComponent = ref(Statistics);
const activeButton = ref('Статистика'); // Әдепкі 'Статистика'

function switchComponent(component, buttonLabel) {
  activeComponent.value = component;
  activeButton.value = buttonLabel;
}
</script>

<template>
	<div class="flex justify-center items-center mb-10">
	  <div class="bg-gray-800 p-3 rounded-full">
		<button class="btn-nav" :class="{ 'btn-active': activeButton === 'Статистика' }" @click="switchComponent(Statistics, 'Статистика')">Статистика</button>
		<button class="btn-nav" :class="{ 'btn-active': activeButton === 'Пайдаланушылар' }" @click="switchComponent(Users, 'Пайдаланушылар')">Пайдаланушылар</button>
		<button class="btn-nav" :class="{ 'btn-active': activeButton === 'Оқытушылар' }" @click="switchComponent(Teachers, 'Оқытушылар')">Оқытушылар</button>
		<button class="btn-nav" :class="{ 'btn-active': activeButton === 'Курстар' }" @click="switchComponent(AdminCourses, 'Курстар')">Курстар</button>
		<button class="btn-nav" :class="{ 'btn-active': activeButton === 'Авторлар' }" @click="switchComponent(Authors, 'Авторлар')">Авторлар</button>
		<button class="btn-nav" :class="{ 'btn-active': activeButton === 'Сабақтар' }" @click="switchComponent(AdminLessons, 'Сабақтар')">Сабақтар</button>
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
