// import request from '@/utils/testRequest'
import request from "@/utils/request";

/**
 * 查看申请
 */
export function getCashRequest(status, page, limit) {
  return request({
    url: "/selectPlease",
    method: "post",
    params: {
      page: page || 1,
      status,
      limit: limit || 10
    }
  });
}

/**
 * 处理申请
 */
export function disposeCashRequest(uuid) {
  return request({
    url: "/tiCash",
    method: "get",
    params: {
      uuid
    }
  });
}
