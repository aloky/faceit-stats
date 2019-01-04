<template>
	<div class="main-container">
		<header-bar />
		<router-view />
		<footer-bar />
	</div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue'
import FooterBar from './components/FooterBar.vue'

export default {
	components: { HeaderBar, FooterBar },
	beforeCreate () {
		this.$Loading.start()
	},
	created () {
		this.$Loading.finish()
	}
}
</script>

<style lang="scss">
@import "styles/styles.scss";
</style>
