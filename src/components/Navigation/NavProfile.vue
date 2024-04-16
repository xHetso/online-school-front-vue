<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const userName = ref('Loading...');
const userRole = ref('')
const userAvatar = ref('');

function updateProfileData() {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    const user = JSON.parse(userStr);
    userName.value = `${user.name} ${user.surname}`;
    userRole.value = `${user.roles}`
    userAvatar.value = user.avatar
      ? `http://localhost:4200${user.avatar}?${new Date().getTime()}`
      : '/src/assets/images/anonym.webp';
  }
}

onMounted(updateProfileData);

// Прослушиваем глобальное событие обновления профиля
window.addEventListener('profile-updated', updateProfileData);

onUnmounted(() => {
  // Не забывайте удалять слушатели событий
  window.removeEventListener('profile-updated', updateProfileData);
});

</script>

<template>
  <div
    class="profile flex flex-col justify-center items-center mt-[50px] mb-[20px]"
  >
    <img
      class="w-36 h-36 rounded-full mb-5 object-cover"
      :src="userAvatar"
      alt="Rounded avatar"
    />
    <h1 class="text-2xl font-bold text-white mb-2">{{ userName }}</h1>
    <h1 class="text-xl font-bold text-white mb-5">{{ userRole }}</h1>
    <router-link to="/profile" class="edit-button">Профиль</router-link>
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
