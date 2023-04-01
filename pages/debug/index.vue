<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area" >
			<text class="title">{{title}}</text>
		</view>
    <button @click="handleNaveTo()">调试</button>
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
      this.$u.toast('debug onshow')
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

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
