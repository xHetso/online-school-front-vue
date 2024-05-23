<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

const authors = ref([]);
const comments = ref([
  { id: 1, name: "Анна", comment: "Үздік курстар, көп нәрсені үйрендім!", photo: "./../../src/assets/images/comment1.jpg" },
  { id: 2, name: "Наташа", comment: "Рахмет, сіздің оқыту әдісіңіз ерекше.", photo: "./../../src/assets/images/comment2.jpg" },
  { id: 3, name: "Елена", comment: "Бағдарламалауды бастағысы келетіндерге кеңес беремін.", photo: "./../../src/assets/images/comment3.jpg" },
  { id: 4, name: "Мария", comment: "Тамаша оқытушылар және сапалы материалдар!", photo: "./../../src/assets/images/comment4.jpg" },
  { id: 5, name: "Карина", comment: "Жаңа білімдер мен қызықты әдіс үшін алғыс айтамын!", photo: "./../../src/assets/images/comment5.jpg" }
]);
const router = useRouter();

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:4200/api/authors');
    authors.value = response.data;
  } catch (error) {
    console.error('Авторларды алу кезінде қате пайда болды:', error);
  }
});

function goToCourses() {
  router.push({ name: 'Курстар' }); 
}
</script>

<template>
  <div class="flex flex-col justify-center items-center p-10 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 rounded-3xl">
    <h1 class="text-3xl mb-2">Курстан не аласыз?</h1>
    <div class="max-w-4xl mx-auto p-10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div @click="goToCourses" class="card bg-gradient-to-tr from-gray-700 to-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-xl text-indigo-500 font-semibold mb-4">Терең білім</h3>
          <p>
            Біз веб-технологиялар бойынша курстардың кең спектрін ұсынамыз, оған JavaScript, React JS, Nest JS және басқалар кіреді.
          </p>
        </div>
        <div @click="goToCourses" class="card bg-gradient-to-tr from-gray-700 to-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-xl text-indigo-500 font-semibold mb-4">Эксклюзивті сабақтар</h3>
          <p>
            Біздің тегін білімдерімізге қосымша ретінде, сізге ерекше веб-сайт жасауға көмектесеміз.
          </p>
        </div>
        <div @click="goToCourses" class="card bg-gradient-to-tr from-gray-700 to-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-xl text-indigo-500 font-semibold mb-4">Оңай оқу</h3>
          <p>
            Біздің материалдар қарапайым және қызықты түрде берілген, бұл оқуды жеңіл және тартымды етеді.
          </p>
        </div>
        <div @click="goToCourses" class="card bg-gradient-to-tr from-gray-700 to-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-xl text-indigo-500 font-semibold mb-4">Бастапқыдан кәсіби деңгейге дейін</h3>
          <p>
            Көптеген курстардан өтіп, белсенділік танытқаннан кейін, біздің командамызға қосылу мүмкіндігіңіз бар.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="py-10 bg-gray-800 rounded-3xl mt-10 p-10">
    <h2 class="text-3xl font-bold text-center mb-10 text-white">Біздің оқытушылар</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="author in authors" 
        :key="author._id" 
        class="transform transition duration-300 hover:-translate-y-2 cursor-pointer"
        @click="goToCourses"
      >
        <img 
          :src="'http://localhost:4200'+author.photo" 
          :alt="author.name" 
          class="w-full aspect-square object-cover rounded-t-3xl"
        >
        <div class="p-4 bg-purple-800 rounded-b-3xl shadow-lg">
          <h3 class="text-xl font-semibold text-white">{{ author.name }}</h3>
          <p class="text-white">Сабақтар саны: {{ author.countLessons }}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="py-10 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 rounded-3xl mt-10 p-10">
    <h2 class="text-3xl font-bold text-center mb-10 text-white">Біздің студенттер не дейді</h2>
    <Swiper
      :slidesPerView="3"
      :spaceBetween="30"
      :pagination="{ clickable: true }"
      class="mySwiper"
    >
      <SwiperSlide v-for="comment in comments" :key="comment.id">
        <div class="flex flex-col items-center">
          <img :src="comment.photo" alt="Студенттің фотосы" class="w-[200px] h-[200px] rounded-full object-cover">
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
