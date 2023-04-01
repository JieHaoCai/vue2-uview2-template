<template>
	<view class="content">
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
        onshow: false,
			}
		},
		onLoad() {
      
		},
    onShow() {
      this.$u.toast('data onshow')
    },
		methods: {
      handleNaveTo(url) {
        console.log('url')
        uni.navigateTo({
        	url: `/pages/data/index`
        })
      }
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
