// import request from '@/utils/testRequest'
import request from '@/utils/request'

/**
 * 获取评论
 */
export function getDiscuss(id, page, evaluate) {
  return request({
    url: '/loadDiscuss',
    method: 'post',
    params: {
      id, page: page || 1,
      limit: 10,
      evaluate: evaluate
    }
  })
}
