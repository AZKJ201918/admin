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
  return testRequest({
    url: '/role',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getAllUser(name, page) {
  return testRequest({
    url: '/loadUser',
    method: 'post',
    params: {
      name, page: page || 1, limit: 8
    }
  })
}

export function insertUser(data) {
  return testRequest({
    url: '/insertUser',
    method: 'post',
    params: data
  })
}

export function updateUser(data) {
  return testRequest({
    url: '/updateUser',
    method: 'post',
    params: data
  })
}

export function userExsits(name) {
  return testRequest({
    url: '/userExsits',
    method: 'post',
    params: {
      name: name
    }
  })
}

export function deleteUser(data) {
  return testRequest({
    url: '/deleteUser',
    method: 'post',
    params: data
  })
}

export function getAllRole(id) {
  return testRequest({
    url: '/allRole',
    method: 'post',
    params: {
      name: id
    }
  })
}
