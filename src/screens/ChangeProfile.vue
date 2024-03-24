<template>
	<form @submit.prevent="handleSubmit">
		<div class="main-profile flex gap-10 justify-center items-center">
			<div class="col">
				<img
					class="w-36 h-36 rounded-full mb-5"
					src="/src/assets/images/image.png"
				/>
			</div>
			<div>
				<h1 class="text-2xl mb-[20px]">Name:</h1>
				<h1 class="text-2xl mb-[20px]">Surname:</h1>
			</div>
			<div class="flex flex-col">
				<input
					class="text-input mb-[20px]"
					type="text"
					v-model="formData.name"
				/>
				<input
					class="text-input mb-[20px]"
					type="text"
					v-model="formData.surname"
				/>
			</div>
		</div>

		<div class="flex justify-center items-center mb-10">
			<button class="edit-button">Change photo</button>
		</div>

		<div class="center-settings flex gap-10 justify-center items-center">
			<div>
				<h1 class="text-2xl mb-[20px] text-center">General profile settings</h1>
				<div class="main-profile flex gap-5 justify-center items-center">
					<div>
						<h1 class="text-2xl mb-[20px]">Email:</h1>
						<h1 class="text-2xl mb-[20px]">Country:</h1>
						<h1 class="text-2xl mb-[20px]">City:</h1>
						<h1 class="text-2xl mb-[20px]">Password:</h1>
					</div>
					<div class="flex flex-col">
						<input
							class="text-input mb-[20px]"
							type="text"
							v-model="formData.email"
						/>
						<input
							class="text-input mb-[20px]"
							type="text"
							v-model="formData.country"
						/>
						<input
							class="text-input mb-[20px]"
							type="text"
							v-model="formData.city"
						/>
						<input
							class="text-input mb-[20px]"
							type="password"
							v-model="formData.password"
						/>
					</div>
				</div>
				<div>
					<h1 class="text-2xl">Detailed Information:</h1>
					<textarea
						class="detailed-input mb-[20px]"
						v-model="formData.information"
					></textarea>
				</div>
			</div>

			<div>
				<h1 class="text-2xl mb-[20px] text-center">Social Network</h1>
				<div class="main-profile flex gap-10 justify-center items-center mb-20">
					<div>
						<h1 class="text-2xl mb-[20px]">Instagram:</h1>
						<h1 class="text-2xl mb-[20px]">Telegram:</h1>
						<h1 class="text-2xl mb-[20px]">Youtube:</h1>
					</div>
					<div class="flex flex-col">
						<input
							class="text-input mb-[20px]"
							type="text"
							v-model="formData.instagram"
						/>
						<input
							class="text-input mb-[20px]"
							type="text"
							v-model="formData.telegram"
						/>
						<input
							class="text-input mb-[20px]"
							type="text"
							v-model="formData.youtube"
						/>
					</div>
				</div>
				<div class="flex justify-center items-center mb-10">
					<button class="save-btn" type="submit">Save changes</button>
				</div>
			</div>
		</div>
	</form>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import api from '../api/api'

const formData = reactive({
	name: '',
	surname: '',
	email: '',
	country: '',
	city: '',
	password: '',
	instagram: '',
	telegram: '',
	youtube: '',
	information: '',
})

const fetchProfileData = async () => {
	try {
		const response = await api.get('/users/profile')
		Object.assign(formData, response.data)
	} catch (error) {
		console.error('There was a problem with the fetch operation:', error)
	}
}

onMounted(() => {
	fetchProfileData()
})

const handleSubmit = async () => {
	try {
		await api.put('/users/profile', formData)
		console.log('Profile updated successfully')
	} catch (error) {
		console.error('Error updating profile:', error)
	}
}
</script>

<style scoped>
.text-input {
	border-radius: 20px;
	font-size: 18px;
	font-weight: 400;
	padding: 3px 15px;
	background-color: rgb(255 255 255 / 50%);
	transition: border 0.4s ease-in-out;
	border: 1px solid transparent;
}
textarea {
	display: block;
	border-radius: 20px;
	width: 100%;
	background-color: rgb(255 255 255 / 50%);
	height: 150px;
	resize: none;
	margin-top: 15px;
	margin-left: 0;
	padding: 15px 20px;
}
.edit-button {
	color: white;
	padding: 10px 20px;
	width: 200px;
	border: 3px solid rgb(85, 16, 170);
	border-radius: 25px;
	cursor: pointer;
	text-align: center;
	display: inline-block;
	font-size: 16px;
	text-transform: uppercase;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
	transition: transform 0.2s ease-in-out;
	margin-bottom: 20px;
}
.edit-button:hover {
	background-color: rgb(106, 0, 255);
}
.save-btn {
	background-image: linear-gradient(to right, #1971f6, #8b52ff, #ff7654);
	color: white;
	padding: 10px 20px;
	width: 200px;
	border: none;
	border-radius: 25px;
	cursor: pointer;
	text-align: center;
	display: inline-block;
	font-size: 16px;
	text-transform: uppercase;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
	transition: transform 0.2s ease-in-out;
	margin-bottom: 20px;
}
.save-btn:hover {
	background: linear-gradient(to right, #1971f6, #8b52ff, #ff7654);
	filter: brightness(1.1);
}
</style>
