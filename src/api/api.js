import axios from 'axios'
import Cookies from 'js-cookie'

// Создаем экземпляр axios
const api = axios.create({
	baseURL: 'http://localhost:4200/api',
	withCredentials: true, // Необходимо для автоматической отправки cookies
})

// Функция для попытки обновления accessToken
async function refreshAccessToken() {
	try {
		const response = await api.post('/auth/refresh')
		const { accessToken, refreshToken, user } = response.data
		// Сохраняем accessToken и данные пользователя в localStorage
		localStorage.setItem('accessToken', accessToken)
		localStorage.setItem('user', JSON.stringify(user))
		// Обновляем refreshToken в куках
		Cookies.set('refreshToken', refreshToken, { expires: 7 }) // устанавливаем срок жизни, например, 7 дней
		return accessToken
	} catch (error) {
		console.error('Error refreshing access token:', error)
		throw new Error('Could not refresh the access token.')
	}
}

// Перехватчик запросов для добавления accessToken в заголовки
api.interceptors.request.use(
	config => {
		const accessToken = localStorage.getItem('accessToken')
		if (accessToken) {
			config.headers['Authorization'] = `Bearer ${accessToken}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

// Перехватчик ответов для обработки истекшего accessToken
api.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true
			const newAccessToken = await refreshAccessToken()
			originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
			return api(originalRequest) // Повторяем исходный запрос с новым accessToken
		}
		return Promise.reject(error)
	}
)

export default api
