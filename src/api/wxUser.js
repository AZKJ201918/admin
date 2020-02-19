import request from "@/utils/request";
export function getWxUser(data, page, limit) {
  return request({
    url: "/findUser",
    method: "post",
    data: Object.assign(data, { page: page || 1, limit: limit || 8 })
  });
}
