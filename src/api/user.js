import request from "@/utils/request";
export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data
  });
}

export function getInfo(token) {
  return request({
    url: "/role",
    method: "post",
    params: { token }
  });
}

export function logout() {
  return request({
    url: "/exit",
    method: "get"
  });
}

export function getAllUser(page) {
  return request({
    url: "/loadUser",
    method: "post",
    params: {
      page: page || 1,
      limit: 20
    }
  });
}

export function insertUser(data) {
  return request({
    url: "/insertUser",
    method: "post",
    params: data
  });
}

export function updateUser(data) {
  return request({
    url: "/updateUser",
    method: "post",
    params: data
  });
}

export function userExsits(name) {
  return request({
    url: "/userExsits",
    method: "post",
    params: {
      name: name
    }
  });
}

export function deleteUser(data) {
  return request({
    url: "/deleteUser",
    method: "post",
    params: data
  });
}

export function getAllRole(id) {
  return request({
    url: "/allRole",
    method: "post",
    params: {
      name: id
    }
  });
}
