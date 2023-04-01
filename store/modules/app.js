import {
	getLocal,
	setLocal,
	getRandomDev,
	getQueryString,
	isWeiXin
} from '@/utils'
const http = uni.$u.http

const app = {
	state: {
		// #ifdef H5
		rootHost: process.env.NODE_ENV === 'development' ? '' : location.host.split('.').slice(-2).join(
			'.'),
		refer: getQueryString('refer') || '1.1.1.1',
		apiUrls: [],
		isWeiXin: isWeiXin(),
		wxConfig: {},
		// #endif
		// #ifdef MP-WEIXIN
		rootHost: '',
		refer: '1015.8.1.1',
		apiUrls: [''],
		isWeiXin: true,
		// #endif
		apiIndex: 0,
		retryNum: 0,
		dev: getLocal('dev')



	},
	mutations: {
		SET_API_URLS: (state, apiUrls) => {
			state.apiUrls = apiUrls
		},
		SET_API_INDEX: (state, apiIndex) => {
			state.apiIndex = apiIndex
		},
		SET_DEV: (state, dev) => {
			state.dev = dev
		},
		SET_REFER: (state, refer) => {
			state.refer = refer
		},
		// #ifdef H5
		SET_WXCONFIG: (state, wxConfig) => {
			state.wxConfig = wxConfig
		},
		// #endif
	},
	actions: {
		// 获取BaseURL请求地址
		async getApiUrls({
			commit,
			state
		}) {
			return new Promise(async (resolve, reject) => {
				try {
					// #ifdef H5
					let url = process.env.NODE_ENV === 'development' ? `/getway/${state.rootHost}` :
						`//api.${state.rootHost}/getway/${state.rootHost}`
					// #endif
					// #ifdef MP-WEIXIN
					let url = `https://api.${state.rootHost}/getway/${state.rootHost}`
					// #endif
					let apiUrls = (await http.get(url)).data
					commit('SET_API_URLS', apiUrls)
					commit('SET_API_INDEX', 0)
					resolve(true)
				} catch (error) {
					let apiUrls = [`sdk-api.${state.rootHost}`]
					commit('SET_API_URLS', apiUrls)
					commit('SET_API_INDEX', 0)
					resolve(true)
				}
			})
		},
		// 设置当前请求baseURL索引
		setApiIndex({
			commit
		}, apiIndex) {
			commit('SET_API_INDEX', apiIndex)
		},
		// 设置设备号
		setDev({
			commit
		}) {
			let dev = ''
			if (getLocal('dev')) {
				dev = getLocal('dev')
			} else {
				dev = getRandomDev()
				setLocal('dev', dev)
			}
			commit('SET_DEV', dev)
		},
		// 设置refer
		setRefer({
			commit,
			state
		}, refer) {
			let referArr = refer.split('.')
			if (referArr[2] && referArr[3]) {
				let stateReferArr = state.refer.split('.')
				stateReferArr[2] = referArr[2]
				stateReferArr[3] = referArr[3]
				commit('SET_REFER', stateReferArr.join('.'))
			}
		},
		// #ifdef H5
		// 获取微信配置
		getWxConfig({
			commit
		}) {
			return getWxConfig().then(res => {
				commit('SET_WXCONFIG', res.data)
				return Promise.resolve(res)
			})
		},
		// #endif
	}
}

export default app
