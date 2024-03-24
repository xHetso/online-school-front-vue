<script setup>
import { useRoute } from 'vue-router'
import NavigationComponent from './Navigation/Navigation.vue'

const route = useRoute()
</script>

<template>
	<div class="main-layout">
		<navigation-component />
		<div class="layout-content">
			<h1 class="text-3xl flex flex-col justify-center items-center">
				{{ route.name }}
			</h1>
			<router-view />
		</div>
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
