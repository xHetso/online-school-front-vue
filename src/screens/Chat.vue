<template>
    <div class="flex h-screen p-4 bg-gray-900">
      <div class="flex flex-col w-1/4 h-full mr-2">
        <!-- Список пользователей -->
        <ul class="overflow-y-auto">
          <!-- Элемент списка для пользователя -->
          <li v-for="user in users" :key="user.id"
              class="flex items-center p-2 cursor-pointer bg-gray-800 rounded-lg mb-1"
              :class="{ 'bg-gradient-to-r from-blue-600 to-purple-500 via-purple-600 to-orange-400': user.isActive, 'hover:bg-gray-700': !user.isActive }"
              @click="setActiveUser(user.id)">
            <img class="h-10 w-10 rounded-full mr-3" :src="user.avatar" alt="Аватар пользователя">
            <div class="text-white">
              <div class="font-semibold">{{ user.name }}</div>
            </div>
          </li>
        </ul>
      </div>
      
      <!-- Область чата -->
      <div class="flex flex-col w-3/4 h-full bg-gray-800 rounded-lg">
        <div class="p-4 text-white text-xl border-b border-gray-700">Чат</div>
        <div class="flex-grow overflow-y-auto p-4">
          <!-- Сообщения -->
        </div>
        <div class="p-4 flex">
          <input class="flex-grow p-2 bg-gray-700 text-white rounded-lg mr-4 focus:outline-none focus:ring focus:ring-purple-500" placeholder="Напишите ваше сообщение здесь...">
          <button class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-purple-500">Отправить</button>
        </div>
      </div>
    </div>
    </template>
    
    <script setup>
    import { ref } from 'vue';
    
    const users = ref([
    { id: 1, name: 'Michael Johnson', avatar: '/src/assets/images/image.png', isActive: false },
    { id: 2, name: 'Emily Smith', avatar: '/src/assets/images/image.png', isActive: false },
    { id: 3, name: 'Christopher Wilson', avatar: '/src/assets/images/image.png', isActive: false },
    { id: 4, name: 'Sarah Davis', avatar: '/src/assets/images/image.png', isActive: false },
    { id: 5, name: 'Daniel Martinez', avatar: '/src/assets/images/image.png', isActive: false },
    { id: 6, name: 'Jessica Taylor', avatar: '/src/assets/images/image.png', isActive: false },
    { id: 7, name: 'Anthony Brown', avatar: '/src/assets/images/image.png', isActive: false },
    { id: 8, name: 'Ashley Garcia', avatar: '/src/assets/images/image.png', isActive: false },
    { id: 9, name: 'Matthew Anderson', avatar: '/src/assets/images/image.png', isActive: false },
    { id: 10, name: 'Jennifer Hernandez', avatar: '/src/assets/images/image.png', isActive: false },
    { id: 11, name: 'David Moore', avatar: '/src/assets/images/image.png', isActive: false },
    { id: 12, name: 'Laura Jackson', avatar: '/src/assets/images/image.png', isActive: false },
    { id: 13, name: 'John Lee', avatar: '/src/assets/images/image.png', isActive: false },
    { id: 14, name: 'Amy White', avatar: '/src/assets/images/image.png', isActive: false },
    { id: 15, name: 'Ryan Harris', avatar: '/src/assets/images/image.png', isActive: false },
    { id: 16, name: 'Elizabeth Walker', avatar: '/src/assets/images/image.png', isActive: false },
    { id: 17, name: 'Joshua Young', avatar: '/src/assets/images/image.png', isActive: false },
    { id: 18, name: 'Angela King', avatar: '/src/assets/images/image.png', isActive: false },
    ]);

    
    function setActiveUser(userId) {
      users.value.forEach(user => {
        user.isActive = user.id === userId;
      });
    }
    </script>
    
    <style scoped>
        /* Style the scrollbar for Chrome, Safari, and Opera */
        ::-webkit-scrollbar {
        width: 10px; /* width of the entire scrollbar */
        }

        ::-webkit-scrollbar-track {
        background: #2d3748; /* color of the tracking area, this is the "track" */
        }

        ::-webkit-scrollbar-thumb {
        background: #805ad5; /* your bg-purple-600 equivalent color */
        border-radius: 5px; /* roundness of the scroll thumb */
        }

        /* Handle on hover for the scrollbar thumb */
        ::-webkit-scrollbar-thumb:hover {
        background: #6b46c1; /* a darker purple for hover state, similar to bg-purple-700 */
        }

        /* Style the scrollbar for Firefox */
        * {
        scrollbar-width: thin; /* "auto" or "thin" */
        scrollbar-color: #805ad5 #2d3748; /* thumb and track color */
        }

        /* Style the scrollbar for IE and Edge */
        * {
        -ms-overflow-style: -ms-autohiding-scrollbar; /* auto-hide scrollbar */
        }
    </style>
    