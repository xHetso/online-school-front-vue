<script setup>
defineProps(['to', 'name'])
</script>

<template>
	<router-link :to="to" class="btn-nav" exact-active-class="btn-active">{{
		name
	}}</router-link>
</template>

<style scoped>
.btn-nav {
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
	transition: transform 0.2s ease-in-out;
	margin-bottom: 20px;
}
.btn-nav:hover {
	background-color: #060e34;
}

.btn-active {
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
</style>
