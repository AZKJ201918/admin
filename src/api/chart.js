import request from '@/utils/testRequest'
// import request from '@/utils/request'

/**
 * 获取销售额
 */
export function getCensus() {
  return request({
    url: '/census',
    method: 'post'
  })
}

/**
 * 获取新用户和访问量
 */
export function getVisitAndRegister() {
  return request({
    url: '/visitAndRegister',
    method: 'get'
  })
}

