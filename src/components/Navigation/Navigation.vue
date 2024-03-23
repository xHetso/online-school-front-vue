<script setup>
import NavButtonComponent from './NavButton.vue'
</script>

<template>
	<div class="navigation">
		<div class="profile">
			<img
				class="w-36 h-36 rounded-full mb-5"
				src="./../../assets/images/image.png"
				alt="Rounded avatar"
			/>
		</div>
		<nav-button-component />
	</div>
</template>

<style scoped>
.navigation {
	color: white;
	overflow-y: scroll;
	position: fixed;
	top: 0;
	bottom: 0;
	width: 20%;
	max-width: 350px;
	left: 0;
	border-right: 2px solid rgb(102, 100, 100);
}
</style>
