// import testRequest from '@/utils/testRequest'
import request from '@/utils/request'
import { baseURL } from '@/utils/request'
export const importOrderUrl = baseURL + 'importOrder'
/**
 * 查看商品
 */
export function getAllOrder(data, page, limit) {
  return request({
    url: '/allOrder',
    method: 'post',
    data,
    params: {
      page: page || 1,
      limit: 8
    }
  })
}

/**
 * 查看商品
 */
export function updateOrder(data) {
  return request({
    url: '/updateOrder',
    method: 'post',
    data
  })
}
