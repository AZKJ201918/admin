import request from '@/utils/request'
import testRequest from '@/utils/testRequest'
export function login(data) {
	return testRequest({
		url: '/login',
		method: 'post',
		data
	})
}

export function getInfo(token) {
	return request({
		url: '/user/info',
		method: 'get',
		params: { token }
	})
}

export function logout() {
	return request({
		url: '/user/logout',
		method: 'post'
	})
}

export function insertUser(data) {
	return request({
		url: '/insertUser',
		method: 'post',
		params: data
	})
}

export function updateUser(data) {
	return request({
		url: '/updateUser',
		method: 'post',
		params: data
	})
}

export function userExsits(name) {
	return request({
		url: '/userExsits',
		method: 'post',
		params: {
			name: name
		}
	})
}

export function deleteUser(id) {
	return request({
		url: '/deleteUser',
		method: 'post',
		params: {
			name: id
		}
	})
}

export function getAllRole(id) {
	return request({
		url: '/role',
		method: 'post',
		params: {
			name: id
		}
	})
}
