<script setup>
import { ref, onMounted } from 'vue';

const userName = ref('Loading...');

onMounted(() => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    const user = JSON.parse(userStr);
    userName.value = `${user.name} ${user.surname}`;
  } else {
    userName.value = "User Not Found";
  }
});
</script>

<template>
  <div
    class="profile flex flex-col justify-center items-center mt-[50px] mb-[20px]"
  >
    <img
      class="w-36 h-36 rounded-full mb-5"
      src="./../../assets/images/anonym.webp"
      alt="Rounded avatar"
    />
    <h1 class="text-2xl font-bold text-white mb-5">{{ userName }}</h1>
    <router-link to="/profile" class="edit-button">Change Profile</router-link>
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
.profile {
	width: 275px;
	border-bottom: 2px solid rgb(102, 100, 100);
}
</style>
