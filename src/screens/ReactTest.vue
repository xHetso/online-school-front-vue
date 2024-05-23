<script setup>
import { ref } from 'vue';

const questions = [
  {
    text: 'JSX React-та не істейді?',
    answers: ['JavaScript-те HTML жазу үшін синтаксисті ұсынады', 'Серверлік рендерингді іске қосады', 'Жаңа React компоненттерін жасайды', 'Қолданбаның өнімділігін оптимизациялайды'],
    correct: 0,
  },
  {
    text: 'React-те компоненттің күйімен жұмыс істеу үшін қандай хук қолданылады?',
    answers: ['useEffect', 'useState', 'useContext', 'useReducer'],
    correct: 1,
  },
  {
    text: 'React-те props дегеніміз не?',
    answers: ['Компоненттің жергілікті айнымалылары', 'Қолданбаның глобалдық айнымалылары', 'Компонентке берілген параметрлер', 'Кері шақыру функциялары'],
    correct: 2,
  },
  {
    text: 'Компонентті монтировать ету кезінде бірінші болып қандай өмірлік цикл әдісі шақырылады?',
    answers: ['componentDidMount', 'componentDidUpdate', 'componentWillUnmount', 'constructor'],
    correct: 3,
  },
  {
    text: 'Функционалдық компоненттерде жанама әсерлерді орындау үшін қандай React хукы қолданылады?',
    answers: ['useState', 'useEffect', 'useReducer', 'useRef'],
    correct: 1,
  },
  {
    text: 'React-тің класс компоненттерінде қандай әдістер қолданылмайды?',
    answers: ['setState', 'forceUpdate', 'render', 'useProps'],
    correct: 3,
  },
  {
    text: 'React-те Context дегеніміз не?',
    answers: ['Күйді басқару әдісі', 'Өнімділікті оптимизациялау құралы', 'Пропстарсыз компонент ағашы арқылы деректерді беру әдісі', 'Компоненттерді жобалау үлгісі'],
    correct: 2,
  },
  {
    text: 'React-те props немесе state-тің алдыңғы мәніне қол жеткізу үшін қандай хук қолданылады?',
    answers: ['useRef', 'usePrevious', 'useMemo', 'useImperativeHandle'],
    correct: 0,
  },
  {
    text: 'React класс компонентінде қайталама рендерингті болдырмау үшін қандай әдісті пайдалану керек?',
    answers: ['shouldComponentUpdate', 'componentWillUpdate', 'componentDidUpdate', 'preventRender'],
    correct: 0,
  },
  {
    text: 'React-те useCallback хукі не істейді?',
    answers: ['Есте сақталған коллбэк жасайды', 'Айнымалының өзгерістерін бақылайды', 'Компоненттердің өнімділігін оптимизациялайды', 'Рендерлер арасында деректерді сақтайды'],
    correct: 0,
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
  user['react-js-test'] = percentage;

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
        <p class="text-xl font-bold mb-4">Сіздің нәтижеңіз:  {{ score }} барлығы {{ questions.length }}</p>
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
