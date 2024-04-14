<template>
  <!--h-screen-->
  <div class="flex h-[800px] p-4 bg-gray-900">
    <!-- Список пользователей -->
    <div class="flex flex-col w-1/4 h-full mr-2">
      <ul class="overflow-y-auto">
        <li v-for="user in users" :key="user.id"
            class="flex items-center p-2 cursor-pointer bg-gray-800 rounded-lg mb-1"
            :class="{ 'bg-gradient-to-r from-blue-600 to-purple-500 via-purple-600 to-orange-400': user.isActive, 'hover:bg-gray-700': !user.isActive }"
            @click="setActiveUser(user)">
          <img class="h-10 w-10 rounded-full mr-3" :src="user.avatar" alt="User avatar">
          <div class="text-white">
            <div class="font-semibold">{{ user.name }} {{ user.surname }}</div>
          </div>
        </li>
      </ul>
    </div>
    
    <!-- Область чата -->
    <div class="flex flex-col w-3/4 h-full bg-gray-800 rounded-lg">
      <div class="p-4 text-white text-xl border-b border-gray-700">
        Чат
      </div>
      <div class="flex-grow overflow-y-auto p-4 space-y-4">
        <!-- Сообщения -->
        <div v-for="message in filteredMessages" :key="message.id"
            :class="{'my-message': message.sender.userId === getUserDataFromLocalStorage().userId, 'other-message': message.sender.userId !== getUserDataFromLocalStorage().userId}">
          <div>
            <strong>{{ message.sender.name }} {{ message.sender.surname || '' }}</strong>
            <!-- Добавлено отображение времени сообщения -->
            <span class="text-sm text-gray-400">{{ message.time }}</span>
            <div class="mb-[10px]"></div> 
          </div>
          {{ message.content }}
        </div>
        <div v-if="!filteredMessages.length" class="text-gray-400 text-center">Нет сообщений</div>
      </div>

      <div class="p-4 flex">
        <input v-model="newMessage" type="text"
               class="flex-grow p-2 bg-gray-700 text-white rounded-lg mr-4 focus:outline-none focus:ring focus:ring-purple-500"
               placeholder="Напишите ваше сообщение здесь..."
               @keyup.enter="sendMessage">
        <button @click="sendMessage"
                class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-purple-500">
          Отправить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { io } from 'socket.io-client';

const users = ref([]);

onMounted(async () => {
  try {
    // Делаем запрос к вашему API
    const response = await fetch('http://localhost:4200/api/users');
    
    if (!response.ok) {
      // Обработка возможной ошибки HTTP
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Получаем JSON из ответа
    const data = await response.json();

    // Обновляем данные пользователей
    users.value = data.map(user => ({
      id: user._id,
      name: `${user.name}`,
      surname: `${user.surname}`,
      avatar: `http://localhost:4200${user.avatar}`, // Вы должны заменить это на путь к их аватарам, если они есть
      isActive: false
    }));
  } catch (error) {
    // Обработка ошибок запроса или JSON парсинга
    console.error("There was a problem fetching the user data:", error);
  }
});

const getUserDataFromLocalStorage = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    const userObj = JSON.parse(userStr);
    return {
      userId: userObj._id, // Убедитесь, что `_id` существует в объекте
      name: userObj.name, // Извлекаем имя
      surname: userObj.surname // Извлекаем фамилию
    };
  }
  return null;
};

const messages = ref([]);
const newMessage = ref('');
const socket = io('http://localhost:4200/api/chat'); // Замените на URL вашего сервера

const activeUser = ref(null);

onMounted(() => {
  socket.on('chatHistory', (history) => {
    try {
      const parsedHistory = JSON.parse(history);
      messages.value = parsedHistory;
    } catch (error) {
      console.error('Ошибка при парсинге истории чата:', error);
    }
  });

  socket.on('chatToClient', (message) => {
    messages.value.push(message);
  });
});


onUnmounted(() => {
  socket.disconnect();
});

const sendMessage = () => {
  if (newMessage.value.trim()) {
    // Получаем данные текущего пользователя из localStorage
    const senderObj = getUserDataFromLocalStorage();
    if (senderObj && activeUser.value) {
      const messageContent = {
        senderId: senderObj.userId, // ID текущего пользователя
        senderName: senderObj.name,
        senderSurname: senderObj.surname,
        content: newMessage.value, // Содержимое сообщения
        // Добавляем данные выбранного пользователя, которому отправляем сообщение
        recipientId: activeUser.value.id, 
        recipientName: activeUser.value.name,
        recipientSurname: activeUser.value.surname,
      };
      socket.emit('chatToServer', messageContent);
      newMessage.value = '';
    } else {
      console.error('User details are not available');
    }
  }
};

const setActiveUser = (user) => {
  activeUser.value = user;
  users.value.forEach(u => {
    u.isActive = u.id === user.id;
  });
};

const filteredMessages = computed(() => {
  if (activeUser.value) {
    return messages.value.filter(message => 
      (message.sender.userId === getUserDataFromLocalStorage().userId && message.recipient.id === activeUser.value.id) ||
      (message.sender.userId === activeUser.value.id && message.recipient.id === getUserDataFromLocalStorage().userId)
    );
  } else {
    return [];
  }
});
</script>


<style scoped>
.my-message {
  margin-left: auto;
  background-image: linear-gradient(to right, #1971f6, #8b52ff, #ff7654); /* Темно-серый цвет для сообщений текущего пользователя */
  color: white;
  padding: 15px;
  border-radius: 12px;
  max-width: 55%;
}

.other-message {
  margin-right: auto;
  background-color: #2d3748; /* Светло-серый цвет для сообщений других пользователей */
  color: white;
  padding: 15px;
  border-radius: 12px;
  max-width: 55%;
}


/* ...стили скролла... */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #2d3748;
}

::-webkit-scrollbar-thumb {
  background: #805ad5;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6b46c1;
}

* {
  scrollbar-width: thin;
  scrollbar-color: #805ad5 #2d3748;
}

* {
  -ms-overflow-style: -ms-autohiding-scrollbar;
}
</style>