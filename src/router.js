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
import Message from './screens/Message.vue'
import NoticeBoard from './screens/NoticeBoard.vue'
import Results from './screens/Results.vue'
import Routine from './screens/Routine.vue'
import Students from './screens/Students.vue'
import Lessons from './screens/Lessons.vue'

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
				path: '/routine',
				name: 'Routine',
				component: Routine,
				meta: { role: roles.user },
			},
			{
				path: '/exam',
				name: 'Exam',
				component: Exam,
				meta: { role: roles.user },
			},
			{
				path: '/results',
				name: 'Results',
				component: Results,
				meta: { role: roles.user },
			},
			{
				path: '/students',
				name: 'Students',
				component: Students,
				meta: { role: roles.user },
			},
			{
				path: '/message',
				name: 'Message',
				component: Message,
				meta: { role: roles.user },
			},
			{
				path: '/notice-board',
				name: 'Notice Board',
				component: NoticeBoard,
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
