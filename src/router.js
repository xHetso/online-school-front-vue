import { createRouter, createWebHistory } from 'vue-router'
import { roles } from './api/roles'
import Layout from './components/Layout.vue'
import Admin from './screens/Admin.vue'
import Auth from './screens/Auth.vue'
import ChangeProfile from './screens/ChangeProfile.vue'
import Courses from './screens/Courses.vue'
import Dashboard from './screens/Dashboard.vue'
import Exam from './screens/Exam.vue'
import LiveClass from './screens/LiveClass.vue'
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
				name: 'Dashboard',
				component: Dashboard,
				meta: { role: roles.user },
			},
			{
				path: '/courses',
				name: 'Courses',
				component: Courses,
				meta: { role: roles.user },
			},
			{
				path: '/courses/:id',
				name: 'Lessons',
				component: Lessons,
				meta: { role: roles.user },
			},
			{
				path: '/documentation',
				name: 'Documentation',
				component: Documentation,
				meta: { role: roles.user },
			},
			{
				path: '/exam',
				name: 'Exam',
				component: Exam,
				meta: { role: roles.user },
			},
			{
				path: '/javascript-test',
				name: 'JavaScriptTest',
				component: JavaScriptTest,
				meta: { role: roles.user },
			},
			{
				path: '/nest-js',
				name: 'NestTest',
				component: NestTest,
				meta: { role: roles.user },
			},
			{
				path: '/react-js',
				name: 'ReactTest',
				component: ReactTest,
				meta: { role: roles.user },
			},
			{
				path: '/chat',
				name: 'Chat',
				component: Chat,
				meta: { role: roles.user },
			},
			{
				path: '/live-class',
				name: 'Live Class',
				component: LiveClass,
				meta: { role: roles.user },
			},
			{
				path: '/profile',
				name: 'Change Profile',
				component: ChangeProfile,
				meta: { role: roles.user },
			},
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
