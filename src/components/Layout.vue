<script setup>
import NavigationComponent from './Navigation/Navigation.vue'
</script>

<template>
	<div class="main-layout">
		<navigation-component />
		<div class="layout-content">Content</div>
	</div>
</template>

<style scoped>
.main-layout {
	position: relative;
}

.layout-content {
	color: white;
	min-height: 100vh;
	padding: 2.75rem;
	margin-left: 20%;
}
</style>
