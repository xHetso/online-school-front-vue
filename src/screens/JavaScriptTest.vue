<script setup>
import { ref } from 'vue';

const questions = [
  {
    text: 'Нені істейді оператор === JavaScript-те?',
    answers: ['Мәнді береді', 'Мәндерді және түрлерді салыстырады', 'Тек мәндерді салыстырады', 'Теңдік операциясын орындайды'],
    correct: 1,
  },
  {
    text: 'JSON жолын объектке айналдыру үшін қандай әдіс қолданылады?',
    answers: ['JSON.parse()', 'JSON.stringify()', 'JSON.toObject()', 'JSON.toArray()'],
    correct: 0,
  },
  {
    text: 'console.log(typeof undefined) нәтижесі не болады?',
    answers: ['"null"', '"undefined"', '"object"', '"string"'],
    correct: 1,
  },
  {
    text: 'JavaScript-те мәнін өзгертуге болмайтын айнымалыны қалай жариялауға болады?',
    answers: ['var', 'let', 'const', 'static'],
    correct: 2,
  },
  {
    text: 'JavaScript-те белгілі бір код блогын қайталау үшін қандай құрылым пайдаланылады?',
    answers: ['if', 'repeat', 'while', 'switch'],
    correct: 2,
  },
  {
    text: '&& операторы JavaScript-те не істейді?',
    answers: ['Екі операнд та шын болса, true қайтарады', 'Кемінде бір операнд шын болса, true қайтарады', 'Жолдарды қосады', 'Ештеңе істемейді'],
    correct: 0,
  },
  {
    text: 'JavaScript-те осы методтардың қайсысы жоқ?',
    answers: ['Array.pop()', 'Array.push()', 'Array.map()', 'Array.cut()'],
    correct: 3,
  },
  {
    text: 'Қателерді өңдеу үшін JavaScript-те қандай маңызды сөз қолданылады?',
    answers: ['throw', 'error', 'try', 'catch'],
    correct: 3,
  },
  {
    text: 'JavaScript браузерінде глобалды көрініс аясында this мәні қандай?',
    answers: ['null', 'undefined', 'window', 'global'],
    correct: 2,
  },
  {
    text: 'JavaScript массивіндегі соңғы элементті жою және оны қайтару үшін қандай массив әдісі қолданылады?',
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
  // Жалпы баллды есептейміз
  score.value = questions.reduce((total, question, index) => {
    return total + (userAnswers.value[index] === question.correct ? 1 : 0);
  }, 0);
  
  // Нәтижелерді көрсетеміз
  showResults.value = true;

  // Дұрыс жауаптардың пайызын есептейміз
  const percentage = (score.value / questions.length) * 100;

  // localStorage-тан қазіргі user мәнін аламыз
  let user = JSON.parse(localStorage.getItem('user') || '{}');

  // user объектіне тест нәтижесін қосамыз
  user['javascript-test'] = percentage;

  // Жаңартылған user объектісін қайта localStorage-қа сақтаймыз
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
        <p class="text-xl font-bold mb-4">Сіздің нәтижеңіз:  {{ score }} барлығы: {{ questions.length }}</p>
        <ul>
          <li v-for="(question, index) in questions" :key="index" class="mb-3">
            <p class="font-semibold">{{ question.text }}</p>
            <p
              :class="{'text-green-500': userAnswers[index] === question.correct, 'text-red-500': userAnswers[index] !== question.correct}"
            >
              Сіздің жауабыңыз: {{ question.answers[userAnswers[index]] }}
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
