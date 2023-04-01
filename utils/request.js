import store from '@/store/index.js'
import Request from 'uview-ui/libs/luch-request/index.js'
import {
	toast
} from 'uview-ui'

const http = new Request()

// 初始化请求配置
http.setConfig((config) => {
	/* config 为默认全局配置*/
	config.timeout = 3000
	return config
})

// 请求拦截
http.interceptors.request.use(config => {
	store.dispatch('setRetryNum', 0)
	// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
	config.data = config.data || {}
	// 设置baseURL
	// #ifdef H5
	config.baseURL = process.env.NODE_ENV === 'development' ? '' : '//' + store.getters.apiUrls[store
		.getters.apiIndex]
	// #endif
	// #ifdef MP-WEIXIN
	config.baseURL = process.env.NODE_ENV === 'development' ? `` : 'https://' + store.getters.apiUrls[store
		.getters.apiIndex]
	// #endif
	// 当为post请求时候，Content-Type 为application/x-www-form-urlencoded
	if (config.method == 'POST') {
		config.header['Content-Type'] = 'application/x-www-form-urlencoded'
		// 根据custom参数中配置的是否需要token，添加对应的请求头
		if (config?.custom?.auth !== false && store.getters.token) {
			config.data.token = store.getters.token
		}
	}
	// 根据custom参数中配置的是否需要baseURL，添加对应的请求头
	// #ifdef H5
	if (config?.custom?.baseUrlType) {
		config.baseURL = process.env.NODE_ENV === 'development' ? `/${config.custom.baseUrlType}` :
			`//${config.custom.baseUrlType}.${store.getters.rootHost}`
	}
	// #endif
	// #ifdef MP-WEIXIN
	if (config?.custom?.baseUrlType) {
		config.baseURL = `https://${config.custom.baseUrlType}.${store.getters.rootHost}`
	}
	// #endif
	// 携带refer
	if (config?.custom?.refer !== false) {
		config.data.refer = store.getters.refer
	}
	return config
}, error => {
	return Promise.reject(error)
})

// 响应拦截
http.interceptors.response.use(async response => {
	const config = response.config?.custom
	const res = response.data
	if (res.code !== 1 && res.code !== 0) {
		// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
		if (config?.toast !== false) {
			uni.$u.toast(res.msg)
		}
		// 如果需要catch返回，则进行reject
		if (config?.catch) {
			return Promise.reject(res)
		} else {
			// 否则返回一个pending中的promise，请求不会进入catch中
			return new Promise(() => {})
		}
	}
	return res === undefined ? {} : res
}, error => {
	if (error.errMsg.indexOf('timeout') > -1 && error.config.baseURL.indexOf('sdk-api') > -1) {
		let retry = store.getters.retryNum || 0
		store.dispatch('setRetryNum', retry + 1).then(() => {
			if (retry < 3) {
				return http(error.config)
			} else {
				uni.$u.toast('当前无网络，请检查您的网络设备')
				return Promise.reject(error)
			}
		})
	}
}
uni.$u.toast('当前无网络，请检查您的网络设备') return Promise.reject(error)
})

export default http
