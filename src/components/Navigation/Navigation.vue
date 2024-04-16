<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import NavButtonComponent from './NavButton.vue';
import NavProfileComponent from './NavProfile.vue';

const router = useRouter();
const showAdminPanel = ref(false);

function checkAdmin() {
  const user = localStorage.getItem('user');
  if (user) {
    const userObj = JSON.parse(user);
    showAdminPanel.value = userObj.isAdmin;
  }
}

onMounted(() => {
  checkAdmin();
});

function logout() {
  // Функция удаления куки
  function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;
  }

  // Удаление ключей из куки
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
  deleteCookie('refreshToken');

  // Перенаправление на страницу аутентификации
  router.push('/auth');
}
</script>

<template>
	<div class="navigation flex flex-col items-center">
		<nav-profile-component />
		<div class="flex flex-col justify-center items-center">
			<nav-button-component to="/" name="Главная" />
			<nav-button-component to="/courses" name="Курсы" />
			<nav-button-component to="/chat" name="Чат" />
			<nav-button-component to="/documentation" name="Документация" />
			<nav-button-component to="/exam" name="Тесты" />
			<nav-button-component v-if="showAdminPanel" to="/admin-lessons" name="Админ панель" />
		</div>
		<a class="logout-button" @click="logout">Выход</a>
	</div>
</template>

<style scoped>
.navigation {
	position: relative;
	color: white;
	/*overflow-y: scroll;*/
	position: fixed;
	top: 0;
	bottom: 0;
	width: 20%;
	max-width: 350px;
	left: 0;
	border-right: 2px solid rgb(102, 100, 100);
}
.buttons {
  flex-grow: 1;
}

.logout-button {
	position: absolute;
	bottom: 20px;
  	margin-bottom: 10px; /* Или другое значение для отступа снизу */
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
}
.logout-button:hover{
	background-color: rgb(106, 0, 255);
}
</style>
