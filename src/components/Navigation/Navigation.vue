<script setup>
import NavButtonComponent from './NavButton.vue'
import NavProfileComponent from './NavProfile.vue'
</script>

<template>
	<div class="navigation flex flex-col items-center">
		<nav-profile-component />
		<div class="flex flex-col justify-center items-center">
			<nav-button-component to="/" name="Dashboard" />
			<nav-button-component to="/courses" name="Courses" />
			<nav-button-component to="/documentation" name="Documentation" />
			<nav-button-component to="/exam" name="Exam" />
			<nav-button-component to="/results" name="Results" />
			<nav-button-component to="/students" name="Students" />
			<nav-button-component to="/message" name="Message" />
			<nav-button-component to="/notice-board" name="Notice Board" />
			<nav-button-component to="/live-class" name="Live Class" />
		</div>
	</div>
</template>

<style scoped>
.navigation {
	color: white;
	/*overflow-y: scroll;*/
	position: fixed;
	top: 0;
	bottom: 0;
	width: 20%;
	max-width: 350px;
	left: 0;
	border-right: 2px solid rgb(102, 100, 100);
}
</style>
