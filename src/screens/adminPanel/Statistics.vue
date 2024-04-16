<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const users = ref([]);
const totalUsers = ref(0);
const totalStudents = ref(0);
const totalTeachers = ref(0);

const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:4200/api/users');
    users.value = response.data;
    totalUsers.value = users.value.length;
    totalStudents.value = users.value.filter(user => user.roles.includes('Student')).length;
    totalTeachers.value = totalUsers.value - totalStudents.value;
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
};

onMounted(fetchUsers);
</script>

<template>
  <div class="flex gap-10 items-center justify-center">
    <div class="w-[250px] h-[250px] text-white flex flex-col items-center justify-center rounded-3xl bg-gradient-to-r" style="background-image: linear-gradient(to right, #1971f6, #8b52ff, #ff7654);">
      <h1 class="font-semibold">{{ totalUsers }}</h1>
      <h2 class="font-semibold">Пользователя</h2>
    </div>
    <div class="w-[250px] h-[250px] text-white flex flex-col items-center justify-center rounded-3xl bg-gradient-to-r" style="background-image: linear-gradient(to right, #1971f6, #8b52ff, #ff7654);">
      <h1 class="font-semibold">{{ totalTeachers }}</h1>
      <h2 class="font-semibold">Преподавателя</h2>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 48px;
}
h2 {
  font-size: 24px;
}
</style>
