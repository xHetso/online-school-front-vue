<script setup>
import { ref } from 'vue';

const questions = [
  {
    text: 'Что делает JSX в React?',
    answers: ['Предоставляет синтаксис для написания HTML в JavaScript', 'Запускает серверный рендеринг', 'Создает новые компоненты React', 'Оптимизирует производительность приложения'],
    correct: 0,
  },
  {
    text: 'Какой хук в React используется для работы с состоянием компонента?',
    answers: ['useEffect', 'useState', 'useContext', 'useReducer'],
    correct: 1,
  },
  {
    text: 'Что такое props в React?',
    answers: ['Локальные переменные компонента', 'Глобальные переменные приложения', 'Параметры, передаваемые компоненту', 'Функции обратного вызова'],
    correct: 2,
  },
  {
    text: 'Какой метод жизненного цикла компонента вызывается первым при монтировании?',
    answers: ['componentDidMount', 'componentDidUpdate', 'componentWillUnmount', 'constructor'],
    correct: 3,
  },
  {
    text: 'Какой хук React используется для выполнения побочных эффектов в функциональных компонентах?',
    answers: ['useState', 'useEffect', 'useReducer', 'useRef'],
    correct: 1,
  },
  {
    text: 'Какой из этих методов не используется в классовых компонентах React?',
    answers: ['setState', 'forceUpdate', 'render', 'useProps'],
    correct: 3,
  },
  {
    text: 'Что такое Context в React?',
    answers: ['Способ управления состоянием', 'Инструмент для оптимизации производительности', 'Способ передачи данных через дерево компонентов без пропсов', 'Шаблон проектирования для компонентов'],
    correct: 2,
  },
  {
    text: 'Какой хук используется для получения доступа к предыдущему значению props или state в React?',
    answers: ['useRef', 'usePrevious', 'useMemo', 'useImperativeHandle'],
    correct: 0,
  },
  {
    text: 'Какой метод нужно использовать для предотвращения повторного рендеринга в классовом компоненте React?',
    answers: ['shouldComponentUpdate', 'componentWillUpdate', 'componentDidUpdate', 'preventRender'],
    correct: 0,
  },
  {
    text: 'Что делает хук useCallback в React?',
    answers: ['Создает запомненный коллбэк', 'Следит за изменениями переменной', 'Оптимизирует производительность компонентов', 'Сохраняет данные между рендерами'],
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
