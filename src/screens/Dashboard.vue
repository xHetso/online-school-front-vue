<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios'; // Make sure you have axios installed or use the fetch API
import { useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

const authors = ref([]);
const comments = ref([
  { id: 1, name: "Анна", comment: "Отличные курсы, многое узнала!", photo: "./../../src/assets/images/comment1.jpg" },
  { id: 2, name: "Наташа", comment: "Спасибо, ваш подход к обучению уникален.", photo: "./../../src/assets/images/comment2.jpg" },
  { id: 3, name: "Елена", comment: "Рекомендую всем, кто хочет начать программировать.", photo: "./../../src/assets/images/comment3.jpg" },
  { id: 4, name: "Мария", comment: "Замечательные преподаватели и качественные материалы!", photo: "./../../src/assets/images/comment4.jpg" },
  { id: 5, name: "Карина", comment: "Благодарен за новые знания и интересный подход!", photo: "./../../src/assets/images/comment5.jpg" }
]);
const router = useRouter();

// Fetch authors data on mounted
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:4200/api/authors');
    authors.value = response.data;
  } catch (error) {
    console.error('Error fetching authors:', error);
  }
});

function goToCourses() {
  router.push({ name: 'Курсы' }); 
}
</script>

<template>
  <div class="flex flex-col justify-center items-center p-10 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 rounded-3xl">
    <h1 class="text-3xl mb-2">Что получите на курсе?</h1>
    <div class="max-w-4xl mx-auto p-10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Карточка с переходом и анимацией -->
        <div @click="goToCourses" class="card bg-gradient-to-tr from-gray-700 to-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-xl text-indigo-500 font-semibold mb-4">Глубокие знания</h3>
          <p>
            Мы предлагаем широкий спектр курсов по веб-технологиям, включая JavaScript, React JS, Nest JS и другие.
          </p>
        </div>
        <!-- Дополнительные карточки -->
        <div @click="goToCourses" class="card bg-gradient-to-tr from-gray-700 to-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-xl text-indigo-500 font-semibold mb-4">Эксклюзивные уроки</h3>
          <p>
            Дополнение к нашим бесплатным знаниям, чтобы создать уникальный веб-сайт.
          </p>
        </div>
        <div @click="goToCourses" class="card bg-gradient-to-tr from-gray-700 to-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-xl text-indigo-500 font-semibold mb-4">Легкое обучение</h3>
          <p>
            Наш материал представлен простым и интересным образом, делая изучение легким и увлекательным.
          </p>
        </div>
        <div @click="goToCourses" class="card bg-gradient-to-tr from-gray-700 to-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-xl text-indigo-500 font-semibold mb-4">От начала до профессионального уровня</h3>
          <p>
            Пройдя множество курсов и проявив активность, у вас есть шанс присоединиться к нашей команде.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="py-10 bg-gray-800 rounded-3xl mt-10 p-10">
    <h2 class="text-3xl font-bold text-center mb-10 text-white">Наши преподаватели</h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div 
      v-for="author in authors" 
      :key="author._id" 
      class="transform transition duration-300 hover:-translate-y-2 cursor-pointer"
      @click="goToCourses"
    >
      <!-- Изображение теперь квадратное, используем классы Tailwind для этого -->
      <img 
        :src="'http://localhost:4200'+author.photo" 
        :alt="author.name" 
        class="w-full aspect-square object-cover rounded-t-3xl"
      >
      <!-- Обновленный нижний блок с белым текстом и темно-синим фоном -->
      <div class="p-4 bg-purple-800 rounded-b-3xl shadow-lg">
        <h3 class="text-xl font-semibold text-white">{{ author.name }}</h3>
        <p class="text-white">Уроков: {{ author.countLessons }}</p>
      </div>
    </div>
  </div>
  </div>

  <div class="py-10 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 rounded-3xl mt-10 p-10">
    <h2 class="text-3xl font-bold text-center mb-10 text-white">Что говорят наши студенты</h2>
    <Swiper
      :slidesPerView="3"
      :spaceBetween="30"
      :pagination="{ clickable: true }"
      class="mySwiper"
    >
      <SwiperSlide v-for="comment in comments" :key="comment.id">
        <div class="flex flex-col items-center">
          <img :src="comment.photo" alt="Фото студента" class="w-[200px] h-[200px] rounded-full object-cover">
          <p class="mt-4 text-2xl text-white font-semibold">{{ comment.name }}</p>
          <p class="text-white text-xl text-center">{{ comment.comment }}</p>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>

</template>

<style scoped>
.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
}
</style>

  