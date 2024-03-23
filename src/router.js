import { createRouter, createWebHistory } from 'vue-router'
import Courses from './screens/Courses.vue'
import Dashboard from './screens/Dashboard.vue'
import Exam from './screens/Exam.vue'
import LiveClass from './screens/LiveClass.vue'
import Message from './screens/Message.vue'
import NoticeBoard from './screens/NoticeBoard.vue'
import Results from './screens/Results.vue'
import Routine from './screens/Routine.vue'
import Students from './screens/Students.vue'

const routes = [
	{
		path: '/',
		name: 'Dashboard',
		component: Dashboard,
	},
	{
		path: '/courses',
		name: 'Courses',
		component: Courses,
	},
	{
		path: '/routine',
		name: 'Routine',
		component: Routine,
	},
	{
		path: '/exam',
		name: 'Exam',
		component: Exam,
	},
	{
		path: '/results',
		name: 'Results',
		component: Results,
	},
	{
		path: '/students',
		name: 'Students',
		component: Students,
	},
	{
		path: '/message',
		name: 'Message',
		component: Message,
	},
	{
		path: '/notice-board',
		name: 'Notice Board',
		component: NoticeBoard,
	},
	{
		path: '/live-class',
		name: 'Live Class',
		component: LiveClass,
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_BASE_URL),
	routes,
})

export default router
