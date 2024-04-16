import { createRouter, createWebHistory } from 'vue-router'
import { roles } from './api/roles'
import Layout from './components/Layout.vue'
import Admin from './screens/Admin.vue'
import Auth from './screens/Auth.vue'
import ChangeProfile from './screens/ChangeProfile.vue'
import Courses from './screens/Courses.vue'
import Dashboard from './screens/Dashboard.vue'
import Exam from './screens/Exam.vue'
import Chat from './screens/Chat.vue'
import Documentation from './screens/Documentation.vue'
import Lessons from './screens/Lessons.vue'
import JavaScriptTest from './screens/JavaScriptTest.vue'
import NestTest from './screens/NestTest.vue'
import ReactTest from './screens/ReactTest.vue'

const routes = [
	{
		path: '/auth',
		name: 'Auth',
		component: Auth,
	},
	{
		path: '/admin',
		name: 'Admin',
		component: Admin,
	},
	{
		path: '/',
		name: 'Layout',
		component: Layout,
		meta: { role: roles.user },
		children: [
			{
				path: '/',
				name: 'Главная',
				component: Dashboard,
				meta: { role: roles.user },
			},
			{
				path: '/courses',
				name: 'Курсы',
				component: Courses,
				meta: { role: roles.user },
			},
			{
				path: '/courses/:id',
				name: 'Уроки',
				component: Lessons,
				meta: { role: roles.user },
			},
			{
				path: '/documentation',
				name: 'Документация',
				component: Documentation,
				meta: { role: roles.user },
			},
			{
				path: '/exam',
				name: 'Тесты',
				component: Exam,
				meta: { role: roles.user },
			},
			{
				path: '/javascript-test',
				name: 'Тест по JS',
				component: JavaScriptTest,
				meta: { role: roles.user },
			},
			{
				path: '/nest-js',
				name: 'Тест по Nest',
				component: NestTest,
				meta: { role: roles.user },
			},
			{
				path: '/react-js',
				name: 'Тест по React',
				component: ReactTest,
				meta: { role: roles.user },
			},
			{
				path: '/chat',
				name: 'Чат',
				component: Chat,
				meta: { role: roles.user },
			},
			{
				path: '/profile',
				name: 'Изменить Профиль',
				component: ChangeProfile,
				meta: { role: roles.user },
			},
			{
				path: '/admin',
				name: 'Админ панель',
				component: Admin,
				meta: { role: roles.admin },
			}
		],
	},
]

const getUserRole = () => {
	const userData = JSON.parse(localStorage.getItem('user'))
	return userData && userData.isAdmin ? roles.admin : roles.user
}

const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_BASE_URL),
	routes,
})

router.beforeEach((to, from, next) => {
	const userRole = getUserRole()
	if (to.meta.role && to.meta.role !== userRole) {
		return next({ name: 'Auth' })
	}
	next()
})

export default router
