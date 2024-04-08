<script setup>
import { ref } from 'vue';

const questions = [
  {
    text: 'Что такое NestJS?',
    answers: ['JavaScript библиотека', 'React фреймворк', 'Node.js фреймворк', 'CSS фреймворк'],
    correct: 2,
  },
  {
    text: 'Какой декоратор используется для создания нового маршрута в контроллере NestJS?',
    answers: ['@Get()', '@Route()', '@Url()', '@Path()'],
    correct: 0,
  },
  {
    text: 'Что такое модули в NestJS?',
    answers: ['Компоненты пользовательского интерфейса', 'Функции для обработки запросов HTTP', 'Организационные блоки, которые инкапсулируют провайдеров', 'Стилевые файлы'],
    correct: 2,
  },
  {
    text: 'Какой класс используется для обработки исключений в NestJS?',
    answers: ['Error', 'Exception', 'HttpException', 'NestException'],
    correct: 2,
  },
  {
    text: 'Какой механизм использует NestJS для внедрения зависимостей?',
    answers: ['Конструкторы классов', 'Глобальные переменные', 'Синглтоны', 'Экспорты модулей'],
    correct: 0,
  },
  {
    text: 'Что возвращает декоратор @Injectable() в NestJS?',
    answers: ['Класс', 'Функцию', 'Объект', 'Промис'],
    correct: 0,
  },
  {
    text: 'Какой декоратор используется для объявления глобального модуля в NestJS?',
    answers: ['@Global()', '@Module()', '@Controller()', '@Service()'],
    correct: 0,
  },
  {
    text: 'Какой тип middleware NestJS поддерживает?',
    answers: ['Только функциональный', 'Только классовый', 'И функциональный, и классовый', 'Ни одного из вышеперечисленных'],
    correct: 2,
  },
  {
    text: 'Какой декоратор используется для внедрения тела запроса в метод контроллера NestJS?',
    answers: ['@Body()', '@Request()', '@Query()', '@Param()'],
    correct: 0,
  },
  {
    text: 'Чем является NestJS?',
    answers: ['Фронтенд фреймворк', 'Бэкенд фреймворк', 'Полностековый фреймворк', 'База данных'],
    correct: 1,
  }
];


const userAnswers = ref(questions.map(() => null));
const showResults = ref(false);
const score = ref(0);

function submitAnswer(questionIndex, answerIndex) {
  userAnswers.value[questionIndex] = answerIndex;
}

function calculateScore() {
  // Вычисляем общий балл
  score.value = questions.reduce((total, question, index) => {
    return total + (userAnswers.value[index] === question.correct ? 1 : 0);
  }, 0);
  
  // Показываем результаты
  showResults.value = true;

  // Вычисляем процент правильных ответов
  const percentage = (score.value / questions.length) * 100;

  // Получаем текущее значение user из localStorage
  let user = JSON.parse(localStorage.getItem('user') || '{}');

  // Добавляем результат теста в объект user
  user['nest-js-test'] = percentage;

  // Сохраняем обновленный объект user обратно в localStorage
  localStorage.setItem('user', JSON.stringify(user));
}

</script>

<template>
    <div class="max-w-3xl mx-auto p-6 text-white bg-gray-800 border-4 border-purple-500 shadow-lg">
      <div v-if="!showResults">
        <div v-for="(question, qIndex) in questions" :key="qIndex" class="mb-4">
          <p class="text-lg font-semibold">{{ question.text }}</p>
          <div class="mt-2">
            <button
            v-for="(answer, aIndex) in question.answers"
            :key="aIndex"
            @click="submitAnswer(qIndex, aIndex)"
            :class="[userAnswers[qIndex] === aIndex ? 'bg-blue-600' : 'bg-purple-500', 'hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2']"
            >
            {{ answer }}
            </button>
          </div>
        </div>
        <button
          @click="calculateScore"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Показать результат
        </button>
      </div>
  
      <div v-else class="mt-6">
        <p class="text-xl font-bold mb-4">Ваш результат: {{ score }} из {{ questions.length }}</p>
        <ul>
          <li v-for="(question, index) in questions" :key="index" class="mb-3">
            <p class="font-semibold">{{ question.text }}</p>
            <p
              :class="{'text-green-500': userAnswers[index] === question.correct, 'text-red-500': userAnswers[index] !== question.correct}"
            >
              Ваш ответ: {{ question.answers[userAnswers[index]] }}
            </p>
            <p class="text-green-500">
              Правильный ответ: {{ question.answers[question.correct] }}
            </p>
          </li>
        </ul>
        <button
          @click="() => showResults = false"
          class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Попробовать снова
        </button>
      </div>
    </div>
  </template>
  


<style scoped>
</style>
