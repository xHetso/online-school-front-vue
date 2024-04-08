<script setup>
import { ref } from 'vue';

const questions = [
  {
    text: 'Что делает оператор === в JavaScript?',
    answers: ['Присваивает значение', 'Сравнивает значения и типы', 'Сравнивает только значения', 'Выполняет операцию равенства'],
    correct: 1,
  },
  {
    text: 'Какой метод используется для парсинга JSON строки в объект?',
    answers: ['JSON.parse()', 'JSON.stringify()', 'JSON.toObject()', 'JSON.toArray()'],
    correct: 0,
  },
  {
    text: 'Что будет результатом console.log(typeof undefined)?',
    answers: ['"null"', '"undefined"', '"object"', '"string"'],
    correct: 1,
  },
  {
    text: 'Как объявить переменную, значение которой нельзя изменить после установки в JavaScript?',
    answers: ['var', 'let', 'const', 'static'],
    correct: 2,
  },
  {
    text: 'Какая конструкция используется для повторения определенного блока кода в JavaScript?',
    answers: ['if', 'repeat', 'while', 'switch'],
    correct: 2,
  },
  {
    text: 'Что делает оператор && в JavaScript?',
    answers: ['Возвращает true, если оба операнда истинны', 'Возвращает true, если хотя бы один операнд истинен', 'Конкатенирует строки', 'Ничего не делает'],
    correct: 0,
  },
  {
    text: 'Какой из этих методов не существует в JavaScript?',
    answers: ['Array.pop()', 'Array.push()', 'Array.map()', 'Array.cut()'],
    correct: 3,
  },
  {
    text: 'Какое ключевое слово используется для обработки ошибок в JavaScript?',
    answers: ['throw', 'error', 'try', 'catch'],
    correct: 3,
  },
  {
    text: 'Какое значение имеет this в глобальной области видимости в браузере JavaScript?',
    answers: ['null', 'undefined', 'window', 'global'],
    correct: 2,
  },
  {
    text: 'Какой метод массива в JavaScript можно использовать для удаления последнего элемента массива и возвращения этого элемента?',
    answers: ['shift()', 'unshift()', 'pop()', 'push()'],
    correct: 2,
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
  user['javascript-test'] = percentage;

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
