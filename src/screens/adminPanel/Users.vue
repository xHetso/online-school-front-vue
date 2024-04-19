<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import api from './../../api/api'

const users = ref([])

const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:4200/api/users')
    users.value = response.data
  } catch (error) {
    console.error('Failed to fetch users:', error)
  }
}

const deleteUser = async (userId) => {
  try {
    // Send a DELETE request to the server
    await api.delete(`/users/${userId}`)
    // Filter out the user from the local state
    users.value = users.value.filter(user => user._id !== userId)
  } catch (error) {
    console.error('Failed to delete user:', error)
  }
}

onMounted(fetchUsers)
</script>

<template>
  <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-white">
      <thead class="text-xs text-white uppercase bg-gradient-to-r" style="background-image: linear-gradient(to right, #1971f6, #8b52ff, #ff7654);">
        <tr>
          <th scope="col" class="py-3 px-6">Аты</th>
          <th scope="col" class="py-3 px-6">Тегі</th>
          <th scope="col" class="py-3 px-6">Email</th>
          <th scope="col" class="py-3 px-6">Қала</th>
          <th scope="col" class="py-3 px-6">Ел</th>
          <th scope="col" class="py-3 px-6">Әлеуметтік желілері</th>
          <th scope="col" class="py-3 px-6">Рөлі</th>
          <th scope="col" class="py-3 px-6">Кетіру</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id" class="bg-gray-800 border-b">
          <td class="py-4 px-6">{{ user.name }}</td>
          <td class="py-4 px-6">{{ user.surname }}</td>
          <td class="py-4 px-6">{{ user.email }}</td>
          <td class="py-4 px-6">{{ user.city }}</td>
          <td class="py-4 px-6">{{ user.country }}</td>
          <td class="py-4 px-6">{{ user.instagram }}, {{ user.telegram }}, {{ user.youtube }}</td>
          <td class="py-4 px-6">{{ user.roles }}</td>
          <td class="py-4 px-6">
            <button @click="deleteUser(user._id)">
              <svg class="w-6 h-6 text-red-500 hover:text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* Scoped styles if necessary */
</style>
