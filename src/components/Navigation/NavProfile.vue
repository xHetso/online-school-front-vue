<script setup></script>
<template>
	<div
		class="profile flex flex-col justify-center items-center mt-[50px] mb-[20px]"
	>
		<img
			class="w-36 h-36 rounded-full mb-5"
			src="./../../assets/images/image.png"
			alt="Rounded avatar"
		/>
		<h1 class="text-2xl font-bold text-white mb-5">Hetso Absolute</h1>
		<a class="edit-button" href="#">Change Profile</a>
	</div>
</template>
<style>
.edit-button {
	color: white;
	padding: 10px 20px;
	width: 200px;
	border: 2px solid rgb(85, 16, 170);
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
.profile {
	width: 275px;
	border-bottom: 2px solid rgb(102, 100, 100);
}
</style>
