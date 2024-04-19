import { createRouter, createWebHistory } from 'vue-router'
import { roles } from './api/roles'
import Layout from './components/Layout.vue'
import AdminPanel from './screens/AdminPanel.vue'
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
/*
import Statistics from './screens/adminPanel/Statistics.vue'
import Teachers from './screens/adminPanel/Teachers.vue'
import Users from './screens/adminPanel/Users.vue'
import AdminLessons from './screens/adminPanel/AdminLessons.vue'
*/

const routes = [
	{
		path: '/auth',
		name: 'Авторизация',
		component: Auth,
	},
	{
		path: '/',
		name: 'Басты бет',
		component: Layout,
		meta: { role: roles.user },
		children: [
			{
				path: '/',
				name: 'Басты бет',
				component: Dashboard,
				meta: { role: roles.user },
			},
			{
				path: '/courses',
				name: 'Курстар',
				component: Courses,
				meta: { role: roles.user },
			},
			{
				path: '/admin-lessons',
				name: 'Әкімшілік',
				component: AdminPanel,
				meta: { role: roles.user },
				/*
				children:[
					{
						name: 'Статистика',
						component: Statistics,
					},
					{
						name: 'Оқытушылар',
						component: Teachers,
					},
					{
						name: 'Әкімшілік сабақтар',
						component: AdminLessons,
					},
					{
						name: 'Пайдаланушылар',
						component: Users,
					}
				]
				*/
			},
			{
				path: '/courses/:id',
				name: 'Сабақтар',
				component: Lessons,
				meta: { role: roles.user },
			},
			{
				path: '/documentation',
				name: 'Құжаттама',
				component: Documentation,
				meta: { role: roles.user },
			},
			{
				path: '/exam',
				name: 'Тесттер',
				component: Exam,
				meta: { role: roles.user },
			},
			{
				path: '/javascript-test',
				name: 'JavaScript бойынша тест',
				component: JavaScriptTest,
				meta: { role: roles.user },
			},
			{
				path: '/nest-js',
				name: 'NestJS бойынша тест',
				component: NestTest,
				meta: { role: roles.user },
			},
			{
				path: '/react-js',
				name: 'ReactJS бойынша тест',
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
				name: 'Профильді өзгерту',
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
    const userRole = getUserRole();
    if (to.meta.role && to.meta.role !== userRole && userRole !== roles.admin) {
        return next({ name: 'Авторизация' });
    }
    next();
});

export default router
