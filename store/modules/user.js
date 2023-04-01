import {
	login,
	check
} from '@/api'
import {
	getToken,
	setToken,
	removeToken
} from '@/utils/auth'

const user = {
	state: {
		account: '',
		balance: '',
		token: getToken()
	},
	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_ACCOUNT: (state, account) => {
			state.account = account
		},
		SET_BALANCE: (state, balance) => {
			state.balance = balance
		}
	},
	actions: {
		// 登录
		login({
			commit,
			rootState
		}, info) {

		},
		// 获取用户信息
		getUserInfo({
			commit,
			state
		}) {
			return getUserInfo({
				token: state.token
			}).then(res => {
				commit('SET_ACCOUNT', res.data.uid)
				commit('SET_BALANCE', res.data.money)
			})
		},
		// 登出
		logOut({
			commit
		}) {
			commit('SET_TOKEN', '')
			removeToken()
			commit('SET_ACCOUNT', '')
			commit('SET_BALANCE', '')
		}
	}
}

export default user
