<template>
  <div class="flex justify-center items-center space-x-16">
    <!-- Javascript карточкасы -->
    <div class="transform transition duration-300 hover:scale-105 w-72 border-2 border-purple-300 rounded-lg shadow-md overflow-hidden hover:shadow-lg">
      <div class="p-5 text-center">
        <div class="mx-auto mb-4 rounded-full w-[200px] h-[200px] flex items-center justify-center bg-yellow-100 border-2 border-yellow-300">
          <span class="text-3xl font-bold text-yellow-500">JavaScript</span>
        </div>
        <div class="text-2xl font-bold text-purple-500 mb-4">Прогресс</div>
        <div class="w-full bg-purple-100 rounded-full h-2 mb-5">
          <div class="bg-purple-500 h-2 rounded-full" :style="{ width: javascriptProgress + '%' }"></div>
        </div>
        <button class="w-full bg-purple-500 text-white rounded-full py-2 hover:bg-purple-600 transition ease-in-out duration-300"
          @click="startTest('JavaScript бойынша тест')">
          Бастау
        </button>
      </div>
    </div>

    <!-- React JS карточкасы -->
    <div class="transform transition duration-500 hover:scale-105 w-72 border-2 border-purple-300 rounded-lg shadow-md overflow-hidden">
      <div class="p-5 text-center">
        <div class="mx-auto mb-4 rounded-full w-[200px] h-[200px] flex items-center justify-center bg-blue-200 border-2 border-blue-300">
          <span class="text-3xl font-bold text-blue-600">React JS</span>
        </div>
        <div class="text-2xl font-bold text-purple-700 mb-4">Прогресс</div>
        <div class="w-full bg-purple-100 rounded-full h-2 mb-5">
          <div class="bg-purple-500 h-2 rounded-full" :style="{ width: reactProgress + '%' }"></div>
        </div>
        <button class="w-full bg-purple-600 text-white rounded-full py-2 hover:bg-purple-700 transition ease-in-out duration-300"
          @click="startTest('ReactJS бойынша тест')">
          Бастау
        </button>
      </div>
    </div>

    <!-- Nest JS карточкасы -->
    <div class="transform transition duration-500 hover:scale-105 w-72 border-2 border-purple-300 rounded-lg shadow-md overflow-hidden">
      <div class="p-5 text-center">
        <div class="mx-auto mb-4 rounded-full w-[200px] h-[200px] flex items-center justify-center bg-red-200 border-2 border-red-300">
          <span class="text-3xl font-bold text-red-600">Nest JS</span>
        </div>
        <div class="text-2xl font-bold text-purple-700 mb-4">Прогресс</div>
        <div class="w-full bg-purple-100 rounded-full h-2 mb-5">
          <div class="bg-purple-500 h-2 rounded-full" :style="{ width: nestProgress + '%' }"></div>
        </div>
        <button class="w-full bg-purple-600 text-white rounded-full py-2 hover:bg-purple-700 transition ease-in-out duration-300"
          @click="startTest('NestJS бойынша тест')">
          Бастау
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    javascriptProgress() {
      const userData = JSON.parse(localStorage.getItem('user'));
      return userData && userData['javascript-test'] ? userData['javascript-test'] : 0;
    },
    reactProgress() {
      const userData = JSON.parse(localStorage.getItem('user'));
      return userData && userData['react-js-test'] ? userData['react-js-test'] : 0;
    },
    nestProgress() {
      const userData = JSON.parse(localStorage.getItem('user'));
      return userData && userData['nest-js-test'] ? userData['nest-js-test'] : 0;
    },
  },
  methods: {
    startTest(testName) {
      this.$router.push({ name: testName });
    }
  }
};
</script>

<style>
/* Ваши стили здесь */
</style>
