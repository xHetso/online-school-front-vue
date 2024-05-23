<template>
  <div class="flex h-[800px] p-4 bg-gray-900">
    <!-- Пайдаланушылар тізімі -->
    <div class="flex flex-col w-1/4 h-full mr-2">
      <ul class="overflow-y-auto">
        <li v-for="user in users" :key="user.id"
            class="flex items-center p-2 cursor-pointer bg-gray-800 rounded-lg mb-1"
            :class="{ 'bg-gradient-to-r from-blue-600 to-purple-500 via-purple-600 to-orange-400': user.isActive, 'hover:bg-gray-700': !user.isActive }"
            @click="setActiveUser(user)">
          <img class="h-10 w-10 rounded-full mr-3 object-cover" :src="user.avatar" alt="Пайдаланушы аватары">
          <div class="text-white">
            <div class="font-semibold">{{ user.name }} {{ user.surname }}</div>
            <div class="text-base">{{ user.roles }}</div>
          </div>
        </li>
      </ul>
    </div>
    <!-- Чат аймағы -->
<div class="flex flex-col w-3/4 h-full bg-gray-800 rounded-lg">
  <div class="p-4 text-white text-xl border-b border-gray-700">
    Чат
  </div>
  <div class="flex-grow overflow-y-auto p-4 space-y-4">
    <!-- Хабарламалар -->
    <div v-for="message in filteredMessages" :key="message.id"
         :class="{'my-message': message.sender.userId === getUserDataFromLocalStorage().userId, 'other-message': message.sender.userId !== getUserDataFromLocalStorage().userId}">
      <div>
        <strong>{{ message.sender.name }} {{ message.sender.surname || '' }}</strong>
        <div class="flex justify-between items-center text-sm text-gray-400">
          <span class="text-white">{{ message.date }}</span>
          <span class="text-white">{{ message.time }}</span>
        </div>
        <div class="mb-[10px]"></div>
      </div>
      {{ message.content }}
    </div>
    <div v-if="!filteredMessages.length" class="text-gray-400 text-center">Хабарламалар жоқ</div>
  </div>

  <div class="p-4 flex">
    <input v-model="newMessage" type="text"
           class="flex-grow p-2 bg-gray-700 text-white rounded-lg mr-4 focus:outline-none focus:ring focus:ring-purple-500"
           placeholder="Мұнда хабарламаңызды жазыңыз..."
           @keyup.enter="sendMessage">
    <button @click="sendMessage"
            class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-purple-500">
      Жіберу
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
    // Сіздің API-ға сұрау жасау
    const response = await fetch('http://localhost:4200/api/users');
    
    if (!response.ok) {
      // HTTP қатесін өңдеу мүмкін
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Жауаптан JSON алу
    const data = await response.json();

    // Пайдаланушылар деректерін жаңарту
    users.value = data.map(user => ({
      id: user._id,
      name: `${user.name}`,
      surname: `${user.surname}`,
      avatar: `http://localhost:4200${user.avatar}`, // Олардың аватарларына деген жолды ауыстырыңыз, егер олар бар болса
      roles: `${user.roles}`,
      isActive: false
    }));
  } catch (error) {
    // Сұрау немесе JSON талдау қателерін өңдеу
    console.error("Пайдаланушы деректерін алу кезінде проблема туындады:", error);
  }
});

const getUserDataFromLocalStorage = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    const userObj = JSON.parse(userStr);
    return {
      userId: userObj._id, // `_id` объектте бар екенін тексеріңіз
      name: userObj.name, // Атын алыңыз
      surname: userObj.surname // Тегін алыңыз
    };
  }
  return null;
};

const messages = ref([]);
const newMessage = ref('');
const socket = io('http://localhost:4200/api/chat'); // Серверіңіздің URL-ына ауыстырыңыз

const activeUser = ref(null);

onMounted(() => {
  socket.on('chatHistory', (history) => {
    try {
      const parsedHistory = JSON.parse(history);
      messages.value = parsedHistory;
    } catch (error) {
      console.error('Чат тарихын талдау кезінде қате:', error);
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
    // Ағымдағы пайдаланушының деректерін localStorage-тен алыңыз
    const senderObj = getUserDataFromLocalStorage();
    if (senderObj && activeUser.value) {
      const messageContent = {
        senderId: senderObj.userId, // Ағымдағы пайдаланушының ID-і
        senderName: senderObj.name,
        senderSurname: senderObj.surname,
        content: newMessage.value, // Хабарлама мазмұны
        // Хабарлама жіберілетін таңдалған пайдаланушының деректерін қосыңыз
        recipientId: activeUser.value.id, 
        recipientName: activeUser.value.name,
        recipientSurname: activeUser.value.surname,
      };
      socket.emit('chatToServer', messageContent);
      newMessage.value = '';
    } else {
      console.error('Пайдаланушы деректері қолжетімді емес');
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
// Vue компонентінің сценарийі
const groupedMessages = computed(() => {
  // Бұл хабарламаларды күні бойынша топтастырады
  const grouped = messages.value.reduce((acc, message) => {
    (acc[message.date] = acc[message.date] || []).push(message);
    return acc;
  }, {});
  
  // Топтастырылған хабарламалар объектісін массивке айналдырып, күні бойынша сұрыптаңыз
  return Object.keys(grouped).sort().map(date => ({ date, messages: grouped[date] }));
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
