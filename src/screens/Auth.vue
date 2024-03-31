<script setup>
import Cookies from 'js-cookie'
import { ref } from 'vue'

const isRegistering = ref(false)
const name = ref('')
const email = ref('')
const surname = ref('')
const password = ref('')

const handleLogin = async () => {
	try {
		console.log('Sending login data:', {
			email: email.value,
			password: password.value,
		})
		const response = await fetch('http://localhost:4200/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email.value,
				password: password.value,
			}),
		})
		const data = await response.json()
		if (response.ok && data.accessToken) {
			localStorage.setItem('accessToken', data.accessToken)
			Cookies.set('refreshToken', data.refreshToken, {
				secure: true,
				httpOnly: false,
				sameSite: 'Strict',
			})
			localStorage.setItem('user', JSON.stringify(data.user))
			console.log('Success', data)
			window.location.href = 'http://localhost:5173/'; // Добавлено перенаправление
		} else {
			console.log('Authentication failed:', data.message)
		}
	} catch (error) {
		console.log('Error', error)
	}
}

const handleRegister = async () => {
	try {
		const response = await fetch('http://localhost:4200/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name.value,
				surname: surname.value,
				email: email.value,
				password: password.value,
			}),
		})
		const data = await response.json()
		if (response.ok && data.accessToken) {
			localStorage.setItem('accessToken', data.accessToken)
			Cookies.set('refreshToken', data.refreshToken, {
				secure: true,
				httpOnly: false,
				sameSite: 'Strict',
			})
			localStorage.setItem('user', JSON.stringify(data.user))
			console.log('Success', data)
			window.location.href = 'http://localhost:5173/'; // Добавлено перенаправление
		} else {
			console.log('Registration failed:', data.message)
		}
	} catch (error) {
		console.log('Error', error)
	}
}
</script>

<template>
	<div
		class="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 flex items-center justify-center"
	>
		<div
			class="bg-gray-900 p-10 rounded-lg shadow-xl text-white w-[480px] mx-auto h-[800px] mt-[210px]"
		>
			<div class="content w-[400px]">
				<h2 class="text-3xl font-bold mb-2 text-center">ABSOLUTE</h2>
				<h2 class="text-3xl font-bold mb-2 text-center">ONLINE SCHOOL</h2>
				<div class="space-y-4">
					<div>
						<div class="flex items-center justify-center mb-[30px] mt-[30px]">
							<button
								:class="[
									'px-4 py-2 rounded focus:outline-none',
									{
										'bg-gray-700 text-white shadow': !isRegistering,
										'text-gray-300': isRegistering,
									},
								]"
								@click="isRegistering = false"
							>
								Log In
							</button>
							<button
								:class="[
									'px-4 py-2 rounded focus:outline-none',
									{
										'bg-gray-700 text-white shadow': isRegistering,
										'text-gray-300': !isRegistering,
									},
								]"
								@click="isRegistering = true"
							>
								Register
							</button>
						</div>
						<!-- Login Form -->
						<form v-if="!isRegistering" @submit.prevent="handleLogin">
							<div class="mb-4">
								<input
									type="text"
									v-model="email"
									placeholder="Email"
									class="w-full p-2 rounded bg-gray-800 text-white focus:outline-none border-b-2 border-purple-600"
								/>
							</div>
							<div class="mb-6">
								<input
									type="password"
									v-model="password"
									placeholder="Password"
									class="w-full p-2 rounded bg-gray-800 text-white focus:outline-none border-b-2 border-purple-600"
								/>
							</div>
							<button
								type="submit"
								class="btn-active w-full hover: text-white font-bold py-2 px-4 rounded focus:outline-none shadow-lg transform transition-all duration-150"
							>
								Sign In
							</button>
						</form>
						<!-- Register Form -->
						<form v-if="isRegistering" @submit.prevent="handleRegister">
							<div class="mb-4">
								<input
									type="text"
									v-model="name"
									placeholder="Name"
									class="w-full p-2 rounded bg-gray-800 text-white focus:outline-none border-b-2 border-purple-600"
								/>
							</div>
							<div class="mb-4">
								<input
									type="text"
									v-model="surname"
									placeholder="Surname"
									class="w-full p-2 rounded bg-gray-800 text-white focus:outline-none border-b-2 border-purple-600"
								/>
							</div>
							<div class="mb-4">
								<input
									type="text"
									v-model="email"
									placeholder="Email"
									class="w-full p-2 rounded bg-gray-800 text-white focus:outline-none border-b-2 border-purple-600"
								/>
							</div>
							<!-- Add more fields as needed -->
							<div class="mb-6">
								<input
									type="password"
									v-model="password"
									placeholder="Password"
									class="w-full p-2 rounded bg-gray-800 text-white focus:outline-none border-b-2 border-purple-600"
								/>
							</div>
							<button
								type="submit"
								class="btn-active w-full hover: text-white font-bold py-2 px-4 rounded focus:outline-none transform transition-all duration-150"
							>
								Register
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
button.btn-active {
	background: linear-gradient(to right, #1971f6, #8b52ff, #ff7654);
}
button.btn-active:hover {
	background: linear-gradient(to right, #1971f6, #8b52ff, #ff7654);
	filter: brightness(1.1);
}
</style>
