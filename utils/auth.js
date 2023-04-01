import {
	setLocal,
	getLocal,
	removeLocal
} from '@/utils'

const TokenKey = 'token'

export function getToken() {
	return getLocal(TokenKey, 164800000)
}

export function setToken(token) {
	return setLocal(TokenKey, token)
}

export function removeToken() {
	return removeLocal(TokenKey)
}
