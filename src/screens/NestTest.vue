<script setup>
import { ref } from 'vue';

const questions = [
  {
    text: 'Нест жүйесі дегеніміз не?',
    answers: ['JavaScript кітапханасы', 'React фреймворкі', 'Node.js фреймворкі', 'CSS фреймворкі'],
    correct: 2,
  },
  {
    text: 'NestJS контроллерінде жаңа маршрутты құру үшін қандай декоратор қолданылады?',
    answers: ['@Get()', '@Route()', '@Url()', '@Path()'],
    correct: 0,
  },
  {
    text: 'NestJS-те модульдер дегеніміз не?',
    answers: ['Пайдаланушы интерфейсінің компоненттері', 'HTTP сұраныстарын өңдеу функциялары', 'Провайдерлерді қамтитын ұйымдастыру блоктары', 'Стиль файлдары'],
    correct: 2,
  },
  {
    text: 'NestJS-те қателіктерді өңдеу үшін қай сынып қолданылады?',
    answers: ['Error', 'Exception', 'HttpException', 'NestException'],
    correct: 2,
  },
  {
    text: 'NestJS қандай механизмді тәуелділіктерді енгізу үшін қолданады?',
    answers: ['Сынып конструкторлары', 'Глобалдық айнымалылар', 'Синглтоны', 'Модульдердің экспорты'],
    correct: 0,
  },
  {
    text: '@Injectable() декораторы NestJS-те не қайтарады?',
    answers: ['Сынып', 'Функция', 'Нысан', 'Уәде'],
    correct: 0,
  },
  {
    text: 'NestJS-те глобалды модульді жариялау үшін қандай декоратор қолданылады?',
    answers: ['@Global()', '@Module()', '@Controller()', '@Service()'],
    correct: 0,
  },
  {
    text: 'NestJS қандай типті аралық бағдарламаны қолдайды?',
    answers: ['Тек функционалды', 'Тек сыныпты', 'Функционалды және сыныпты', 'Жоғарыда аталғандардың ешқайсысы'],
    correct: 2,
  },
  {
    text: 'NestJS контроллерінің әдісіне сұраныс денесін енгізу үшін қандай декоратор қолданылады?',
    answers: ['@Body()', '@Request()', '@Query()', '@Param()'],
    correct: 0,
  },
  {
    text: 'NestJS не болып табылады?',
    answers: ['Фронтенд фреймворкі', 'Бэкенд фреймворкі', 'Толық стек фреймворкі', 'Деректер базасы'],
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
          Нәтижені көрсету
        </button>
      </div>
  
      <div v-else class="mt-6">
        <p class="text-xl font-bold mb-4">Сіздің нәтижеңіз: {{ score }} барлығы {{ questions.length }}</p>
        <ul>
          <li v-for="(question, index) in questions" :key="index" class="mb-3">
            <p class="font-semibold">{{ question.text }}</p>
            <p
              :class="{'text-green-500': userAnswers[index] === question.correct, 'text-red-500': userAnswers[index] !== question.correct}"
            >
              Сіздің жауабыңыз:{{ question.answers[userAnswers[index]] }}
            </p>
            <p class="text-green-500">
              Дұрыс жауап: {{ question.answers[question.correct] }}
            </p>
          </li>
        </ul>
        <button
          @click="() => showResults = false"
          class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Қайта тапсыру
        </button>
      </div>
    </div>
  </template>

<style scoped>
</style>
